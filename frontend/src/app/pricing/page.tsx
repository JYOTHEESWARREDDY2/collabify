'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NavBar, Footer } from '../page';

interface PricingPlan {
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  badge?: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: { monthly: 0, annual: 0 },
    description: 'For creators just getting started with brand deals.',
    features: [
      'Up to 5 active deals',
      'Basic Kanban pipeline',
      'Manual media kit (no API sync)',
      '3 invoices per month',
      'Email support'
    ],
    cta: 'Get started free',
    highlighted: false
  },
  {
    name: 'Pro',
    price: { monthly: 29, annual: 19 },
    description: 'For full-time creators managing multiple brand partnerships.',
    badge: 'Most popular',
    features: [
      'Unlimited active deals',
      'Full Kanban pipeline',
      'Auto media kit (IG + TikTok + YouTube)',
      'Unlimited invoices & PDF export',
      'Contract generation + e-signature',
      'Brand CRM with AI scoring',
      'Deliverable reminders',
      'Priority support'
    ],
    cta: 'Start 14-day trial',
    highlighted: true
  },
  {
    name: 'Agency',
    price: { monthly: 79, annual: 59 },
    description: 'For talent managers and agencies handling multiple creators.',
    features: [
      'Everything in Pro',
      'Up to 10 creator profiles',
      'Team collaboration',
      'White-label media kits',
      'Bulk invoice management',
      'Advanced analytics & reporting',
      'Dedicated account manager',
      'Custom integrations'
    ],
    cta: 'Contact sales',
    highlighted: false
  }
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 40%, #f0fdfa 100%)' }}>
      <NavBar />

      {/* Hero */}
      <section className="pt-32 pb-16 text-center px-4">
        <div className="inline-flex items-center gap-2 chip mb-6">
          <span className="text-teal font-bold">Simple pricing.</span>
          <span>No surprises.</span>
        </div>
        <h1
          className="font-display text-forest mb-4"
          style={{
            fontFamily: 'Fraunces, serif',
            fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 1',
            letterSpacing: '-0.02em',
            fontSize: 'clamp(40px, 7vw, 80px)',
            lineHeight: 0.95
          }}>
          Pricing that grows<br />
          <span className="italic">with your hustle.</span>
        </h1>
        <p className="text-forest/60 text-lg max-w-xl mx-auto mb-8">
          Start free. Upgrade when you're ready. Cancel anytime — no hoops.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-white rounded-full px-2 py-2 border border-forest/10 shadow-sm">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${!annual ? 'bg-forest text-white' : 'text-forest/50 hover:text-forest'}`}>
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${annual ? 'bg-forest text-white' : 'text-forest/50 hover:text-forest'}`}>
            Annual
            <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: annual ? 'rgba(255,255,255,0.2)' : '#dcfce7', color: annual ? 'white' : '#059669' }}>
              Save 35%
            </span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 relative transition-all duration-200 hover:-translate-y-1 ${
                  plan.highlighted
                    ? 'bg-forest text-white shadow-2xl scale-105'
                    : 'bg-white border border-forest/10 shadow-sm hover:shadow-lg'
                }`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-teal text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`font-display text-2xl mb-1 ${plan.highlighted ? 'text-white' : 'text-forest'}`}
                    style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.01em' }}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.highlighted ? 'text-white/60' : 'text-forest/50'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-black ${plan.highlighted ? 'text-white' : 'text-forest'}`}
                      style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.03em' }}>
                      {plan.price.monthly === 0 ? 'Free' : `$${annual ? plan.price.annual : plan.price.monthly}`}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className={`text-sm ${plan.highlighted ? 'text-white/50' : 'text-forest/40'}`}>/mo</span>
                    )}
                  </div>
                  {plan.price.monthly > 0 && annual && (
                    <p className={`text-xs mt-1 ${plan.highlighted ? 'text-white/50' : 'text-forest/40'}`}>
                      Billed annually · ${plan.price.annual * 12}/yr
                    </p>
                  )}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-sm mb-8 transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-teal text-white hover:bg-teal-600 shadow-lg'
                      : 'bg-forest text-white hover:bg-forest/90'
                  }`}>
                  {plan.cta}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                        plan.highlighted ? 'bg-white/20 text-white' : 'bg-teal/15 text-teal'
                      }`}>✓</span>
                      <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-forest/70'}`}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
