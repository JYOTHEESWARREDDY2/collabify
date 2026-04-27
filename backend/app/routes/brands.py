from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional, List

from app.utils.db import get_db
from app.utils.jwt import get_current_user
from app.models.user import User
from app.models.brand import Brand

router = APIRouter()


class BrandCreate(BaseModel):
    name: str
    niche: Optional[str] = None
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    website: Optional[str] = None
    notes: Optional[str] = None


class BrandUpdate(BaseModel):
    name: Optional[str] = None
    niche: Optional[str] = None
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    website: Optional[str] = None
    notes: Optional[str] = None


@router.get("/", response_model=List[dict])
def list_brands(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    brands = db.query(Brand).filter(Brand.user_id == current_user.id).order_by(Brand.name).all()
    return [b.to_dict() for b in brands]


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_brand(
    payload: BrandCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    brand = Brand(user_id=current_user.id, **payload.model_dump())
    db.add(brand)
    db.commit()
    db.refresh(brand)
    return brand.to_dict()


@router.get("/{brand_id}")
def get_brand(
    brand_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    brand = db.query(Brand).filter(Brand.id == brand_id, Brand.user_id == current_user.id).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return brand.to_dict()


@router.put("/{brand_id}")
def update_brand(
    brand_id: str,
    payload: BrandUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    brand = db.query(Brand).filter(Brand.id == brand_id, Brand.user_id == current_user.id).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(brand, field, value)
    db.commit()
    db.refresh(brand)
    return brand.to_dict()


@router.delete("/{brand_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_brand(
    brand_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    brand = db.query(Brand).filter(Brand.id == brand_id, Brand.user_id == current_user.id).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    db.delete(brand)
    db.commit()
