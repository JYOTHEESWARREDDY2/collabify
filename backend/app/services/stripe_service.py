import logging
from sqlalchemy.orm import Session

from app.config import settings

logger = logging.getLogger(__name__)

# Stripe Price IDs — set these in your Stripe dashboard and paste here
PRICE_IDS = {
    "pro_monthly":    "price_pro_monthly_placeholder",
    "pro_annual":     "price_pro_annual_placeholder",
    "agency_monthly": "price_agency_monthly_placeholder",
    "agency_annual":  "price_agency_annual_placeholder",
}


def _stripe():
    import stripe as _stripe_lib
    _stripe_lib.api_key = settings.STRIPE_SECRET_KEY
    return _stripe_lib


def create_checkout_session(user, plan_id: str, annual: bool) -> str:
    """Create a Stripe Checkout session and return the URL."""
    stripe = _stripe()
    key = f"{plan_id}_{'annual' if annual else 'monthly'}"
    price_id = PRICE_IDS.get(key)
    if not price_id:
        raise ValueError(f"Unknown plan: {key}")

    customer_id = user.stripe_customer_id
    if not customer_id:
        customer = stripe.Customer.create(email=user.email, name=user.name)
        customer_id = customer.id

    session = stripe.checkout.Session.create(
        customer=customer_id,
        payment_method_types=["card"],
        line_items=[{"price": price_id, "quantity": 1}],
        mode="subscription",
        success_url=f"{settings.FRONTEND_URL}/dashboard?checkout=success",
        cancel_url=f"{settings.FRONTEND_URL}/pricing?checkout=cancelled",
        metadata={"user_id": user.id, "plan": plan_id},
    )
    return session.url


def create_portal_session(stripe_customer_id: str) -> str:
    """Create a Stripe Customer Portal session and return the URL."""
    stripe = _stripe()
    session = stripe.billing_portal.Session.create(
        customer=stripe_customer_id,
        return_url=f"{settings.FRONTEND_URL}/dashboard",
    )
    return session.url


def handle_webhook_event(payload: bytes, sig: str, db: Session) -> None:
    """Process Stripe webhook events."""
    stripe = _stripe()
    try:
        event = stripe.Webhook.construct_event(payload, sig, settings.STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError as exc:
        raise ValueError(f"Invalid signature: {exc}") from exc

    from app.models.user import User

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        user_id = session.get("metadata", {}).get("user_id")
        plan = session.get("metadata", {}).get("plan", "pro")
        customer_id = session.get("customer")
        subscription_id = session.get("subscription")

        if user_id:
            user = db.query(User).filter(User.id == user_id).first()
            if user:
                user.stripe_customer_id = customer_id
                user.stripe_subscription_id = subscription_id
                user.plan = plan
                db.commit()
                logger.info("Upgraded user %s to plan %s", user_id, plan)

    elif event["type"] == "customer.subscription.deleted":
        subscription = event["data"]["object"]
        customer_id = subscription.get("customer")
        user = db.query(User).filter(User.stripe_customer_id == customer_id).first()
        if user:
            user.plan = "starter"
            db.commit()
            logger.info("Downgraded user %s to starter (subscription cancelled)", user.id)
