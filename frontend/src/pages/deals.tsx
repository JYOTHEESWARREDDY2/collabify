'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import KanbanBoard from '@/components/KanbanBoard';
import type { Deal, Stage } from '@/components/KanbanBoard';

const INITIAL_DEALS: Deal[] = [
  { id: '1', brand: 'Glossier',     deliverable: 'IG Reel × 1',   value: '$1,200', stage: 'Negotiating', dueDate: '2026-05-10' },
  { id: '2', brand: 'Alo Yoga',     deliverable: 'IG Reel × 1',   value: '$2,400', stage: 'Contract Sent' },
  { id: '3', brand: 'Rhode Skin',   deliverable: 'Story × 3',     value: '$850',   stage: 'Live', dueDate: '2026-05-01' },
  { id: '4', brand: 'Notion',       deliverable: 'Feed Post × 2', value: '$1,800', stage: 'Paid' },
  { id: '5', brand: 'Lululemon',    deliverable: 'IG Reel × 2',   value: '$3,500', stage: 'Prospecting' },
  { id: '6', brand: 'Fenty Beauty', deliverable: 'Reel + Story',  value: '$2,800', stage: 'Prospecting' },
  { id: '7', brand: 'Linear',       deliverable: 'Sponsored Post', value: '$950',  stage: 'Invoiced' },
];

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [showForm, setShowForm] = useState(false);
  const [newDeal, setNewDeal] = useState({ brand: '', deliverable: '', value: '' });

  const handleDealMove = (dealId: string, newStage: Stage) => {
    setDeals((prev) => prev.map((d) => d.id === dealId ? { ...d, stage: newStage } : d));
  };

  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    const deal: Deal = {
      id: String(Date.now()),
      brand: newDeal.brand,
      deliverable: newDeal.deliverable,
      value: newDeal.value.startsWith('$') ? newDeal.value : `$${newDeal.value}`,
      stage: 'Prospecting',
    };
    setDeals((prev) => [...prev, deal]);
    setNewDeal({ brand: '', deliverable: '', value: '' });
    setShowForm(false);
  };

  return (
    <>
      <Head><title>Deals — Collabify</title></Head>
      <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <Navbar />
        <main className="pt-24 pb-16 max-w-full px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-forest" style={{ fontFamily: 'Fraunces, serif' }}>Deal Pipeline</h1>
              <p className="text-forest/50 text-sm mt-1">{deals.length} deals · drag to move between stages</p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-teal text-sm">+ New Deal</button>
          </div>

          {/* Add deal modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4">
              <div className="bg-white rounded-2xl border border-forest/8 shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-xl font-bold text-forest mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Add New Deal</h2>
                <form onSubmit={handleAddDeal} className="space-y-4">
                  {[
                    { name: 'brand', label: 'BRAND NAME', placeholder: 'e.g. Glossier' },
                    { name: 'deliverable', label: 'DELIVERABLE', placeholder: 'e.g. IG Reel × 2' },
                    { name: 'value', label: 'DEAL VALUE', placeholder: 'e.g. 1200' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">{f.label}</label>
                      <input
                        name={f.name}
                        value={newDeal[f.name as keyof typeof newDeal]}
                        onChange={(e) => setNewDeal((p) => ({ ...p, [f.name]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all"
                        required
                      />
                    </div>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="btn-teal text-sm flex-1 justify-center">Add Deal</button>
                    <button type="button" onClick={() => setShowForm(false)} className="btn-outline-forest text-sm">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <KanbanBoard deals={deals} onDealMove={handleDealMove} />
        </main>
      </div>
    </>
  );
}
