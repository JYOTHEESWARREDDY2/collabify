import logging
import httpx
from typing import Optional

from app.config import settings

logger = logging.getLogger(__name__)

INSTAGRAM_GRAPH_URL = "https://graph.instagram.com"


async def get_user_profile(access_token: str) -> Optional[dict]:
    """Fetch Instagram basic profile data."""
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"{INSTAGRAM_GRAPH_URL}/me",
            params={"fields": "id,username,account_type,media_count", "access_token": access_token},
        )
        if res.status_code != 200:
            logger.warning("Instagram API error: %s", res.text)
            return None
        return res.json()


async def get_follower_count(user_id: str, access_token: str) -> Optional[int]:
    """Get follower count via Instagram Graph API (requires Instagram Business Account)."""
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"{INSTAGRAM_GRAPH_URL}/{user_id}",
            params={"fields": "followers_count", "access_token": access_token},
        )
        if res.status_code != 200:
            return None
        data = res.json()
        return data.get("followers_count")


async def get_recent_media(user_id: str, access_token: str, limit: int = 12) -> list:
    """Fetch recent media posts."""
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"{INSTAGRAM_GRAPH_URL}/{user_id}/media",
            params={
                "fields": "id,caption,media_type,thumbnail_url,permalink,timestamp,like_count,comments_count",
                "limit": limit,
                "access_token": access_token,
            },
        )
        if res.status_code != 200:
            logger.warning("Instagram media fetch error: %s", res.text)
            return []
        return res.json().get("data", [])


def calculate_engagement_rate(posts: list) -> float:
    """Estimate engagement rate from recent posts."""
    if not posts:
        return 0.0
    total_engagement = sum(
        (p.get("like_count", 0) + p.get("comments_count", 0)) for p in posts
    )
    avg = total_engagement / len(posts)
    # Return as a percentage; caller divides by follower count
    return round(avg, 2)


def get_oauth_url(redirect_uri: str) -> str:
    """Build the Instagram OAuth authorization URL."""
    params = {
        "client_id": settings.INSTAGRAM_APP_ID,
        "redirect_uri": redirect_uri,
        "scope": "user_profile,user_media",
        "response_type": "code",
    }
    query = "&".join(f"{k}={v}" for k, v in params.items())
    return f"https://api.instagram.com/oauth/authorize?{query}"
