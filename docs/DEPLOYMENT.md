# Deployment Guide — Collabify

## Architecture

```
Vercel (frontend)  ←→  Railway (backend)  ←→  Railway PostgreSQL
```

---

## Frontend — Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual steps

```bash
cd frontend
npm install
npm run build   # verify build passes locally first
```

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Set **Root Directory** to `frontend`
4. Add environment variables (see `.env.example`):

```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

5. Deploy. Vercel auto-deploys on every push to `main`.

---

## Backend — Railway

### Initial setup

1. Go to [railway.app](https://railway.app) → New Project
2. Add **PostgreSQL** service — copy the `DATABASE_URL`
3. Add a new service → Deploy from GitHub → select repo
4. Set **Root Directory** to `backend`
5. Railway auto-detects the `Dockerfile`

### Environment variables (Railway)

```
DATABASE_URL=postgresql://...          # from Railway Postgres service
SECRET_KEY=your-random-256-bit-secret
FRONTEND_URL=https://your-app.vercel.app
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=collabify-uploads
AWS_REGION=us-east-1
SENDGRID_API_KEY=SG....
OPENAI_API_KEY=sk-...
INSTAGRAM_APP_ID=...
INSTAGRAM_APP_SECRET=...
```

### Run database migrations

In Railway dashboard → your backend service → Shell:

```bash
alembic upgrade head
```

---

## Local Development

### With Docker Compose (recommended)

```bash
# Copy env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Start everything
docker-compose up --build

# Run migrations (first time)
docker-compose exec backend alembic upgrade head
```

- Frontend: http://localhost:4028
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Without Docker

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in values
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

---

## Stripe Webhook Setup

1. In Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://your-backend.railway.app/api/stripe/webhook`
3. Events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
   - `invoice.payment_failed`
4. Copy the **Signing secret** → set as `STRIPE_WEBHOOK_SECRET`

---

## Production Checklist

- [ ] `SECRET_KEY` is a random 32+ char string (never reuse dev key)
- [ ] `STRIPE_SECRET_KEY` is the live key (not test)
- [ ] Stripe webhook endpoint verified
- [ ] `FRONTEND_URL` CORS origin matches Vercel URL exactly
- [ ] Database migrations run (`alembic upgrade head`)
- [ ] AWS S3 bucket created with correct IAM permissions
- [ ] SendGrid sender domain verified
- [ ] `DEBUG=false` in backend config
