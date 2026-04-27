import io
import logging
from datetime import datetime, timezone

from sqlalchemy.orm import Session

logger = logging.getLogger(__name__)


def generate_invoice_number(db: Session, user_id: str) -> str:
    """Generate a sequential invoice number like INV-2026-001."""
    from app.models.invoice import Invoice

    year = datetime.now(timezone.utc).year
    count = db.query(Invoice).filter(Invoice.user_id == user_id).count()
    return f"INV-{year}-{str(count + 1).zfill(3)}"


def generate_invoice_pdf(invoice, user) -> bytes:
    """Generate a professional PDF invoice using ReportLab."""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib import colors
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import mm
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
        from reportlab.lib.enums import TA_RIGHT, TA_LEFT

        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=20 * mm, leftMargin=20 * mm,
                                topMargin=20 * mm, bottomMargin=20 * mm)

        styles = getSampleStyleSheet()
        forest = colors.HexColor("#022c22")
        teal = colors.HexColor("#0d9488")

        title_style = ParagraphStyle("Title", parent=styles["Heading1"], textColor=forest,
                                     fontSize=28, spaceAfter=4)
        label_style = ParagraphStyle("Label", parent=styles["Normal"], textColor=colors.grey,
                                     fontSize=8, spaceAfter=2)
        value_style = ParagraphStyle("Value", parent=styles["Normal"], textColor=forest,
                                     fontSize=11, spaceAfter=8)
        right_style = ParagraphStyle("Right", parent=styles["Normal"], alignment=TA_RIGHT,
                                     textColor=forest, fontSize=10)

        story = []

        # Header
        story.append(Paragraph("COLLABIFY", title_style))
        story.append(Paragraph("The CRM for creators who hustle", label_style))
        story.append(Spacer(1, 8 * mm))

        # Invoice meta table
        meta = [
            ["INVOICE NUMBER", "DATE", "DUE DATE"],
            [
                invoice.invoice_number,
                invoice.created_at.strftime("%d %b %Y") if invoice.created_at else "—",
                invoice.due_date.strftime("%d %b %Y") if invoice.due_date else "Net 30",
            ],
        ]
        meta_table = Table(meta, colWidths=[60 * mm, 60 * mm, 60 * mm])
        meta_table.setStyle(TableStyle([
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.grey),
            ("FONTSIZE", (0, 0), (-1, 0), 8),
            ("TEXTCOLOR", (0, 1), (-1, 1), forest),
            ("FONTSIZE", (0, 1), (-1, 1), 11),
            ("FONTNAME", (0, 1), (-1, 1), "Helvetica-Bold"),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ]))
        story.append(meta_table)
        story.append(Spacer(1, 8 * mm))

        # Billed to / From
        from_to = [
            ["FROM", "BILLED TO"],
            [user.name or "Creator", invoice.brand_name],
            [user.email or "", ""],
        ]
        ft_table = Table(from_to, colWidths=[90 * mm, 90 * mm])
        ft_table.setStyle(TableStyle([
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.grey),
            ("FONTSIZE", (0, 0), (-1, 0), 8),
            ("TEXTCOLOR", (0, 1), (-1, 1), forest),
            ("FONTNAME", (0, 1), (-1, 1), "Helvetica-Bold"),
            ("FONTSIZE", (0, 1), (-1, 1), 12),
            ("TEXTCOLOR", (0, 2), (-1, 2), colors.grey),
            ("FONTSIZE", (0, 2), (-1, 2), 9),
        ]))
        story.append(ft_table)
        story.append(Spacer(1, 10 * mm))

        # Line items
        items_data = [["DESCRIPTION", "AMOUNT"]]
        items_data.append([invoice.project_name, f"${invoice.amount:,.2f}"])
        if invoice.tax_rate > 0:
            items_data.append([f"Tax ({invoice.tax_rate * 100:.0f}%)", f"${invoice.amount * invoice.tax_rate:,.2f}"])
        items_data.append(["TOTAL DUE", f"${invoice.total_amount:,.2f}"])

        items_table = Table(items_data, colWidths=[130 * mm, 50 * mm])
        items_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), forest),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, 0), 9),
            ("TOPPADDING", (0, 0), (-1, 0), 8),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
            ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, colors.HexColor("#f0fdf4")]),
            ("FONTSIZE", (0, 1), (-1, -1), 10),
            ("TOPPADDING", (0, 1), (-1, -1), 7),
            ("BOTTOMPADDING", (0, 1), (-1, -1), 7),
            ("ALIGN", (1, 0), (1, -1), "RIGHT"),
            ("BACKGROUND", (0, -1), (-1, -1), teal),
            ("TEXTCOLOR", (0, -1), (-1, -1), colors.white),
            ("FONTNAME", (0, -1), (-1, -1), "Helvetica-Bold"),
            ("FONTSIZE", (0, -1), (-1, -1), 11),
        ]))
        story.append(items_table)
        story.append(Spacer(1, 12 * mm))

        # Notes
        if invoice.notes:
            story.append(Paragraph("NOTES", label_style))
            story.append(Paragraph(invoice.notes, value_style))

        # Footer
        story.append(Spacer(1, 10 * mm))
        story.append(Paragraph("Thank you for the collaboration. 🤝", right_style))

        doc.build(story)
        return buffer.getvalue()

    except ImportError:
        logger.warning("ReportLab not installed — returning empty PDF bytes")
        return b"%PDF-1.4 placeholder"
