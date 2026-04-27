from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.utils.db import engine, Base
from app.routes import auth, deals, brands, invoices, media_kit, stripe, users

# Create tables on startup (use Alembic for production migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:4028", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router,      prefix="/api/auth",      tags=["Auth"])
app.include_router(users.router,     prefix="/api/users",     tags=["Users"])
app.include_router(deals.router,     prefix="/api/deals",     tags=["Deals"])
app.include_router(brands.router,    prefix="/api/brands",    tags=["Brands"])
app.include_router(invoices.router,  prefix="/api/invoices",  tags=["Invoices"])
app.include_router(media_kit.router, prefix="/api/media-kit", tags=["Media Kit"])
app.include_router(stripe.router,    prefix="/api/stripe",    tags=["Stripe"])


@app.get("/", tags=["Health"])
def root():
    return {"status": "ok", "app": settings.APP_NAME, "version": settings.APP_VERSION}


@app.get("/health", tags=["Health"])
def health():
    return {"status": "healthy"}
