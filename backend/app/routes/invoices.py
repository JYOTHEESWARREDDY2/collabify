from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import Response
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime

from app.utils.db import get_db
from app.utils.jwt import get_current_user
from app.models.user import User
from app.models.invoice import Invoice
from app.services.invoice_service import generate_invoice_pdf, generate_invoice_number

router = APIRouter()


class InvoiceCreate(BaseModel):
    brand_name: str
    project_name: str
    amount: float
    tax_rate: float = 0.0
    notes: Optional[str] = None
    due_date: Optional[datetime] = None
    deal_id: Optional[str] = None


class InvoiceUpdate(BaseModel):
    brand_name: Optional[str] = None
    project_name: Optional[str] = None
    amount: Optional[float] = None
    tax_rate: Optional[float] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    due_date: Optional[datetime] = None
    paid_at: Optional[datetime] = None


@router.get("/", response_model=List[dict])
def list_invoices(
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    q = db.query(Invoice).filter(Invoice.user_id == current_user.id)
    if status_filter:
        q = q.filter(Invoice.status == status_filter)
    return [i.to_dict() for i in q.order_by(Invoice.created_at.desc()).all()]


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_invoice(
    payload: InvoiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    invoice = Invoice(
        user_id=current_user.id,
        invoice_number=generate_invoice_number(db, current_user.id),
        **payload.model_dump(),
    )
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    return invoice.to_dict()


@router.get("/{invoice_id}")
def get_invoice(
    invoice_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    inv = db.query(Invoice).filter(Invoice.id == invoice_id, Invoice.user_id == current_user.id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return inv.to_dict()


@router.put("/{invoice_id}")
def update_invoice(
    invoice_id: str,
    payload: InvoiceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    inv = db.query(Invoice).filter(Invoice.id == invoice_id, Invoice.user_id == current_user.id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(inv, field, value)
    db.commit()
    db.refresh(inv)
    return inv.to_dict()


@router.get("/{invoice_id}/pdf")
def download_invoice_pdf(
    invoice_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    inv = db.query(Invoice).filter(Invoice.id == invoice_id, Invoice.user_id == current_user.id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")

    pdf_bytes = generate_invoice_pdf(inv, current_user)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="invoice-{inv.invoice_number}.pdf"'},
    )


@router.delete("/{invoice_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_invoice(
    invoice_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    inv = db.query(Invoice).filter(Invoice.id == invoice_id, Invoice.user_id == current_user.id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    db.delete(inv)
    db.commit()
