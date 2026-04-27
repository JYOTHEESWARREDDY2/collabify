import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Integer, Text
from sqlalchemy.orm import relationship

from app.utils.db import Base


class Brand(Base):
    __tablename__ = "brands"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)

    name = Column(String(120), nullable=False)
    niche = Column(String(80), nullable=True)
    contact_name = Column(String(120), nullable=True)
    contact_email = Column(String(255), nullable=True)
    website = Column(String, nullable=True)
    notes = Column(Text, nullable=True)

    # Stats (computed / cached)
    total_deals = Column(Integer, default=0)
    total_value = Column(Float, default=0.0)
    avg_payment_days = Column(Integer, nullable=True)  # average days to pay
    ai_score = Column(Float, nullable=True)            # 0–100

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    user = relationship("User", back_populates="brands")
    deals = relationship("Deal", back_populates="brand")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "niche": self.niche,
            "contact_name": self.contact_name,
            "contact_email": self.contact_email,
            "website": self.website,
            "notes": self.notes,
            "total_deals": self.total_deals,
            "total_value": self.total_value,
            "avg_payment_days": self.avg_payment_days,
            "ai_score": self.ai_score,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
