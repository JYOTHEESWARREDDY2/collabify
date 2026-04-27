'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import MediaKitBuilder from '@/components/MediaKitBuilder';

export default function MediaKitPage() {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Head><title>Media Kit — Collabify</title></Head>
      <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <Navbar />
        <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-forest" style={{ fontFamily: 'Fraunces, serif' }}>Media Kit Builder</h1>
            <p className="text-forest/50 text-sm mt-1">Build your media kit once. Share it everywhere.</p>
          </div>

          {saved && (
            <div className="bg-teal/10 border border-teal/20 rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
              <span className="text-teal text-sm font-semibold">✓ Media kit saved! Your shareable link is ready.</span>
            </div>
          )}

          <MediaKitBuilder
            onSave={() => setSaved(true)}
            onShare={() => {
              navigator.clipboard?.writeText('https://collabify.studio/kit/your-handle');
              alert('Link copied to clipboard!');
            }}
          />
        </main>
      </div>
    </>
  );
}
