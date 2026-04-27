# Collabify API Documentation

Base URL: `http://localhost:8000`  
Interactive docs: `http://localhost:8000/docs`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

Tokens are obtained from `/api/auth/signup` or `/api/auth/login`.

---

## Auth Endpoints

### POST /api/auth/signup
Create a new account.
```json
{ "name": "Sarah", "email": "sarah@example.com", "password": "securepass" }
```
Returns: `{ "access_token": "...", "token_type": "bearer", "user": {...} }`

### POST /api/auth/login
```json
{ "email": "sarah@example.com", "password": "securepass" }
```
Returns: `{ "access_token": "...", "token_type": "bearer", "user": {...} }`

### GET /api/auth/me
Returns the current authenticated user.

---

## Deals Endpoints

### GET /api/deals/
List all deals. Optional `?stage=Prospecting` filter.

### POST /api/deals/
```json
{
  "brand_name": "Glossier",
  "deliverable": "IG Reel × 1",
  "value": 1200.0,
  "stage": "Prospecting",
  "notes": "Initial outreach",
  "due_date": "2026-06-01T00:00:00Z"
}
```

### GET /api/deals/stats
Returns pipeline summary: total deals, total value, paid value, breakdown by stage.

### GET /api/deals/{deal_id}
### PUT /api/deals/{deal_id}
### DELETE /api/deals/{deal_id}

Valid stages: `Prospecting`, `Negotiating`, `Contract Sent`, `Live`, `Invoiced`, `Paid`

---

## Brands Endpoints

### GET /api/brands/
### POST /api/brands/
```json
{
  "name": "Glossier",
  "niche": "Beauty",
  "contact_name": "Jane Smith",
  "contact_email": "jane@glossier.com",
  "website": "https://glossier.com"
}
```
### GET /api/brands/{brand_id}
### PUT /api/brands/{brand_id}
### DELETE /api/brands/{brand_id}

---

## Invoices Endpoints

### GET /api/invoices/
Optional `?status_filter=pending`

### POST /api/invoices/
```json
{
  "brand_name": "Glossier",
  "project_name": "Spring Campaign",
  "amount": 1200.0,
  "tax_rate": 0.0,
  "due_date": "2026-05-30T00:00:00Z",
  "notes": "Net 30 payment terms"
}
```

### GET /api/invoices/{invoice_id}/pdf
Returns a PDF binary (application/pdf).

### GET /api/invoices/{invoice_id}
### PUT /api/invoices/{invoice_id}
### DELETE /api/invoices/{invoice_id}

Valid statuses: `draft`, `pending`, `paid`, `overdue`, `cancelled`

---

## Media Kit Endpoints

### GET /api/media-kit/
Get the authenticated user's media kit.

### POST /api/media-kit/
Save/update media kit.
```json
{
  "bio": "Lifestyle creator based in Mumbai.",
  "niche": "Fashion & Beauty",
  "ig_followers": 85000,
  "ig_engagement_rate": 4.2,
  "rate_card": { "reel": 1200, "story": 400, "post": 900 },
  "share_slug": "sarah-johnson",
  "is_public": true
}
```

### GET /api/media-kit/share/{slug}
Public endpoint — no auth required. Returns public media kit.

---

## Stripe Endpoints

### POST /api/stripe/create-checkout
```json
{ "plan_id": "pro", "annual": true }
```
Returns: `{ "checkout_url": "https://checkout.stripe.com/..." }`

### POST /api/stripe/portal
Returns: `{ "portal_url": "https://billing.stripe.com/..." }`

### POST /api/stripe/webhook
Stripe webhook receiver. Handles: `checkout.session.completed`, `customer.subscription.deleted`.

---

## Users Endpoints

### GET /api/users/me
### PUT /api/users/me
```json
{
  "name": "Sarah Johnson",
  "niche": "Beauty",
  "instagram_handle": "@sarahjohnson",
  "tiktok_handle": "@sarahjohnson"
}
```
### DELETE /api/users/me
Soft-deactivates the account.
