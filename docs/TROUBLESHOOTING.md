# Troubleshooting — Collabify

## Frontend Issues

### `Module not found: @heroicons/react`
```bash
cd frontend && npm install @heroicons/react
```

### `Cannot find module '@/components/...'`
Check `tsconfig.json` has:
```json
"paths": { "@/*": ["./src/*"] }
```

### Tailwind classes not applying
Verify `tailwind.config.js` content array includes your file path, then restart `npm run dev`.

### `next dev` fails with port in use
```bash
lsof -ti:4028 | xargs kill -9
npm run dev
```

### Images failing to load from external URLs
Add the hostname to `frontend/image-hosts.config.mjs`:
```js
{ protocol: 'https', hostname: 'your-cdn.com' }
```

---

## Backend Issues

### `sqlalchemy.exc.OperationalError: could not connect to server`
Check `DATABASE_URL` in `backend/.env`. For local dev with Docker:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/collabify
```

### `alembic.util.exc.CommandError: Can't locate revision identified by '...'`
```bash
alembic stamp head   # mark current DB as up to date
alembic upgrade head
```

### `ModuleNotFoundError: No module named 'app'`
Run uvicorn from inside the `backend/` directory:
```bash
cd backend
uvicorn app.main:app --reload
```

### JWT `401 Unauthorized` on all protected routes
Token expired or malformed. Check:
1. Frontend is sending `Authorization: Bearer <token>` header
2. `SECRET_KEY` env var is set in backend `.env`
3. Token hasn't expired (default: 7 days)

### `passlib` bcrypt warning
```bash
pip install bcrypt==4.0.1
```

### Stripe webhook `400 Invalid webhook signature`
- Make sure you're using the **raw body** (not parsed JSON) for signature verification
- `STRIPE_WEBHOOK_SECRET` must match the secret from Stripe Dashboard → Webhooks
- For local testing use [Stripe CLI](https://stripe.com/docs/stripe-cli):
  ```bash
  stripe listen --forward-to localhost:8000/api/stripe/webhook
  ```

---

## Docker Issues

### `docker-compose up` fails: `port already in use`
```bash
docker-compose down
docker system prune -f
docker-compose up --build
```

### Database container not accepting connections
Wait 5–10 seconds for PostgreSQL to initialise, then:
```bash
docker-compose exec backend alembic upgrade head
```

### Changes not reflected after rebuild
```bash
docker-compose up --build --force-recreate
```

---

## Common Errors

| Error | Likely cause | Fix |
|---|---|---|
| `CORS policy blocked` | Backend CORS `allow_origins` doesn't include frontend URL | Add `FRONTEND_URL` to backend `.env` |
| `422 Unprocessable Entity` | Request body doesn't match Pydantic schema | Check field names and types |
| `500 Internal Server Error` | Unhandled exception in route | Check backend logs: `docker-compose logs backend` |
| `TypeError: Cannot read properties of undefined` | API response shape changed | Check the backend route's `to_dict()` output |
| Fraunces font not loading | Google Fonts blocked or slow | Add `font-display: swap` or self-host the font |

---

## Getting Help

- **Email:** hi@collabify.studio
- **API Docs (local):** http://localhost:8000/docs
- **FastAPI ReDoc:** http://localhost:8000/redoc
