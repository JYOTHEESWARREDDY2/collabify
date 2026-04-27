import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Integer, JSON, Boolean
from sqlalchemy.orm import relationship

from app.utils.db import Base


class MediaKit(Base):
    __tablename__ = "media_kits"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, unique=True)

    # Profile
    bio = Column(String(500), nullable=True)
    niche = Column(String(80), nullable=True)
    profile_image_url = Column(String, nullable=True)

    # Social stats (auto-synced or manual)
    ig_followers = Column(Integer, nullable=True)
    ig_engagement_rate = Column(Float, nullable=True)
    tiktok_followers = Column(Integer, nullable=True)
    tiktok_engagement_rate = Column(Float, nullable=True)
    youtube_subscribers = Column(Integer, nullable=True)
    youtube_views_avg = Column(Integer, nullable=True)

    # Rate card (JSON: {"reel": 1200, "story": 400, "post": 800})
    rate_card = Column(JSON, nullable=True)

    # Past collaborations (JSON list)
    past_collabs = Column(JSON, nullable=True)

    # Share settings
    is_public = Column(Boolean, default=True)
    share_slug = Column(String(80), unique=True, nullable=True)

    last_synced_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    user = relationship("User", back_populates="media_kit")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "bio": self.bio,
            "niche": self.niche,
            "profile_image_url": self.profile_image_url,
            "ig_followers": self.ig_followers,
            "ig_engagement_rate": self.ig_engagement_rate,
            "tiktok_followers": self.tiktok_followers,
            "tiktok_engagement_rate": self.tiktok_engagement_rate,
            "youtube_subscribers": self.youtube_subscribers,
            "youtube_views_avg": self.youtube_views_avg,
            "rate_card": self.rate_card,
            "past_collabs": self.past_collabs,
            "is_public": self.is_public,
            "share_slug": self.share_slug,
            "last_synced_at": self.last_synced_at.isoformat() if self.last_synced_at else None,
        }
