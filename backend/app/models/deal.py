import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum as SAEnum, Text
from sqlalchemy.orm import relationship

from app.utils.db import Base

STAGE_ENUM = SAEnum(
    "Prospecting", "Negotiating", "Contract Sent", "Live", "Invoiced", "Paid",
    name="deal_stage_enum"
)


class Deal(Base):
    __tablename__ = "deals"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    brand_id = Column(String, ForeignKey("brands.id"), nullable=True)

    brand_name = Column(String(120), nullable=False)
    deliverable = Column(String(255), nullable=False)
    value = Column(Float, nullable=False, default=0.0)
    stage = Column(STAGE_ENUM, default="Prospecting")
    notes = Column(Text, nullable=True)
    contract_url = Column(String, nullable=True)
    due_date = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    user = relationship("User", back_populates="deals")
    brand = relationship("Brand", back_populates="deals")
    deliverables = relationship("Deliverable", back_populates="deal", cascade="all, delete-orphan")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "brand_name": self.brand_name,
            "deliverable": self.deliverable,
            "value": self.value,
            "stage": self.stage,
            "notes": self.notes,
            "contract_url": self.contract_url,
            "due_date": self.due_date.isoformat() if self.due_date else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
