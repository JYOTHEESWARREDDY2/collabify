# Database Schema — Collabify

PostgreSQL via SQLAlchemy ORM + Alembic migrations.

## Entity Relationships

```
users (1) ──< deals (N)
users (1) ──< brands (N)
users (1) ──< invoices (N)
users (1) ──  media_kits (1)
deals (1) ──< deliverables (N)
brands (1) ──< deals (N)    [optional FK]
```

---

## Table: `users`

| Column | Type | Notes |
|---|---|---|
| id | UUID (String PK) | auto-generated |
| name | String(120) | required |
| email | String(255) | unique, indexed |
| hashed_password | String | bcrypt |
| plan | Enum | `starter` \| `pro` \| `agency` |
| stripe_customer_id | String | nullable |
| stripe_subscription_id | String | nullable |
| avatar_url | String | nullable, S3 URL |
| instagram_handle | String(80) | nullable |
| tiktok_handle | String(80) | nullable |
| youtube_handle | String(80) | nullable |
| niche | String(80) | e.g. "Beauty" |
| is_active | Boolean | soft-delete flag |
| created_at | DateTime(tz) | UTC |
| updated_at | DateTime(tz) | auto-updated |

---

## Table: `brands`

| Column | Type | Notes |
|---|---|---|
| id | UUID (String PK) | |
| user_id | FK → users.id | indexed |
| name | String(120) | required |
| niche | String(80) | nullable |
| contact_name | String(120) | nullable |
| contact_email | String(255) | nullable |
| website | String | nullable |
| notes | Text | nullable |
| total_deals | Integer | cached count |
| total_value | Float | cached sum |
| avg_payment_days | Integer | nullable |
| ai_score | Float | 0–100, nullable |
| created_at / updated_at | DateTime(tz) | |

---

## Table: `deals`

| Column | Type | Notes |
|---|---|---|
| id | UUID (String PK) | |
| user_id | FK → users.id | indexed |
| brand_id | FK → brands.id | nullable |
| brand_name | String(120) | denormalized for speed |
| deliverable | String(255) | e.g. "IG Reel × 2" |
| value | Float | deal amount (USD) |
| stage | Enum | `Prospecting` → `Paid` |
| notes | Text | nullable |
| contract_url | String | nullable, S3 or DocuSign |
| due_date | DateTime(tz) | nullable |
| created_at / updated_at | DateTime(tz) | |

**Stage enum values:** `Prospecting`, `Negotiating`, `Contract Sent`, `Live`, `Invoiced`, `Paid`

---

## Table: `deliverables`

| Column | Type | Notes |
|---|---|---|
| id | UUID (String PK) | |
| deal_id | FK → deals.id | indexed |
| title | String(255) | e.g. "IG Reel" |
| description | Text | nullable |
| due_date | DateTime(tz) | nullable |
| is_completed | Boolean | default False |
| completed_at | DateTime(tz) | nullable |
| post_url | String | link to live post |
| created_at / updated_at | DateTime(tz) | |

---

## Table: `invoices`

| Column | Type | Notes |
|---|---|---|
| id | UUID (String PK) | |
| user_id | FK → users.id | indexed |
| deal_id | FK → deals.id | nullable |
| invoice_number | String(40) | unique, e.g. `INV-2026-0001` |
| brand_name | String(120) | |
| project_name | String(255) | |
| amount | Float | subtotal |
| tax_rate | Float | e.g. 0.18 for 18% GST |
| status | Enum | `draft` \| `pending` \| `paid` \| `overdue` \| `cancelled` |
| notes | Text | nullable |
| pdf_url | String | S3 URL, nullable |
| due_date | DateTime(tz) | nullable |
| paid_at | DateTime(tz) | nullable |
| reminder_count | Integer | auto-reminders sent |
| created_at / updated_at | DateTime(tz) | |

---

## Table: `media_kits`

One-to-one with `users`.

| Column | Type | Notes |
|---|---|---|
| id | UUID (String PK) | |
| user_id | FK → users.id | unique |
| bio | String(500) | nullable |
| niche | String(80) | nullable |
| profile_image_url | String | nullable |
| ig_followers | Integer | nullable |
| ig_engagement_rate | Float | nullable |
| tiktok_followers | Integer | nullable |
| tiktok_engagement_rate | Float | nullable |
| youtube_subscribers | Integer | nullable |
| youtube_views_avg | Integer | nullable |
| rate_card | JSON | `{"reel": 1200, "story": 400, "post": 800}` |
| past_collabs | JSON | list of brand name strings |
| is_public | Boolean | whether share link is active |
| share_slug | String(80) | unique, e.g. `sarahjohnson` |
| last_synced_at | DateTime(tz) | last social API sync |
| created_at / updated_at | DateTime(tz) | |

---

## Migrations

```bash
# Create a new migration
alembic revision --autogenerate -m "description"

# Run migrations
alembic upgrade head

# Rollback one step
alembic downgrade -1

# View history
alembic history
```

Initial migration: `0001_initial` creates all tables from scratch.
