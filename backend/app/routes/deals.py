from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime

from app.utils.db import get_db
from app.utils.jwt import get_current_user
from app.models.user import User
from app.models.deal import Deal
from app.services.deal_service import compute_pipeline_stats

router = APIRouter()


class DealCreate(BaseModel):
    brand_name: str
    deliverable: str
    value: float
    stage: str = "Prospecting"
    notes: Optional[str] = None
    due_date: Optional[datetime] = None
    brand_id: Optional[str] = None


class DealUpdate(BaseModel):
    brand_name: Optional[str] = None
    deliverable: Optional[str] = None
    value: Optional[float] = None
    stage: Optional[str] = None
    notes: Optional[str] = None
    due_date: Optional[datetime] = None
    contract_url: Optional[str] = None


@router.get("/", response_model=List[dict])
def list_deals(
    stage: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    q = db.query(Deal).filter(Deal.user_id == current_user.id)
    if stage:
        q = q.filter(Deal.stage == stage)
    return [d.to_dict() for d in q.order_by(Deal.created_at.desc()).all()]


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_deal(
    payload: DealCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deal = Deal(user_id=current_user.id, **payload.model_dump())
    db.add(deal)
    db.commit()
    db.refresh(deal)
    return deal.to_dict()


@router.get("/stats")
def pipeline_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deals = db.query(Deal).filter(Deal.user_id == current_user.id).all()
    return compute_pipeline_stats(deals)


@router.get("/{deal_id}")
def get_deal(
    deal_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deal = db.query(Deal).filter(Deal.id == deal_id, Deal.user_id == current_user.id).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return deal.to_dict()


@router.put("/{deal_id}")
def update_deal(
    deal_id: str,
    payload: DealUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deal = db.query(Deal).filter(Deal.id == deal_id, Deal.user_id == current_user.id).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")

    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(deal, field, value)
    db.commit()
    db.refresh(deal)
    return deal.to_dict()


@router.delete("/{deal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_deal(
    deal_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deal = db.query(Deal).filter(Deal.id == deal_id, Deal.user_id == current_user.id).first()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    db.delete(deal)
    db.commit()
