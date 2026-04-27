'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const NICHES = ['Beauty', 'Fashion', 'Fitness', 'Food', 'Tech', 'Travel', 'Lifestyle', 'Gaming', 'Finance', 'Other'];
const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'Twitter / X', 'LinkedIn', 'Twitch'];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ niche: '', platforms: [] as string[], followers: '', monthlyDeals: '' });

  const togglePlatform = (p: string) => {
    setData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(p) ? prev.platforms.filter((x) => x !== p) : [...prev.platforms, p],
    }));
  };

  return (
    <>
      <Head><title>Get Set Up — Collabify</title></Head>
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-teal' : s < step ? 'w-6 bg-teal/40' : 'w-6 bg-forest/10'}`} />
              ))}
            </div>
            <h1 className="text-2xl font-bold text-forest" style={{ fontFamily: 'Fraunces, serif' }}>
              {step === 1 && "What's your niche?"}
              {step === 2 && 'Which platforms are you on?'}
              {step === 3 && 'Almost there!'}
            </h1>
            <p className="text-forest/50 text-sm mt-1">Step {step} of 3</p>
          </div>

          <div className="bg-white rounded-2xl border border-forest/8 shadow-card p-8">
            {step === 1 && (
              <div className="flex flex-wrap gap-2">
                {NICHES.map((n) => (
                  <button
                    key={n}
                    onClick={() => setData((p) => ({ ...p, niche: n }))}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                      data.niche === n ? 'bg-forest text-white border-forest' : 'bg-white text-forest border-forest/15 hover:border-teal hover:text-teal'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                      data.platforms.includes(p) ? 'bg-forest text-white border-forest' : 'bg-white text-forest border-forest/15 hover:border-teal hover:text-teal'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                {[
                  { name: 'followers', label: 'TOTAL FOLLOWERS (approx)', placeholder: 'e.g. 50000' },
                  { name: 'monthlyDeals', label: 'DEALS PER MONTH', placeholder: 'e.g. 5' },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">{f.label}</label>
                    <input
                      name={f.name}
                      value={data[f.name as keyof typeof data] as string}
                      onChange={(e) => setData((p) => ({ ...p, [f.name]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 mt-6">
              {step > 1 && (
                <button onClick={() => setStep((s) => s - 1)} className="btn-outline-forest text-sm">← Back</button>
              )}
              {step < 3 ? (
                <button onClick={() => setStep((s) => s + 1)} className="btn-teal text-sm flex-1 justify-center">Continue →</button>
              ) : (
                <Link href="/dashboard" className="btn-teal text-sm flex-1 justify-center">Go to my dashboard →</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
