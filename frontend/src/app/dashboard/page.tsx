'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Deal {
  id: string;
  stage: string;
  brand: string;
  deliverable: string;
  value: string;
  stageColor: string;
  stageBg: string;
  dueDate?: string;
}

interface Stat {
  label: string;
  value: string;
  sub: string;
  color: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const stats: Stat[] = [
    { label: 'EARNED THIS MONTH', value: '$9,450', sub: '+$2,100 vs last', color: '#0d9488' },
    { label: 'ACTIVE DEALS', value: '12', sub: '4 awaiting payment', color: '#7c3aed' },
    { label: 'AVG DEAL VALUE', value: '$787', sub: '↑ up from $620', color: '#0d9488' }
  ];

  const deals: Deal[] = [
    { id: '1', stage: 'NEGOTIATING', brand: 'Glossier', deliverable: 'IG Reel × 1', value: '$1,200', stageColor: '#0d9488', stageBg: 'rgba(13,148,136,0.12)', dueDate: 'Due in 3 days' },
    { id: '2', stage: 'CONTRACT', brand: 'Alo Yoga', deliverable: 'IG Reel × 1', value: '$2,400', stageColor: '#7c3aed', stageBg: 'rgba(124,58,237,0.12)', dueDate: 'Sign by Friday' },
    { id: '3', stage: 'LIVE', brand: 'Rhode Skin', deliverable: 'IG Reel × 1', value: '$850', stageColor: '#0891b2', stageBg: 'rgba(8,145,178,0.12)', dueDate: 'Post by Wed' },
    { id: '4', stage: 'PAID ✓', brand: 'Notion', deliverable: 'IG Reel × 1', value: '$1,800', stageColor: '#059669', stageBg: 'rgba(5,150,105,0.12)', dueDate: 'Completed' },
    { id: '5', stage: 'NEGOTIATING', brand: 'Anthropic', deliverable: 'TikTok × 2', value: '$1,500', stageColor: '#0d9488', stageBg: 'rgba(13,148,136,0.12)', dueDate: 'Waiting on brief' },
    { id: '6', stage: 'CONTRACT', brand: 'Spring', deliverable: 'Instagram Stories × 4', value: '$680', stageColor: '#7c3aed', stageBg: 'rgba(124,58,237,0.12)', dueDate: 'Sign by Mon' }
  ];

  const stages = ['NEGOTIATING', 'CONTRACT', 'LIVE', 'INVOICED', 'PAID ✓'];

  return (
    <div className="min-h-screen bg-forest">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm">✦</span>
            <span className="font-bold text-white text-lg" style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em' }}>
              Collabify
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/60 hover:text-white transition-colors text-sm">Docs</button>
            <button className="text-white/60 hover:text-white transition-colors text-sm">Settings</button>
            <button className="w-8 h-8 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center hover:bg-white/20 transition-colors">
              S
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Greeting & CTA */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold mb-1">Good Morning, Sarah.</h1>
            <p className="text-white/40 text-sm">Your pipeline is up 12% this month. Keep crushing it.</p>
          </div>
          <button className="bg-teal text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-teal-dark transition-colors duration-200 flex items-center gap-2">
            <span>+</span>
            <span>New Deal</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
              <div className="text-white/40 text-xs font-bold tracking-widest mb-2">{stat.label}</div>
              <div className="text-white font-bold text-3xl mb-1">{stat.value}</div>
              <div className="text-xs font-semibold" style={{ color: stat.color }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Kanban Pipeline */}
        <div className="mb-10">
          <h2 className="text-white font-bold text-lg mb-4">Your Pipeline</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stages.map((stage) => (
              <div
                key={stage}
                className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/8 transition-colors duration-200 cursor-pointer"
                onClick={() => setActiveStage(activeStage === stage ? null : stage)}>
                
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <span className="text-white/60 text-xs font-bold tracking-wider">{stage}</span>
                  <span className="text-white/40 text-xs font-semibold">
                    {deals.filter(d => d.stage === stage).length}
                  </span>
                </div>

                {/* Cards in Stage */}
                <div className="space-y-3">
                  {deals
                    .filter(d => d.stage === stage)
                    .map((deal) => (
                      <div
                        key={deal.id}
                        className="bg-white/8 rounded-lg p-3 hover:bg-white/12 transition-colors duration-200 cursor-grab active:cursor-grabbing border border-white/5 group">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-white/80 font-semibold text-xs group-hover:text-white transition-colors">
                            {deal.brand}
                          </span>
                          <span
                            className="text-xs font-bold px-2 py-1 rounded-full flex-shrink-0"
                            style={{ color: deal.stageColor, background: deal.stageBg }}>
                            ${deal.value.replace('$', '')}
                          </span>
                        </div>
                        <div className="text-white/40 text-xs mb-2">{deal.deliverable}</div>
                        <div className="text-white/30 text-xs italic">{deal.dueDate}</div>
                      </div>
                    ))}
                </div>

                {/* Add Card Button */}
                <button className="w-full mt-4 py-2 text-white/40 hover:text-white text-xs font-semibold transition-colors duration-200 border border-white/10 rounded-lg hover:bg-white/5">
                  + Add deal
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
          <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Invoice paid', details: 'Glossier paid $1,200 invoice', time: '2 hours ago', icon: '✓' },
              { action: 'Contract signed', details: 'Alo Yoga signed contract for $2,400 deal', time: '1 day ago', icon: '📝' },
              { action: 'New message', details: 'Rhode Skin sent message: "Love the proposal!"', time: '2 days ago', icon: '💬' },
              { action: 'Deal added', details: 'You added Notion to your pipeline at $1,800', time: '3 days ago', icon: '✨' }
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 pb-3 border-b border-white/5 last:border-0">
                <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal text-sm flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">{activity.action}</div>
                  <div className="text-white/40 text-xs mt-0.5">{activity.details}</div>
                  <div className="text-white/30 text-xs mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
