"""initial schema

Revision ID: 0001_initial
Revises:
Create Date: 2026-04-27 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = '0001_initial'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ── users ─────────────────────────────────────────────────────────────────
    op.create_table(
        'users',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('name', sa.String(120), nullable=False),
        sa.Column('email', sa.String(255), nullable=False, unique=True, index=True),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('plan', sa.Enum('starter', 'pro', 'agency', name='plan_enum'), default='starter'),
        sa.Column('stripe_customer_id', sa.String(), nullable=True),
        sa.Column('stripe_subscription_id', sa.String(), nullable=True),
        sa.Column('avatar_url', sa.String(), nullable=True),
        sa.Column('instagram_handle', sa.String(80), nullable=True),
        sa.Column('tiktok_handle', sa.String(80), nullable=True),
        sa.Column('youtube_handle', sa.String(80), nullable=True),
        sa.Column('niche', sa.String(80), nullable=True),
        sa.Column('is_active', sa.Boolean(), default=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    )

    # ── brands ────────────────────────────────────────────────────────────────
    op.create_table(
        'brands',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('user_id', sa.String(), sa.ForeignKey('users.id'), nullable=False, index=True),
        sa.Column('name', sa.String(120), nullable=False),
        sa.Column('niche', sa.String(80), nullable=True),
        sa.Column('contact_name', sa.String(120), nullable=True),
        sa.Column('contact_email', sa.String(255), nullable=True),
        sa.Column('website', sa.String(), nullable=True),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('total_deals', sa.Integer(), default=0),
        sa.Column('total_value', sa.Float(), default=0.0),
        sa.Column('avg_payment_days', sa.Integer(), nullable=True),
        sa.Column('ai_score', sa.Float(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    )

    # ── deals ─────────────────────────────────────────────────────────────────
    op.create_table(
        'deals',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('user_id', sa.String(), sa.ForeignKey('users.id'), nullable=False, index=True),
        sa.Column('brand_id', sa.String(), sa.ForeignKey('brands.id'), nullable=True),
        sa.Column('brand_name', sa.String(120), nullable=False),
        sa.Column('deliverable', sa.String(255), nullable=False),
        sa.Column('value', sa.Float(), nullable=False, default=0.0),
        sa.Column('stage', sa.Enum(
            'Prospecting', 'Negotiating', 'Contract Sent', 'Live', 'Invoiced', 'Paid',
            name='deal_stage_enum'
        ), default='Prospecting'),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('contract_url', sa.String(), nullable=True),
        sa.Column('due_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    )

    # ── deliverables ──────────────────────────────────────────────────────────
    op.create_table(
        'deliverables',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('deal_id', sa.String(), sa.ForeignKey('deals.id'), nullable=False, index=True),
        sa.Column('title', sa.String(255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('due_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('is_completed', sa.Boolean(), default=False),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('post_url', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    )

    # ── invoices ──────────────────────────────────────────────────────────────
    op.create_table(
        'invoices',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('user_id', sa.String(), sa.ForeignKey('users.id'), nullable=False, index=True),
        sa.Column('deal_id', sa.String(), sa.ForeignKey('deals.id'), nullable=True),
        sa.Column('invoice_number', sa.String(40), nullable=False, unique=True),
        sa.Column('brand_name', sa.String(120), nullable=False),
        sa.Column('project_name', sa.String(255), nullable=False),
        sa.Column('amount', sa.Float(), nullable=False),
        sa.Column('tax_rate', sa.Float(), default=0.0),
        sa.Column('status', sa.Enum(
            'draft', 'pending', 'paid', 'overdue', 'cancelled',
            name='invoice_status_enum'
        ), default='draft'),
        sa.Column('notes', sa.Text(), nullable=True),
        sa.Column('pdf_url', sa.String(), nullable=True),
        sa.Column('due_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('paid_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('reminder_count', sa.Integer(), default=0),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    )

    # ── media_kits ────────────────────────────────────────────────────────────
    op.create_table(
        'media_kits',
        sa.Column('id', sa.String(), primary_key=True),
        sa.Column('user_id', sa.String(), sa.ForeignKey('users.id'), nullable=False, unique=True),
        sa.Column('bio', sa.String(500), nullable=True),
        sa.Column('niche', sa.String(80), nullable=True),
        sa.Column('profile_image_url', sa.String(), nullable=True),
        sa.Column('ig_followers', sa.Integer(), nullable=True),
        sa.Column('ig_engagement_rate', sa.Float(), nullable=True),
        sa.Column('tiktok_followers', sa.Integer(), nullable=True),
        sa.Column('tiktok_engagement_rate', sa.Float(), nullable=True),
        sa.Column('youtube_subscribers', sa.Integer(), nullable=True),
        sa.Column('youtube_views_avg', sa.Integer(), nullable=True),
        sa.Column('rate_card', sa.JSON(), nullable=True),
        sa.Column('past_collabs', sa.JSON(), nullable=True),
        sa.Column('is_public', sa.Boolean(), default=True),
        sa.Column('share_slug', sa.String(80), unique=True, nullable=True),
        sa.Column('last_synced_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    )


def downgrade() -> None:
    op.drop_table('media_kits')
    op.drop_table('invoices')
    op.drop_table('deliverables')
    op.drop_table('deals')
    op.drop_table('brands')
    op.drop_table('users')
    op.execute("DROP TYPE IF EXISTS deal_stage_enum")
    op.execute("DROP TYPE IF EXISTS invoice_status_enum")
    op.execute("DROP TYPE IF EXISTS plan_enum")
