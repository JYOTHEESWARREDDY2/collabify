from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional

from app.utils.db import get_db
from app.utils.jwt import get_current_user
from app.models.user import User
from app.models.media_kit import MediaKit

router = APIRouter()


class MediaKitSave(BaseModel):
    bio: Optional[str] = None
    niche: Optional[str] = None
    profile_image_url: Optional[str] = None
    ig_followers: Optional[int] = None
    ig_engagement_rate: Optional[float] = None
    tiktok_followers: Optional[int] = None
    tiktok_engagement_rate: Optional[float] = None
    youtube_subscribers: Optional[int] = None
    youtube_views_avg: Optional[int] = None
    rate_card: Optional[dict] = None
    past_collabs: Optional[list] = None
    is_public: Optional[bool] = None
    share_slug: Optional[str] = None


@router.get("/")
def get_media_kit(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    kit = db.query(MediaKit).filter(MediaKit.user_id == current_user.id).first()
    if not kit:
        return {}
    return kit.to_dict()


@router.post("/")
def save_media_kit(
    payload: MediaKitSave,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    kit = db.query(MediaKit).filter(MediaKit.user_id == current_user.id).first()
    if kit:
        for field, value in payload.model_dump(exclude_none=True).items():
            setattr(kit, field, value)
    else:
        kit = MediaKit(user_id=current_user.id, **payload.model_dump(exclude_none=True))
        db.add(kit)
    db.commit()
    db.refresh(kit)
    return kit.to_dict()


@router.get("/share/{slug}")
def get_public_kit(slug: str, db: Session = Depends(get_db)):
    """Public endpoint — no auth required."""
    kit = db.query(MediaKit).filter(MediaKit.share_slug == slug, MediaKit.is_public == True).first()
    if not kit:
        raise HTTPException(status_code=404, detail="Media kit not found or not public")
    return kit.to_dict()
