import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.utils.db import Base, get_db

# Use an in-memory SQLite DB for tests
TEST_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

Base.metadata.create_all(bind=engine)
client = TestClient(app)


@pytest.fixture(autouse=True)
def clean_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield


def test_signup_success():
    res = client.post("/api/auth/signup", json={
        "name": "Test User",
        "email": "test@example.com",
        "password": "securepassword",
    })
    assert res.status_code == 201
    data = res.json()
    assert "access_token" in data
    assert data["user"]["email"] == "test@example.com"


def test_signup_duplicate_email():
    payload = {"name": "Test", "email": "dup@example.com", "password": "password123"}
    client.post("/api/auth/signup", json=payload)
    res = client.post("/api/auth/signup", json=payload)
    assert res.status_code == 400
    assert "already registered" in res.json()["detail"]


def test_login_success():
    client.post("/api/auth/signup", json={
        "name": "Login Test",
        "email": "login@example.com",
        "password": "mypassword",
    })
    res = client.post("/api/auth/login", json={
        "email": "login@example.com",
        "password": "mypassword",
    })
    assert res.status_code == 200
    assert "access_token" in res.json()


def test_login_wrong_password():
    client.post("/api/auth/signup", json={
        "name": "Bad Pass",
        "email": "bad@example.com",
        "password": "correctpass",
    })
    res = client.post("/api/auth/login", json={
        "email": "bad@example.com",
        "password": "wrongpass",
    })
    assert res.status_code == 401


def test_me_requires_auth():
    res = client.get("/api/auth/me")
    assert res.status_code == 401


def test_me_with_token():
    signup_res = client.post("/api/auth/signup", json={
        "name": "Me Test",
        "email": "me@example.com",
        "password": "password123",
    })
    token = signup_res.json()["access_token"]
    res = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    assert res.json()["email"] == "me@example.com"
