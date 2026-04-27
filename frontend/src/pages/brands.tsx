'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';

interface Brand {
  id: string;
  name: string;
  niche: string;
  totalDeals: number;
  totalValue: string;
  paymentSpeed: 'Fast' | 'Average' | 'Slow';
  aiScore: number;
  lastDeal: string;
}

const MOCK_BRANDS: Brand[] = [
  { id: '1', name: 'Glossier',     niche: 'Beauty',   totalDeals: 4, totalValue: '$5,200', paymentSpeed: 'Fast',    aiScore: 92, lastDeal: '2026-04-01' },
  { id: '2', name: 'Alo Yoga',     niche: 'Fitness',  totalDeals: 2, totalValue: '$4,800', paymentSpeed: 'Average', aiScore: 78, lastDeal: '2026-03-15' },
  { id: '3', name: 'Rhode Skin',   niche: 'Beauty',   totalDeals: 3, totalValue: '$2,550', paymentSpeed: 'Slow',    aiScore: 61, lastDeal: '2026-02-20' },
  { id: '4', name: 'Notion',       niche: 'Tech',     totalDeals: 5, totalValue: '$9,000', paymentSpeed: 'Fast',    aiScore: 96, lastDeal: '2026-04-10' },
  { id: '5', name: 'Lululemon',    niche: 'Fitness',  totalDeals: 1, totalValue: '$3,500', paymentSpeed: 'Average', aiScore: 74, lastDeal: '2026-04-20' },
];

const SPEED_STYLES = {
  Fast:    { color: '#059669', bg: 'rgba(5,150,105,0.1)' },
  Average: { color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
  Slow:    { color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
};

export default function BrandsPage() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_BRANDS.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Head><title>Brands — Collabify</title></Head>
      <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <Navbar />
        <main className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-forest" style={{ fontFamily: 'Fraunces, serif' }}>Brand CRM</h1>
              <p className="text-forest/50 text-sm mt-1">Every brand, every deal — remembered.</p>
            </div>
            <button className="btn-teal text-sm">+ Add Brand</button>
          </div>

          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brands..."
            className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all mb-6"
          />

          {/* Brand cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((brand) => (
              <div key={brand.id} className="bg-white rounded-2xl border border-forest/8 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-forest font-bold text-lg" style={{ fontFamily: 'Fraunces, serif' }}>{brand.name}</div>
                    <div className="text-forest/40 text-xs mt-0.5">{brand.niche}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black" style={{ color: brand.aiScore >= 85 ? '#059669' : brand.aiScore >= 70 ? '#d97706' : '#dc2626', fontFamily: 'Fraunces, serif' }}>
                      {brand.aiScore}
                    </div>
                    <div className="text-forest/30 text-xs">AI Score</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <div className="text-forest/40 text-xs font-semibold tracking-wider">DEALS</div>
                    <div className="text-forest font-semibold">{brand.totalDeals}</div>
                  </div>
                  <div>
                    <div className="text-forest/40 text-xs font-semibold tracking-wider">TOTAL VALUE</div>
                    <div className="text-forest font-semibold">{brand.totalValue}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: SPEED_STYLES[brand.paymentSpeed].color, background: SPEED_STYLES[brand.paymentSpeed].bg }}>
                    {brand.paymentSpeed} payer
                  </span>
                  <span className="text-forest/30 text-xs">Last: {brand.lastDeal}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
