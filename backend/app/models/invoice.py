import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum as SAEnum, Text, Integer
from sqlalchemy.orm import relationship

from app.utils.db import Base

STATUS_ENUM = SAEnum("draft", "pending", "paid", "overdue", "cancelled", name="invoice_status_enum")


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    deal_id = Column(String, ForeignKey("deals.id"), nullable=True)

    invoice_number = Column(String(40), unique=True, nullable=False)
    brand_name = Column(String(120), nullable=False)
    project_name = Column(String(255), nullable=False)
    amount = Column(Float, nullable=False)
    tax_rate = Column(Float, default=0.0)          # e.g. 0.18 for 18% GST
    status = Column(STATUS_ENUM, default="draft")
    notes = Column(Text, nullable=True)
    pdf_url = Column(String, nullable=True)

    due_date = Column(DateTime(timezone=True), nullable=True)
    paid_at = Column(DateTime(timezone=True), nullable=True)
    reminder_count = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    user = relationship("User", back_populates="invoices")

    @property
    def total_amount(self) -> float:
        return self.amount * (1 + self.tax_rate)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "invoice_number": self.invoice_number,
            "brand_name": self.brand_name,
            "project_name": self.project_name,
            "amount": self.amount,
            "tax_rate": self.tax_rate,
            "total_amount": self.total_amount,
            "status": self.status,
            "notes": self.notes,
            "pdf_url": self.pdf_url,
            "due_date": self.due_date.isoformat() if self.due_date else None,
            "paid_at": self.paid_at.isoformat() if self.paid_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
