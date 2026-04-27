'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import KanbanBoard from '@/components/KanbanBoard';
import type { Deal, Stage } from '@/components/KanbanBoard';

const MOCK_DEALS: Deal[] = [
  { id: '1', brand: 'Glossier',   deliverable: 'IG Reel × 1',   value: '$1,200', stage: 'Negotiating' },
  { id: '2', brand: 'Alo Yoga',   deliverable: 'IG Reel × 1',   value: '$2,400', stage: 'Contract Sent' },
  { id: '3', brand: 'Rhode Skin', deliverable: 'Story × 3',     value: '$850',   stage: 'Live' },
  { id: '4', brand: 'Notion',     deliverable: 'Feed Post × 2', value: '$1,800', stage: 'Paid' },
  { id: '5', brand: 'Lululemon',  deliverable: 'IG Reel × 2',   value: '$3,500', stage: 'Prospecting' },
  { id: '6', brand: 'Fenty Beauty', deliverable: 'Reel + Story', value: '$2,800', stage: 'Prospecting' },
];

export default function DashboardPage() {
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);

  const handleDealMove = (dealId: string, newStage: Stage) => {
    setDeals((prev) => prev.map((d) => d.id === dealId ? { ...d, stage: newStage } : d));
  };

  const totalEarned = deals.filter((d) => d.stage === 'Paid').reduce((sum, d) => sum + parseFloat(d.value.replace(/[$,]/g, '')), 0);
  const activeDeals = deals.filter((d) => d.stage !== 'Paid').length;

  return (
    <>
      <Head><title>Dashboard — Collabify</title></Head>
      <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <Navbar />
        <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-forest" style={{ fontFamily: 'Fraunces, serif' }}>
                Good morning. 👋
              </h1>
              <p className="text-forest/50 text-sm mt-1">Your pipeline is looking healthy this week.</p>
            </div>
            <Link href="/deals" className="btn-teal text-sm">+ New Deal</Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'EARNED (PAID)', value: `$${totalEarned.toLocaleString()}`, sub: 'From closed deals', color: '#059669' },
              { label: 'ACTIVE DEALS', value: String(activeDeals), sub: 'In pipeline', color: '#7c3aed' },
              { label: 'TOTAL PIPELINE', value: `$${deals.reduce((s, d) => s + parseFloat(d.value.replace(/[$,]/g, '')), 0).toLocaleString()}`, sub: 'All stages', color: '#0d9488' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-forest/8 shadow-sm">
                <div className="text-forest/40 text-xs font-bold tracking-wider mb-1">{s.label}</div>
                <div className="text-forest font-bold text-3xl" style={{ fontFamily: 'Fraunces, serif' }}>{s.value}</div>
                <div className="text-xs font-semibold mt-1" style={{ color: s.color }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Kanban */}
          <div className="bg-white rounded-2xl border border-forest/8 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-forest font-bold text-lg" style={{ fontFamily: 'Fraunces, serif' }}>Deal Pipeline</h2>
              <Link href="/deals" className="text-teal text-sm font-semibold hover:text-teal-dark transition-colors">View all →</Link>
            </div>
            <KanbanBoard deals={deals} onDealMove={handleDealMove} />
          </div>
        </main>
      </div>
    </>
  );
}
