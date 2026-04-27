from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Collabify API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    FRONTEND_URL: str = "http://localhost:4028"

    # Database
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/collabify"

    # JWT
    SECRET_KEY: str = "changeme-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days

    # Stripe
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""

    # AWS S3
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_S3_BUCKET: str = "collabify-uploads"
    AWS_REGION: str = "ap-south-1"

    # Email
    SENDGRID_API_KEY: str = ""
    FROM_EMAIL: str = "hi@collabify.studio"

    # OpenAI
    OPENAI_API_KEY: str = ""

    # Instagram
    INSTAGRAM_APP_ID: str = ""
    INSTAGRAM_APP_SECRET: str = ""

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
