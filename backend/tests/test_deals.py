import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.utils.db import Base, get_db

TEST_DATABASE_URL = "sqlite:///./test_deals.db"
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
        "name": "Deal Tester",
        "email": "deals@example.com",
        "password": "password123",
    })
    return res.json()["access_token"]


def auth_headers(token: str):
    return {"Authorization": f"Bearer {token}"}


def test_list_deals_empty():
    token = get_token()
    res = client.get("/api/deals/", headers=auth_headers(token))
    assert res.status_code == 200
    assert res.json() == []


def test_create_deal():
    token = get_token()
    res = client.post("/api/deals/", json={
        "brand_name": "Glossier",
        "deliverable": "IG Reel × 1",
        "value": 1200.0,
        "stage": "Prospecting",
    }, headers=auth_headers(token))
    assert res.status_code == 201
    data = res.json()
    assert data["brand_name"] == "Glossier"
    assert data["value"] == 1200.0


def test_update_deal_stage():
    token = get_token()
    create_res = client.post("/api/deals/", json={
        "brand_name": "Nike",
        "deliverable": "Story × 3",
        "value": 800.0,
    }, headers=auth_headers(token))
    deal_id = create_res.json()["id"]

    update_res = client.put(f"/api/deals/{deal_id}", json={"stage": "Negotiating"},
                            headers=auth_headers(token))
    assert update_res.status_code == 200
    assert update_res.json()["stage"] == "Negotiating"


def test_delete_deal():
    token = get_token()
    create_res = client.post("/api/deals/", json={
        "brand_name": "Adidas",
        "deliverable": "Feed Post × 2",
        "value": 600.0,
    }, headers=auth_headers(token))
    deal_id = create_res.json()["id"]

    del_res = client.delete(f"/api/deals/{deal_id}", headers=auth_headers(token))
    assert del_res.status_code == 204

    get_res = client.get(f"/api/deals/{deal_id}", headers=auth_headers(token))
    assert get_res.status_code == 404


def test_pipeline_stats():
    token = get_token()
    for brand, value, stage in [("A", 1000, "Paid"), ("B", 2000, "Live"), ("C", 500, "Prospecting")]:
        client.post("/api/deals/", json={
            "brand_name": brand, "deliverable": "Reel", "value": value, "stage": stage,
        }, headers=auth_headers(token))

    res = client.get("/api/deals/stats", headers=auth_headers(token))
    assert res.status_code == 200
    stats = res.json()
    assert stats["total_deals"] == 3
    assert stats["total_pipeline_value"] == 3500.0
    assert stats["paid_value"] == 1000.0
