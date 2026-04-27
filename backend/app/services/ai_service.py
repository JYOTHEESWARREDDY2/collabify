import logging
from typing import Optional

from app.config import settings

logger = logging.getLogger(__name__)


def score_brand(
    total_deals: int,
    total_value: float,
    avg_payment_days: Optional[int],
    response_rate: float = 1.0,
) -> float:
    """
    Score a brand 0–100 based on:
      - Payment speed    (40 pts)  — <15 days = 40, <30 days = 25, <60 days = 10, else 0
      - Deal value       (35 pts)  — scaled logarithmically to $10K max
      - Deal history     (15 pts)  — more deals = higher trust
      - Response rate    (10 pts)  — proportion of messages responded to
    """
    import math

    # Payment speed
    if avg_payment_days is None:
        payment_score = 20.0
    elif avg_payment_days <= 15:
        payment_score = 40.0
    elif avg_payment_days <= 30:
        payment_score = 25.0
    elif avg_payment_days <= 60:
        payment_score = 10.0
    else:
        payment_score = 0.0

    # Deal value (log scale, cap at $10K)
    capped = min(total_value, 10_000)
    value_score = (math.log1p(capped) / math.log1p(10_000)) * 35

    # Deal history
    history_score = min(total_deals / 5, 1.0) * 15

    # Response rate
    response_score = min(response_rate, 1.0) * 10

    total = payment_score + value_score + history_score + response_score
    return round(min(total, 100.0), 1)


async def suggest_rate(
    niche: str,
    platform: str,
    followers: int,
    engagement_rate: float,
    deliverable: str,
) -> dict:
    """
    Use OpenAI to suggest a rate for a creator based on their stats.
    Falls back to a rule-based estimate if OpenAI is not configured.
    """
    if not settings.OPENAI_API_KEY:
        return _rule_based_rate(followers, engagement_rate, deliverable)

    try:
        from openai import AsyncOpenAI
        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

        prompt = f"""You are a creator economy expert. Suggest a fair rate for a brand deal.

Creator profile:
- Niche: {niche}
- Platform: {platform}
- Followers: {followers:,}
- Engagement rate: {engagement_rate:.1f}%
- Deliverable: {deliverable}

Respond ONLY with JSON: {{"min": number, "max": number, "suggested": number, "reasoning": "one sentence"}}"""

        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200,
            temperature=0.3,
        )
        import json
        return json.loads(response.choices[0].message.content)

    except Exception as exc:
        logger.warning("OpenAI rate suggestion failed: %s — using rule-based fallback", exc)
        return _rule_based_rate(followers, engagement_rate, deliverable)


def _rule_based_rate(followers: int, engagement_rate: float, deliverable: str) -> dict:
    """Simple CPM/CPE based rate estimate."""
    # Base CPM tiers
    if followers < 10_000:
        cpm = 15
    elif followers < 100_000:
        cpm = 25
    elif followers < 500_000:
        cpm = 40
    else:
        cpm = 60

    # Engagement multiplier
    eng_multiplier = 1 + max(0, (engagement_rate - 2) * 0.1)

    base = (followers / 1000) * cpm * eng_multiplier

    # Deliverable multiplier
    multipliers = {
        "reel": 1.2, "video": 1.2,
        "post": 1.0, "feed": 1.0,
        "story": 0.4, "stories": 0.4,
    }
    key = next((k for k in multipliers if k in deliverable.lower()), None)
    mult = multipliers.get(key, 1.0) if key else 1.0

    suggested = round(base * mult, -1)  # round to nearest $10

    return {
        "min": round(suggested * 0.8, -1),
        "max": round(suggested * 1.3, -1),
        "suggested": suggested,
        "reasoning": "Estimated from follower count, engagement rate, and deliverable type.",
    }
