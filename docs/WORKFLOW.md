# Workflow & 90-Day Plan — Collabify

## Phase 1 — Foundation (Days 1–30)

### Week 1: Core Auth + Dashboard
- [x] User signup / login (JWT)
- [x] Onboarding flow (niche, platforms, followers)
- [x] Dashboard page with stats + pipeline preview
- [x] Database schema + initial Alembic migration

### Week 2: Deal Pipeline
- [x] Kanban board (6 stages, drag-and-drop)
- [x] Deal CRUD (create, edit, delete, move stage)
- [x] Brand CRM (contact cards, deal history)
- [ ] Deal → Brand auto-linking

### Week 3: Invoices
- [x] Invoice form (brand, project, amount, due date)
- [x] Invoice list with status filters
- [x] PDF generation (reportlab)
- [ ] Email delivery (SendGrid)
- [ ] Auto-reminders (background job)

### Week 4: Media Kit
- [x] Media kit builder form
- [x] Shareable public link (`/kit/:slug`)
- [ ] Instagram API integration (live stats)
- [ ] TikTok API integration

---

## Phase 2 — Growth (Days 31–60)

### Week 5–6: AI Features
- [ ] AI rate suggestion (based on niche + follower count)
- [ ] Brand scoring (payment speed, deal value, communication)
- [ ] AI pitch email generator

### Week 7: Payments + Subscriptions
- [x] Stripe checkout (Pro + Agency plans)
- [x] Stripe webhook handler
- [x] Billing portal (manage subscription)
- [ ] Plan enforcement (feature gating by plan)

### Week 8: Contracts + Deliverables
- [ ] Contract template generator
- [ ] DocuSign / PandaDoc e-signature integration
- [ ] Deliverable tracker with deadline reminders
- [ ] 48h pre-due-date email notifications

---

## Phase 3 — Polish (Days 61–90)

### Week 9–10: Analytics
- [ ] Revenue chart (monthly / quarterly)
- [ ] Pipeline conversion funnel
- [ ] Platform performance breakdown

### Week 11: Mobile + Performance
- [ ] Responsive polish across all pages
- [ ] PWA support (offline-capable)
- [ ] Image optimization audit
- [ ] Lighthouse score > 90

### Week 12: Launch
- [ ] End-to-end QA pass
- [ ] Copy review + SEO meta tags
- [ ] ProductHunt launch prep
- [ ] Affiliate program setup

---

## Development Conventions

### Branch strategy
```
main          → production
develop       → staging
feat/xxx      → feature branches
fix/xxx       → bug fixes
```

### Commit format
```
feat: add invoice PDF download
fix: kanban drag-and-drop on mobile
chore: update dependencies
docs: add deployment guide
```

### Code review checklist
- [ ] No `console.log` in production code
- [ ] TypeScript errors resolved
- [ ] New API routes have auth middleware
- [ ] Pydantic models validate input
- [ ] Tests added for new backend routes
- [ ] Responsive at 375px, 768px, 1280px

---

## Environment Management

| Environment | Frontend | Backend | DB |
|---|---|---|---|
| Local | localhost:4028 | localhost:8000 | Docker PostgreSQL |
| Preview | Vercel preview URL | Railway staging | Railway staging DB |
| Production | collabify.studio | api.collabify.studio | Railway production DB |
