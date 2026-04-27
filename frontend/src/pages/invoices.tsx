'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import InvoiceForm from '@/components/InvoiceForm';

interface Invoice {
  id: string;
  brand: string;
  project: string;
  amount: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE' | 'DRAFT';
  dueDate: string;
}

const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-001', brand: 'Nexus Tech',  project: 'Q4 Product Review',   amount: '$12,500', status: 'PAID',    dueDate: '2026-03-01' },
  { id: 'INV-002', brand: 'Vogue Haven', project: 'Winter Collection',    amount: '$4,200',  status: 'OVERDUE', dueDate: '2026-03-15' },
  { id: 'INV-003', brand: 'Apex Fitness',project: 'Supplements Story',   amount: '$1,850',  status: 'PENDING', dueDate: '2026-05-01' },
  { id: 'INV-004', brand: 'Glossier',    project: 'Spring IG Campaign',  amount: '$1,200',  status: 'DRAFT',   dueDate: '2026-05-15' },
];

const STATUS_STYLES: Record<Invoice['status'], { color: string; bg: string }> = {
  PAID:    { color: '#059669', bg: 'rgba(5,150,105,0.1)' },
  PENDING: { color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
  OVERDUE: { color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
  DRAFT:   { color: '#6b7280', bg: 'rgba(107,114,128,0.1)' },
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'ALL' | Invoice['status']>('ALL');

  const filtered = filter === 'ALL' ? invoices : invoices.filter((i) => i.status === filter);

  return (
    <>
      <Head><title>Invoices — Collabify</title></Head>
      <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <Navbar />
        <main className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-forest" style={{ fontFamily: 'Fraunces, serif' }}>Invoices</h1>
              <p className="text-forest/50 text-sm mt-1">Track payments, send reminders, get paid.</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="btn-teal text-sm">
              {showForm ? '✕ Close' : '+ Create Invoice'}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'TOTAL PAID', value: '$12,500', color: '#059669' },
              { label: 'PENDING', value: '$6,050', color: '#d97706' },
              { label: 'OVERDUE', value: '$4,200', color: '#dc2626' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-forest/8 shadow-sm">
                <div className="text-forest/40 text-xs font-bold tracking-wider mb-1">{s.label}</div>
                <div className="text-forest font-bold text-2xl" style={{ fontFamily: 'Fraunces, serif' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* New invoice form */}
          {showForm && (
            <div className="bg-white rounded-2xl border border-forest/8 shadow-sm p-6 mb-6">
              <h2 className="text-lg font-bold text-forest mb-4" style={{ fontFamily: 'Fraunces, serif' }}>New Invoice</h2>
              <InvoiceForm onSubmit={(d) => {
                const inv: Invoice = {
                  id: `INV-00${invoices.length + 1}`,
                  brand: d.brandName,
                  project: d.projectName,
                  amount: `$${Number(d.amount).toLocaleString()}`,
                  status: 'DRAFT',
                  dueDate: d.dueDate || '',
                };
                setInvoices((p) => [inv, ...p]);
                setShowForm(false);
              }} onCancel={() => setShowForm(false)} />
            </div>
          )}

          {/* Filter tabs */}
          <div className="flex gap-2 mb-4">
            {(['ALL', 'PAID', 'PENDING', 'OVERDUE', 'DRAFT'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${filter === f ? 'bg-forest text-white' : 'text-forest/50 hover:text-forest'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Invoice list */}
          <div className="bg-white rounded-2xl border border-forest/8 overflow-hidden shadow-sm">
            {filtered.map((inv, i) => (
              <div key={inv.id} className={`px-6 py-4 flex items-center justify-between border-b border-forest/5 last:border-0 hover:bg-forest/[0.02] transition-colors ${i % 2 === 1 ? 'bg-forest/[0.01]' : ''}`}>
                <div>
                  <div className="text-forest font-semibold text-sm">{inv.brand}</div>
                  <div className="text-forest/40 text-xs mt-0.5">{inv.project} · {inv.id}</div>
                </div>
                <div className="flex items-center gap-4">
                  {inv.dueDate && <span className="text-forest/30 text-xs hidden sm:block">Due {inv.dueDate}</span>}
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: STATUS_STYLES[inv.status].color, background: STATUS_STYLES[inv.status].bg }}>
                    {inv.status}
                  </span>
                  <span className="text-forest font-bold text-sm">{inv.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
