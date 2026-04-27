import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.utils.db import Base, get_db

TEST_DATABASE_URL = "sqlite:///./test_invoices.db"
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


def get_token():
    res = client.post("/api/auth/signup", json={
        "name": "Invoice Tester",
        "email": "invoices@example.com",
        "password": "password123",
    })
    return res.json()["access_token"]


def auth_headers(token: str):
    return {"Authorization": f"Bearer {token}"}


def test_create_invoice():
    token = get_token()
    res = client.post("/api/invoices/", json={
        "brand_name": "Glossier",
        "project_name": "Spring Campaign",
        "amount": 1200.0,
        "tax_rate": 0.0,
    }, headers=auth_headers(token))
    assert res.status_code == 201
    data = res.json()
    assert data["brand_name"] == "Glossier"
    assert data["invoice_number"].startswith("INV-")
    assert data["status"] == "draft"


def test_invoice_number_sequential():
    token = get_token()
    for i in range(3):
        client.post("/api/invoices/", json={
            "brand_name": f"Brand{i}",
            "project_name": "Project",
            "amount": 500.0,
        }, headers=auth_headers(token))
    res = client.get("/api/invoices/", headers=auth_headers(token))
    numbers = [inv["invoice_number"] for inv in res.json()]
    assert len(set(numbers)) == 3  # all unique


def test_update_invoice_status():
    token = get_token()
    create_res = client.post("/api/invoices/", json={
        "brand_name": "Nike",
        "project_name": "Collab",
        "amount": 800.0,
    }, headers=auth_headers(token))
    inv_id = create_res.json()["id"]

    update_res = client.put(f"/api/invoices/{inv_id}", json={"status": "paid"},
                            headers=auth_headers(token))
    assert update_res.status_code == 200
    assert update_res.json()["status"] == "paid"


def test_total_amount_with_tax():
    token = get_token()
    res = client.post("/api/invoices/", json={
        "brand_name": "Taxco",
        "project_name": "GST Test",
        "amount": 1000.0,
        "tax_rate": 0.18,
    }, headers=auth_headers(token))
    assert res.status_code == 201
    assert res.json()["total_amount"] == pytest.approx(1180.0)
