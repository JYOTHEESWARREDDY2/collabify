from typing import List
from app.models.deal import Deal


def compute_pipeline_stats(deals: List[Deal]) -> dict:
    """Compute summary stats for a user's pipeline."""
    total = len(deals)
    total_value = sum(d.value for d in deals)
    paid_deals = [d for d in deals if d.stage == "Paid"]
    active_deals = [d for d in deals if d.stage not in ("Paid",)]

    paid_value = sum(d.value for d in paid_deals)
    active_value = sum(d.value for d in active_deals)

    by_stage: dict = {}
    for deal in deals:
        stage = deal.stage or "Unknown"
        if stage not in by_stage:
            by_stage[stage] = {"count": 0, "value": 0.0}
        by_stage[stage]["count"] += 1
        by_stage[stage]["value"] += deal.value

    avg_deal_value = total_value / total if total > 0 else 0.0

    return {
        "total_deals": total,
        "total_pipeline_value": total_value,
        "paid_value": paid_value,
        "active_value": active_value,
        "avg_deal_value": avg_deal_value,
        "by_stage": by_stage,
    }
