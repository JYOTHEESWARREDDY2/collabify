'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Feature {
  icon: string;
  tag: string;
  title: string;
  description: string;
  color: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface KanbanDeal {
  stage: string;
  brand: string;
  deliverable: string;
  value: string;
  stageColor: string;
  stageBg: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const FEATURES: Feature[] = [
  {
    icon: '📋',
    tag: 'DEAL PIPELINE',
    title: 'Drag deals from prospect to paid.',
    description: 'Six-stage Kanban built for the mess of real brand deals. Prospecting → Negotiating → Contract Sent → Live → Invoiced → Paid. Miss nothing.',
    color: '#0d9488'
  },
  {
    icon: '✨',
    tag: 'MEDIA KIT',
    title: 'Auto-built from your socials.',
    description: 'Instagram, TikTok & YouTube APIs pull live follower + engagement stats. Always up-to-date. One shareable link to send any brand.',
    color: '#7c3aed'
  },
  {
    icon: '🧾',
    tag: 'INVOICES',
    title: 'Professional PDFs in 10 seconds.',
    description: 'Convert any deal into a branded invoice. Send by email. Track till paid. Auto-reminders chase brands so you don\'t have to.',
    color: '#0d9488'
  },
  {
    icon: '🏷️',
    tag: 'BRAND CRM',
    title: 'Every brand, remembered.',
    description: 'Contacts, deal history, payment speed — all in one card. AI scores each brand by payment speed, deal value & communication quality.',
    color: '#7c3aed'
  },
  {
    icon: '📄',
    tag: 'CONTRACTS',
    title: 'Sign deals without the back-and-forth.',
    description: 'Generate contracts, set deliverable deadlines, and get reminders before you miss them. DocuSign integration built in.',
    color: '#0d9488'
  },
  {
    icon: '⏰',
    tag: 'DELIVERABLE TRACKER',
    title: 'Never miss a deadline again.',
    description: 'Attach deadlines to any deal. Get reminders 48h before a post is due. Set 3 posts, 2 stories by Friday — and actually deliver.',
    color: '#7c3aed'
  }
];

const FAQS: FAQItem[] = [
  {
    question: 'Do I need to connect Instagram to use Collabify?',
    answer: 'Nope. You can use every feature manually. Connecting IG just auto-fills your media kit with live stats — it\'s optional but powerful.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, one click. No hoops, no "please call us to cancel" nonsense. We earn your subscription every month.'
  },
  {
    question: 'What platforms does the media kit support?',
    answer: 'Instagram Graph API, TikTok for Developers API, and YouTube Data API. All three pull live follower + engagement stats automatically.'
  },
  {
    question: 'Can I generate contracts and invoices?',
    answer: 'Yes — professional PDF invoices in seconds, and contract generation with e-signature support via DocuSign/PandaDoc integration. Net-30 hell ends here.'
  },
  {
    question: 'Do you offer a free trial?',
    answer: '14 days free, no credit card required. Cancel in one click if it\'s not for you — but we\'re pretty confident you\'ll stay.'
  }
];

const KANBAN_DEALS: KanbanDeal[] = [
  { stage: 'NEGOTIATING', brand: 'Glossier', deliverable: 'IG Reel × 1', value: '$1,200', stageColor: '#0d9488', stageBg: 'rgba(13,148,136,0.12)' },
  { stage: 'CONTRACT', brand: 'Alo Yoga', deliverable: 'IG Reel × 1', value: '$2,400', stageColor: '#7c3aed', stageBg: 'rgba(124,58,237,0.12)' },
  { stage: 'LIVE', brand: 'Rhode Skin', deliverable: 'IG Reel × 1', value: '$850', stageColor: '#0891b2', stageBg: 'rgba(8,145,178,0.12)' },
  { stage: 'PAID ✓', brand: 'Notion', deliverable: 'IG Reel × 1', value: '$1,800', stageColor: '#059669', stageBg: 'rgba(5,150,105,0.12)' }
];

// ─── Shared Components ────────────────────────────────────────────────────────
export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="pill-nav flex items-center justify-between px-4 sm:px-6 py-3"
          style={{ boxShadow: scrolled ? '0 4px 24px -8px rgba(2,44,34,0.14)' : 'none' }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-forest text-lg">
            <span className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-white text-sm">✦</span>
            <span style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em' }}>Collabify</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-forest">
            <a href="/#features" className="hover:text-teal transition-colors duration-200">Features</a>
            <Link href="/pricing" className="hover:text-teal transition-colors duration-200">Pricing</Link>
            <a href="/#faq" className="hover:text-teal transition-colors duration-200">FAQ</a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-semibold text-forest hover:text-teal transition-colors duration-200 px-3 py-2">
              Log in
            </button>
            <button className="btn-teal text-sm !py-2 !px-5">
              Start trial
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-forest"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu">
            <div className="w-5 h-0.5 bg-forest mb-1" />
            <div className="w-5 h-0.5 bg-forest mb-1" />
            <div className="w-5 h-0.5 bg-forest" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mt-2 bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-3">
            <a href="/#features" className="text-sm font-medium text-forest py-2 border-b border-border" onClick={() => setMobileOpen(false)}>Features</a>
            <Link href="/pricing" className="text-sm font-medium text-forest py-2 border-b border-border" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <a href="/#faq" className="text-sm font-medium text-forest py-2" onClick={() => setMobileOpen(false)}>FAQ</a>
            <button className="btn-teal w-full justify-center mt-2">Start 14-day trial</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm">✦</span>
              <span className="font-bold text-white text-lg" style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em' }}>
                Collabify
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              The CRM for creators who hustle. Manage brand deals, build media kits, send invoices — all in one calm workspace.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider">Product</h4>
            <ul className="space-y-3">
              {['Deal pipeline', 'Media kit builder', 'Invoices', 'Brand CRM', 'Contracts', 'Deliverable tracker'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 text-sm hover:text-white transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* For */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider">For</h4>
            <ul className="space-y-3">
              {['Solo creators', 'Micro-influencers', 'Talent managers', 'Agencies'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 text-sm hover:text-white transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'Pricing', href: '/pricing' },
                { label: 'Blog', href: '#' },
                { label: 'Changelog', href: '#' },
                { label: 'Affiliate', href: '#' },
                { label: 'Contact', href: 'mailto:hi@collabify.studio' }
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/40 text-sm hover:text-white transition-colors duration-200">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">© 2026 Collabify Studio. Made for creators who hustle.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="text-white/30 text-xs">All systems normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Sections ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden relative" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 40%, #f0fdfa 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 chip mb-8">
              <span className="text-teal font-bold">New:</span>
              <span>AI pitch emails for creators</span>
              <span className="ml-1">→</span>
            </div>

            <h1
              className="font-display text-forest leading-none mb-6"
              style={{
                fontFamily: 'Fraunces, serif',
                fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 1',
                letterSpacing: '-0.02em',
                fontSize: 'clamp(48px, 7vw, 88px)',
                lineHeight: 0.95
              }}>
              The CRM for<br />
              <span className="italic">creators</span><br />
              who hustle.
            </h1>

            <p className="text-lg text-forest/60 max-w-xl mb-8 leading-relaxed">
              Manage <strong className="text-forest">brand deals</strong>, build{' '}
              <strong className="text-forest">media kits</strong>, send{' '}
              <strong className="text-forest">invoices</strong> & track{' '}
              <strong className="text-forest">contracts</strong> — all in one calm workspace.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-4">
              <button className="btn-teal text-base w-full sm:w-auto justify-center">
                Start 14-day trial
              </button>
              <Link href="/pricing" className="btn-outline-forest text-base w-full sm:w-auto justify-center">
                See pricing
              </Link>
            </div>
            <p className="text-sm text-forest/40">No credit card. Cancel in one click.</p>
          </div>

          {/* Right: dashboard preview */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-forest/10" style={{ background: '#022c22' }}>
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <span className="ml-3 text-xs text-white/40 font-mono">collabify.studio / dashboard</span>
              </div>

              {/* Dashboard mock */}
              <div className="p-5">
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-white font-bold text-lg" style={{ fontFamily: 'Fraunces, serif' }}>Good Morning, Sarah.</div>
                    <div className="text-white/40 text-xs mt-0.5">Your pipeline is up 12% this month.</div>
                  </div>
                  <button className="bg-teal text-white text-xs font-semibold px-4 py-2 rounded-lg">+ New Deal</button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'EARNED THIS MONTH', value: '$9,450', sub: '+$2,100 vs last', color: '#0d9488' },
                    { label: 'ACTIVE DEALS', value: '12', sub: '4 awaiting payment', color: '#7c3aed' },
                    { label: 'AVG DEAL VALUE', value: '$787', sub: '↑ up from $620', color: '#0d9488' }
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-forest/8">
                      <div className="text-forest/40 text-xs font-bold tracking-wider mb-1">{s.label}</div>
                      <div className="text-forest font-bold text-xl">{s.value}</div>
                      <div className="text-xs font-semibold mt-0.5" style={{ color: s.color }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Kanban preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {KANBAN_DEALS.map((deal, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-forest/8">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 block" style={{ color: deal.stageColor, background: deal.stageBg }}>
                        {deal.stage}
                      </span>
                      <div className="text-forest font-semibold text-sm">{deal.brand}</div>
                      <div className="text-forest/40 text-xs mt-0.5">{deal.deliverable}</div>
                      <div className="text-forest font-bold text-sm mt-1">{deal.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-forest/8">
              <span className="text-2xl">📈</span>
              <div>
                <div className="text-forest font-bold text-sm">+$12K this month</div>
                <div className="text-forest/40 text-xs">vs $8.2K last month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductScreenshots() {
  const screens = [
    {
      title: 'Earnings Overview',
      description: 'Track every dollar. See total paid, pending invoices, and platform revenue mix at a glance.',
      badge: 'INVOICES & EARNINGS',
      badgeColor: '#7c3aed',
      mockContent: (
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-forest font-bold text-xl" style={{ fontFamily: 'Fraunces, serif' }}>Earnings Overview</div>
              <div className="text-forest/50 text-xs mt-0.5">Track your revenue and manage brand partnerships.</div>
            </div>
            <button className="bg-violet-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">+ Create Invoice</button>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'TOTAL PAID', value: '$42,850', sub: '+12%', color: '#059669' },
              { label: 'PENDING', value: '$8,240', sub: '5 items', color: '#d97706' },
              { label: 'THIS MONTH', value: '$9,450', sub: '↑ from $7.8K', color: '#7c3aed' }
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-forest/8">
                <div className="text-forest/40 text-xs font-bold tracking-wider mb-1">{s.label}</div>
                <div className="text-forest font-bold text-lg">{s.value}</div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: s.color }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-forest/8 overflow-hidden">
            <div className="px-4 py-3 border-b border-forest/8 flex items-center justify-between">
              <span className="text-forest font-semibold text-sm">Recent Invoices</span>
              <div className="flex gap-1">
                {['ALL', 'PENDING', 'PAID'].map(t => (
                  <span key={t} className={`text-xs px-2 py-1 rounded-md font-semibold ${t === 'ALL' ? 'bg-forest text-white' : 'text-forest/40'}`}>{t}</span>
                ))}
              </div>
            </div>
            {[
              { brand: 'Nexus Tech', project: 'Q4 Product Review', status: 'PAID', amount: '$12,500', statusColor: '#059669', statusBg: 'rgba(5,150,105,0.1)' },
              { brand: 'Vogue Haven', project: 'Winter Collection', status: 'OVERDUE', amount: '$4,200', statusColor: '#dc2626', statusBg: 'rgba(220,38,38,0.1)' },
              { brand: 'Apex Fitness', project: 'Supplements Story', status: 'PROCESSING', amount: '$1,850', statusColor: '#7c3aed', statusBg: 'rgba(124,58,237,0.1)' }
            ].map((inv, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between border-b border-forest/5 last:border-0">
                <div>
                  <div className="text-forest font-semibold text-sm">{inv.brand}</div>
                  <div className="text-forest/40 text-xs">{inv.project}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: inv.statusColor, background: inv.statusBg }}>{inv.status}</span>
                  <span className="text-forest font-bold text-sm">{inv.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Deal Pipeline',
      description: 'Kanban board for every brand collab. One glance shows where every deal stands.',
      badge: 'DEAL PIPELINE',
      badgeColor: '#0d9488',
      mockContent: (
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-forest font-bold text-xl" style={{ fontFamily: 'Fraunces, serif' }}>Deal Pipeline</div>
              <div className="text-forest/50 text-xs mt-0.5">12 active deals · $42K in pipeline</div>
            </div>
            <button className="bg-teal text-white text-xs font-semibold px-3 py-1.5 rounded-lg">+ New Deal</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { stage: 'PROSPECTING', deals: [{ brand: 'Glossier', value: '$1,200' }, { brand: 'Fenty Beauty', value: '$2,800' }], color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
              { stage: 'NEGOTIATING', deals: [{ brand: 'Alo Yoga', value: '$2,400' }, { brand: 'Lululemon', value: '$3,500' }], color: '#0d9488', bg: 'rgba(13,148,136,0.08)' },
              { stage: 'CONTRACT SENT', deals: [{ brand: 'Rhode Skin', value: '$850' }], color: '#d97706', bg: 'rgba(217,119,6,0.08)' },
              { stage: 'PAID ✓', deals: [{ brand: 'Notion', value: '$1,800' }, { brand: 'Linear', value: '$950' }], color: '#059669', bg: 'rgba(5,150,105,0.08)' }
            ].map((col, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-forest/8">
                <div className="text-xs font-bold tracking-wider mb-2" style={{ color: col.color }}>{col.stage}</div>
                {col.deals.map((d, j) => (
                  <div key={j} className="bg-white rounded-lg p-2.5 mb-2 last:mb-0 border border-forest/8">
                    <div className="text-forest font-semibold text-xs">{d.brand}</div>
                    <div className="text-forest font-bold text-sm mt-0.5">{d.value}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Contracts',
      description: 'Securely manage legal documents, brand agreements, and production licenses in one place.',
      badge: 'CONTRACTS',
      badgeColor: '#7c3aed',
      mockContent: (
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-forest font-bold text-xl" style={{ fontFamily: 'Fraunces, serif' }}>Contracts</div>
              <div className="text-forest/50 text-xs mt-0.5">Securely manage your legal documents.</div>
            </div>
            <button className="bg-violet-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">+ New Agreement</button>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'TOTAL ACTIVE', value: '12', sub: '+2 this month', color: '#7c3aed' },
              { label: 'PENDING SIGNATURE', value: '3', sub: 'Awaiting brand', color: '#d97706' },
              { label: 'RENEWAL VALUE', value: '$42.5k', sub: 'Next 30 days', color: '#059669' }
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-forest/8">
                <div className="text-forest/40 text-xs font-bold tracking-wider mb-1">{s.label}</div>
                <div className="text-forest font-bold text-xl">{s.value}</div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: s.color }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-forest/8 overflow-hidden">
            {[
              { name: 'Summer Campaign 2024', brand: 'Luxe Cosmetics', status: 'Signed', value: '$12,000', statusColor: '#059669', statusBg: 'rgba(5,150,105,0.1)' },
              { name: 'Product Launch Deliverables', brand: 'TechGear Pro', status: 'Pending Signature', value: '$8,500', statusColor: '#d97706', statusBg: 'rgba(217,119,6,0.1)' },
              { name: 'Social Media Retainer', brand: 'StyleHub Global', status: 'Signed', value: '$22,000', statusColor: '#059669', statusBg: 'rgba(5,150,105,0.1)' }
            ].map((c, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between border-b border-forest/5 last:border-0">
                <div>
                  <div className="text-forest font-semibold text-sm">{c.name}</div>
                  <div className="text-forest/40 text-xs">{c.brand}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: c.statusColor, background: c.statusBg }}>{c.status}</span>
                  <span className="text-forest font-bold text-sm">{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="chip mb-5 mx-auto">
            <span className="mr-2">🖥️</span>
            SEE IT IN ACTION
          </div>
          <h2
            className="font-display text-forest mb-4"
            style={{
              fontFamily: 'Fraunces, serif',
              fontVariationSettings: '"opsz" 144',
              letterSpacing: '-0.02em',
              fontSize: 'clamp(32px, 5vw, 52px)',
              lineHeight: 1.05
            }}>
            Built for how creators<br />
            <span className="italic">actually work.</span>
          </h2>
          <p className="text-forest/50 text-lg max-w-xl mx-auto">
            Every screen designed to save you time and get paid faster.
          </p>
        </div>

        <div className="space-y-20">
          {screens.map((screen, i) => (
            <div key={i} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <span className="inline-block text-xs font-bold tracking-widest px-3 py-1.5 rounded-full mb-4" style={{ color: screen.badgeColor, background: `${screen.badgeColor}15` }}>
                  {screen.badge}
                </span>
                <h3
                  className="font-display text-forest text-3xl mb-4"
                  style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {screen.title}
                </h3>
                <p className="text-forest/60 text-lg leading-relaxed mb-6">
                  {screen.description}
                </p>
                <button className="btn-teal text-sm">
                  Try it free →
                </button>
              </div>

              {/* Mock screen */}
              <div className={`rounded-2xl overflow-hidden border border-forest/10 shadow-xl ${i % 2 === 1 ? 'lg:col-start-1' : ''}`} style={{ background: '#f0fdf4' }}>
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-forest/8" style={{ background: '#e6f7f0' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-forest/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-forest/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-forest/20" />
                  <span className="ml-2 text-xs text-forest/30 font-mono">collabify.studio</span>
                </div>
                {screen.mockContent}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="chip mb-5 mx-auto">
            <span className="mr-2">⚡</span>
            EVERYTHING, STITCHED TOGETHER
          </div>
          <h2
            className="font-display text-forest mb-4"
            style={{
              fontFamily: 'Fraunces, serif',
              fontVariationSettings: '"opsz" 144',
              letterSpacing: '-0.02em',
              fontSize: 'clamp(32px, 5vw, 52px)',
              lineHeight: 1.05
            }}>
            One dashboard.<br />
            <span className="italic">Zero spreadsheets.</span>
          </h2>
          <p className="text-forest/60 text-lg max-w-xl mx-auto">
            Six tools glued into one workspace so your brain can do the creative work — not the admin work.
          </p>
        </div>

        {/* Bento feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 border border-forest/8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{ boxShadow: '0 2px 12px -4px rgba(2,44,34,0.08)' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${feature.color}12` }}>
                  {feature.icon}
                </span>
                <span className="text-xs font-bold tracking-widest" style={{ color: feature.color }}>
                  {feature.tag}
                </span>
              </div>
              <h3 className="font-display text-forest text-xl mb-2" style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.01em' }}>
                {feature.title}
              </h3>
              <p className="text-forest/55 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="chip mb-5 mx-auto">
            <span className="mr-2">?</span>
            QUESTIONS
          </div>
          <h2
            className="font-display text-forest mb-4"
            style={{
              fontFamily: 'Fraunces, serif',
              fontVariationSettings: '"opsz" 144',
              letterSpacing: '-0.02em',
              fontSize: 'clamp(28px, 4vw, 44px)',
              lineHeight: 1.1
            }}>
            Frequently asked,<br />
            <span className="italic">honestly answered.</span>
          </h2>
          <p className="text-forest/50 text-sm">
            Didn't find it?{' '}
            <a href="mailto:hi@collabify.studio" className="text-teal underline underline-offset-2 hover:text-teal-dark">Email us</a>.
          </p>
        </div>

        <div className="space-y-0">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-forest/10">
              <button
                className="w-full flex items-center justify-between py-5 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="font-semibold text-forest text-base pr-4 group-hover:text-teal transition-colors duration-200">
                  {faq.question}
                </span>
                <span
                  className="text-teal text-xl font-light flex-shrink-0 transition-transform duration-200"
                  style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="pb-5 text-forest/60 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-forest">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="font-display text-white mb-4"
          style={{
            fontFamily: 'Fraunces, serif',
            fontVariationSettings: '"opsz" 144',
            letterSpacing: '-0.02em',
            fontSize: 'clamp(36px, 6vw, 64px)',
            lineHeight: 1.0
          }}>
          Ready to retire<br />
          <span className="italic">the spreadsheet?</span>
        </h2>
        <p className="text-white/50 text-lg mb-10">
          14 days free. No credit card. Cancel in one click.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-teal text-base w-full sm:w-auto justify-center">
            Start free trial
          </button>
          <Link
            href="/pricing"
            className="text-white/60 hover:text-white text-sm font-semibold transition-colors duration-200 underline underline-offset-4">
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <ProductScreenshots />
      <FeaturesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}