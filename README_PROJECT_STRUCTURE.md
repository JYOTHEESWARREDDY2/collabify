# Collabify - Monorepo Project Structure

> A modern full-stack SaaS platform for content creators and influencers to manage deals, contracts, media kits, and invoices.

## 📁 Project Overview

This project has been restructured into a **monorepo architecture** with clear separation between frontend and backend applications.

```
collabify/
├── frontend/          # Next.js 15 + React 19 (TypeScript)
├── backend/           # FastAPI (Python async)
├── docs/              # Project documentation
├── docker-compose.yml # Local development environment
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose

### Installation

```bash
# 1. Install Frontend Dependencies
cd frontend
npm install

# 2. Install Backend Dependencies
cd ../backend
pip install -r requirements.txt

# 3. Start Local Services
cd ..
docker-compose up -d

# 4. Run Frontend (Terminal 1)
cd frontend
npm run dev         # http://localhost:4028

# 5. Run Backend (Terminal 2)
cd backend
python -m uvicorn app.main:app --reload  # http://localhost:8000
```

## 📖 Documentation

- **[API Reference](./docs/API.md)** - REST API endpoints and authentication
- **[Database Schema](./docs/DATABASE.md)** - PostgreSQL schema documentation
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment steps
- **[Development Workflow](./docs/WORKFLOW.md)** - Local setup and development
- **[Design System](./docs/DESIGN_SYSTEM.md)** - Colors, typography, components
- **[Frontend Migration](./FRONTEND_MIGRATION_COMPLETE.md)** - Frontend code organization
- **[Migration Summary](./MIGRATION_COMPLETE.md)** - Complete migration details

## 🏗️ Frontend (Next.js)

**Location:** `/frontend`

### Tech Stack
- Next.js 15 (React 19)
- TypeScript 5
- Tailwind CSS 3.4
- Heroicons
- Recharts

### Key Pages
- **Landing Page** (`/`) - Hero, features, FAQ, pricing preview
- **Pricing Page** (`/pricing`) - 3-tier pricing model
- **404 Page** - Custom error page

### Commands
```bash
cd frontend
npm run dev          # Development server (port 4028)
npm run build        # Production build
npm run lint         # ESLint check
npm run format       # Prettier formatting
npm run type-check   # TypeScript validation
```

## 🔧 Backend (FastAPI)

**Location:** `/backend`

### Tech Stack
- FastAPI (Python async framework)
- SQLAlchemy ORM
- PostgreSQL 16
- JWT Authentication
- Pydantic validation

### Available Endpoints
- `GET /` - Health check
- `GET /docs` - Swagger UI API documentation
- `GET /redoc` - ReDoc API documentation

### Commands
```bash
cd backend
python -m uvicorn app.main:app --reload  # Development
python -m uvicorn app.main:app           # Production
```

## 🐳 Docker Services

**PostgreSQL 16** is available via Docker Compose for local development.

```bash
docker-compose up -d      # Start services
docker-compose down       # Stop services
docker-compose logs       # View logs
```

Access PostgreSQL:
```bash
docker exec -it postgres_db psql -U collabify
```

## 📊 Development Workflow

1. **Frontend Development**
   - Work in `/frontend/src/`
   - Create components in `components/`
   - Add pages in `app/`
   - Styles in `styles/tailwind.css`

2. **Backend Development**
   - Work in `/backend/app/`
   - Create routes in `routes/`
   - Add models in `models/`
   - Business logic in `services/`

3. **Database Changes**
   - Create Alembic migration
   - Run migrations with `alembic upgrade head`
   - Update models accordingly

## 🎯 Features

### Implemented ✅
- Landing page with features dropdown
- 3-tier pricing page
- Design system (colors, typography, animations)
- Responsive UI components
- ESLint & Prettier configuration
- Docker development environment

### In Progress / Planned 📋
- Authentication system
- Dashboard interface
- Deal management
- Invoice generation
- Media kit creation
- Stripe integration
- Contract management

## 📝 Environment Setup

### Frontend (.env.local - Frontend root)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env - Backend root)
```
DATABASE_URL=postgresql://collabify:password@localhost:5432/collabify
JWT_SECRET=your-secret-key-here
JWT_ALGORITHM=HS256
```

## 🔐 Security

- TypeScript strict mode enabled
- ESLint rules enforced
- Environment variables for sensitive data
- CORS middleware configured
- JWT ready for implementation

## 📱 Responsive Design

All pages are fully responsive with breakpoints for:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎨 Design System

**Colors:**
- Cream background: `#f5f2eb`
- Deep purple: `#1b0b2c`
- Pink accent: `#ec4899`
- Teal: `#0d9488`

**Fonts:**
- Display: Fraunces (serif)
- Body: Inter (sans-serif)
- Accent: Caveat, Dancing Script (cursive)

## 📚 API Documentation

Once backend is running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🚢 Deployment

- **Frontend:** Vercel (automatic from git)
- **Backend:** Railway (docker containerized)
- **Database:** PostgreSQL (managed or self-hosted)

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

## 📞 Support

For questions or issues:
1. Check the documentation in `/docs/`
2. Review migration notes in root `.md` files
3. Check component code in `frontend/src/`

## 📄 License

[Your License Here]

---

**Project Status:** Frontend migration complete ✅ | Backend scaffold ready 📋

**Next Steps:** 
1. Install dependencies
2. Start Docker services
3. Run frontend and backend
4. Begin backend development
