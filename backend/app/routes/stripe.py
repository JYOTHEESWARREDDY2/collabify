import logging
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.config import settings
from app.utils.db import get_db
from app.utils.jwt import get_current_user
from app.models.user import User
from app.services.stripe_service import (
    create_checkout_session,
    create_portal_session,
    handle_webhook_event,
)

router = APIRouter()
logger = logging.getLogger(__name__)


class CheckoutRequest(BaseModel):
    plan_id: str   # "pro" | "agency"
    annual: bool = True


@router.post("/create-checkout")
def checkout(
    payload: CheckoutRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        url = create_checkout_session(current_user, payload.plan_id, payload.annual)
        return {"checkout_url": url}
    except Exception as exc:
        logger.error("Stripe checkout error: %s", exc)
        raise HTTPException(status_code=500, detail="Failed to create checkout session")


@router.post("/portal")
def portal(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not current_user.stripe_customer_id:
        raise HTTPException(status_code=400, detail="No Stripe customer found")
    try:
        url = create_portal_session(current_user.stripe_customer_id)
        return {"portal_url": url}
    except Exception as exc:
        logger.error("Stripe portal error: %s", exc)
        raise HTTPException(status_code=500, detail="Failed to open billing portal")


@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    try:
        handle_webhook_event(payload, sig, db)
        return {"status": "ok"}
    except ValueError as exc:
        logger.warning("Stripe webhook signature invalid: %s", exc)
        raise HTTPException(status_code=400, detail="Invalid webhook signature")
    except Exception as exc:
        logger.error("Stripe webhook error: %s", exc)
        raise HTTPException(status_code=500, detail="Webhook processing failed")
