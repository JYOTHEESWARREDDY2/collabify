import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Boolean, DateTime, Enum as SAEnum
from sqlalchemy.orm import relationship
from passlib.context import CryptContext

from app.utils.db import Base

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    plan = Column(SAEnum("starter", "pro", "agency", name="plan_enum"), default="starter")
    stripe_customer_id = Column(String, nullable=True)
    stripe_subscription_id = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    instagram_handle = Column(String(80), nullable=True)
    tiktok_handle = Column(String(80), nullable=True)
    youtube_handle = Column(String(80), nullable=True)
    niche = Column(String(80), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    deals = relationship("Deal", back_populates="user", cascade="all, delete-orphan")
    brands = relationship("Brand", back_populates="user", cascade="all, delete-orphan")
    invoices = relationship("Invoice", back_populates="user", cascade="all, delete-orphan")
    media_kit = relationship("MediaKit", back_populates="user", uselist=False, cascade="all, delete-orphan")

    def set_password(self, password: str) -> None:
        self.hashed_password = pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.hashed_password)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "plan": self.plan,
            "avatar_url": self.avatar_url,
            "niche": self.niche,
            "instagram_handle": self.instagram_handle,
            "tiktok_handle": self.tiktok_handle,
            "youtube_handle": self.youtube_handle,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
