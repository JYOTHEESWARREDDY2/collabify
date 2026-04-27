'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';

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
      'Email support',
    ],
    cta: 'Get started free',
    highlighted: false,
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
      'Priority support',
    ],
    cta: 'Start 14-day trial',
    highlighted: true,
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
      'Custom integrations',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

const COMPARISON_FEATURES = [
  { feature: 'Active deals',         starter: '5',        pro: 'Unlimited', agency: 'Unlimited' },
  { feature: 'Kanban pipeline',      starter: 'Basic',    pro: '✓',         agency: '✓' },
  { feature: 'Media kit builder',    starter: 'Manual',   pro: 'Auto-sync', agency: 'White-label' },
  { feature: 'Invoices',             starter: '3/mo',     pro: 'Unlimited', agency: 'Unlimited' },
  { feature: 'Contract generation',  starter: '—',        pro: '✓',         agency: '✓' },
  { feature: 'E-signature',          starter: '—',        pro: '✓',         agency: '✓' },
  { feature: 'Brand CRM',            starter: '—',        pro: '✓',         agency: '✓' },
  { feature: 'AI brand scoring',     starter: '—',        pro: '✓',         agency: '✓' },
  { feature: 'Deliverable reminders',starter: '—',        pro: '✓',         agency: '✓' },
  { feature: 'Creator profiles',     starter: '1',        pro: '1',         agency: '10' },
  { feature: 'Team collaboration',   starter: '—',        pro: '—',         agency: '✓' },
  { feature: 'Analytics & reporting',starter: 'Basic',    pro: 'Standard',  agency: 'Advanced' },
  { feature: 'Support',              starter: 'Email',    pro: 'Priority',  agency: 'Dedicated' },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <Head>
        <title>Pricing — Collabify</title>
        <meta name="description" content="Simple pricing that grows with your hustle. Start free, upgrade when ready." />
      </Head>
      <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 40%, #f0fdfa 100%)' }}>
        <Navbar />

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
              lineHeight: 0.95,
            }}
          >
            Pricing that grows<br />
            <span className="italic">with your hustle.</span>
          </h1>
          <p className="text-forest/60 text-lg max-w-xl mx-auto mb-8">
            Start free. Upgrade when you're ready. Cancel anytime — no hoops.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-2 py-2 border border-forest/10 shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${!annual ? 'bg-forest text-white' : 'text-forest/50 hover:text-forest'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${annual ? 'bg-forest text-white' : 'text-forest/50 hover:text-forest'}`}
            >
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {PLANS.map((plan, i) => (
                <PricingCard key={i} {...plan} annual={annual} />
              ))}
            </div>
            <p className="text-center text-forest/40 text-sm mt-8">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2
                className="font-display text-forest mb-3"
                style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em', fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1 }}
              >
                Compare plans
              </h2>
              <p className="text-forest/50 text-base">Everything you need to know, side by side.</p>
            </div>
            <div className="rounded-2xl border border-forest/10 overflow-hidden">
              <div className="grid grid-cols-4 bg-forest/5 border-b border-forest/10">
                <div className="px-5 py-4 text-forest/50 text-sm font-semibold">Feature</div>
                {['Starter', 'Pro', 'Agency'].map((p) => (
                  <div key={p} className="px-5 py-4 text-center">
                    <span className="text-forest font-bold text-sm">{p}</span>
                  </div>
                ))}
              </div>
              {COMPARISON_FEATURES.map((row, i) => (
                <div key={i} className={`grid grid-cols-4 border-b border-forest/5 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-forest/[0.02]'}`}>
                  <div className="px-5 py-3.5 text-forest/70 text-sm">{row.feature}</div>
                  {[row.starter, row.pro, row.agency].map((val, j) => (
                    <div key={j} className="px-5 py-3.5 text-center">
                      <span className={`text-sm font-medium ${
                        val === '—' ? 'text-forest/20' :
                        val === '✓' ? 'text-teal font-bold text-base' :
                        j === 1 ? 'text-teal font-semibold' : 'text-forest/60'
                      }`}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2
                className="font-display text-forest mb-3"
                style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em', fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.1 }}
              >
                Pricing FAQs
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'Can I switch plans anytime?', a: "Yes. Upgrade or downgrade at any time. Changes take effect immediately and we'll prorate the difference." },
                { q: 'What happens after my trial ends?', a: "You'll be prompted to choose a plan. If you don't, your account moves to the free Starter plan — no data lost." },
                { q: 'Do you offer refunds?', a: "Yes. If you're not happy within the first 30 days of a paid plan, we'll refund you in full. No questions asked." },
                { q: 'Is there a discount for students or nonprofits?', a: "Yes — email us at hi@collabify.studio with proof and we'll set you up with 50% off Pro." },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-forest/8">
                  <h4 className="font-semibold text-forest mb-2">{faq.q}</h4>
                  <p className="text-forest/55 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-forest text-center px-4">
          <h2
            className="font-display text-white mb-4"
            style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em', fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.0 }}
          >
            Start free today.<br />
            <span className="italic">Upgrade when you're ready.</span>
          </h2>
          <p className="text-white/50 text-lg mb-10">14 days free. No credit card. Cancel in one click.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="btn-teal text-base">Start free trial</Link>
            <Link href="/" className="text-white/60 hover:text-white text-sm font-semibold transition-colors duration-200 underline underline-offset-4">
              Back to home
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
