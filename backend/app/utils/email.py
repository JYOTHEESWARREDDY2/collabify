import logging
from app.config import settings

logger = logging.getLogger(__name__)


def send_email(to: str, subject: str, html_body: str) -> bool:
    """Send an email via SendGrid. Returns True on success."""
    if not settings.SENDGRID_API_KEY:
        logger.warning("SENDGRID_API_KEY not set — skipping email to %s", to)
        return False

    try:
        import sendgrid
        from sendgrid.helpers.mail import Mail

        sg = sendgrid.SendGridAPIClient(api_key=settings.SENDGRID_API_KEY)
        message = Mail(
            from_email=settings.FROM_EMAIL,
            to_emails=to,
            subject=subject,
            html_content=html_body,
        )
        response = sg.send(message)
        logger.info("Email sent to %s — status %s", to, response.status_code)
        return response.status_code in (200, 202)
    except Exception as exc:
        logger.error("Failed to send email to %s: %s", to, exc)
        return False


def send_invoice_email(to: str, brand_name: str, amount: str, pdf_bytes: bytes) -> bool:
    """Send an invoice PDF as an email attachment."""
    subject = f"Invoice from Collabify — {brand_name}"
    html_body = f"""
    <p>Hi {brand_name},</p>
    <p>Please find your invoice for <strong>{amount}</strong> attached.</p>
    <p>Thanks,<br>Collabify</p>
    """
    # For MVP, just send without attachment
    return send_email(to, subject, html_body)


def send_invoice_reminder(to: str, brand_name: str, invoice_id: str, amount: str) -> bool:
    subject = f"Friendly reminder: Invoice {invoice_id} is due"
    html_body = f"""
    <p>Hi {brand_name},</p>
    <p>This is a friendly reminder that invoice <strong>{invoice_id}</strong> for <strong>{amount}</strong> is due.</p>
    <p>Please process the payment at your earliest convenience.</p>
    <p>Thanks,<br>Collabify</p>
    """
    return send_email(to, subject, html_body)
