from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional

from app.utils.db import get_db
from app.utils.jwt import get_current_user
from app.models.user import User

router = APIRouter()


class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    niche: Optional[str] = None
    instagram_handle: Optional[str] = None
    tiktok_handle: Optional[str] = None
    youtube_handle: Optional[str] = None
    avatar_url: Optional[str] = None


@router.get("/me")
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user.to_dict()


@router.put("/me")
def update_profile(
    payload: UpdateProfileRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    return current_user.to_dict()


@router.delete("/me")
def delete_account(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    current_user.is_active = False
    db.commit()
    return {"message": "Account deactivated"}
