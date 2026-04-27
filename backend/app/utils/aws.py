import logging
import uuid
from typing import Optional

from app.config import settings

logger = logging.getLogger(__name__)


def get_s3_client():
    import boto3
    return boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION,
    )


def upload_file(file_bytes: bytes, content_type: str, folder: str = "uploads") -> Optional[str]:
    """Upload bytes to S3 and return the public URL."""
    if not settings.AWS_ACCESS_KEY_ID:
        logger.warning("AWS credentials not configured — skipping upload")
        return None

    try:
        s3 = get_s3_client()
        ext = content_type.split("/")[-1]
        key = f"{folder}/{uuid.uuid4()}.{ext}"

        s3.put_object(
            Bucket=settings.AWS_S3_BUCKET,
            Key=key,
            Body=file_bytes,
            ContentType=content_type,
        )

        url = f"https://{settings.AWS_S3_BUCKET}.s3.{settings.AWS_REGION}.amazonaws.com/{key}"
        logger.info("Uploaded file to S3: %s", url)
        return url
    except Exception as exc:
        logger.error("S3 upload failed: %s", exc)
        return None


def upload_pdf(pdf_bytes: bytes, prefix: str = "invoices") -> Optional[str]:
    return upload_file(pdf_bytes, "application/pdf", folder=prefix)


def upload_image(image_bytes: bytes, content_type: str = "image/jpeg") -> Optional[str]:
    return upload_file(image_bytes, content_type, folder="images")


def generate_presigned_url(key: str, expires_in: int = 3600) -> Optional[str]:
    """Generate a pre-signed URL for private S3 objects."""
    if not settings.AWS_ACCESS_KEY_ID:
        return None
    try:
        s3 = get_s3_client()
        return s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": settings.AWS_S3_BUCKET, "Key": key},
            ExpiresIn=expires_in,
        )
    except Exception as exc:
        logger.error("Pre-signed URL generation failed: %s", exc)
        return None
