# Collabify — The CRM for Creators Who Hustle

Manage brand deals, build media kits, send invoices & get AI-powered rate suggestions — all in one calm workspace.

## 🚀 Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python), SQLAlchemy, Alembic
- **Database**: PostgreSQL
- **Auth**: JWT
- **Payments**: Stripe
- **Storage**: AWS S3
- **Deploy**: Vercel (frontend) + Railway (backend)

## 📁 Project Structure

```
collabify/
├── frontend/       # Next.js React app
├── backend/        # FastAPI Python app
├── docs/           # Documentation
├── assets/         # Shared assets
└── docker-compose.yml
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Start everything with Docker

```bash
docker-compose up
```

### Frontend only

```bash
cd frontend
npm install
npm run dev
# → http://localhost:4028
```

### Backend only

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# → http://localhost:8000
```

## 📚 Docs

- [API Reference](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Design System](docs/DESIGN_SYSTEM.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## 🙏 Built with

- [Next.js](https://nextjs.org)
- [FastAPI](https://fastapi.tiangolo.com)
- [Tailwind CSS](https://tailwindcss.com)
