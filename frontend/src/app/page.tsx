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
  const [featuresOpen, setFeaturesOpen] = useState(false);

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
            <div className="relative group">
              <button 
                className="hover:text-teal transition-colors duration-200 flex items-center gap-2"
                onClick={() => setFeaturesOpen(!featuresOpen)}>
                Features
                <svg className={`w-4 h-4 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              
              {/* Features Dropdown */}
              <div className="absolute left-0 mt-0 pt-2 hidden group-hover:block z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-forest/10 p-6 w-[640px]">
                  <div className="grid grid-cols-4 gap-4 mb-5 pb-5 border-b border-forest/10">
                    {[
                      { icon: '📊', title: 'Dashboard', description: 'Everything at a glance' },
                      { icon: '📈', title: 'Pipelines', description: 'Drag deals across stages' },
                      { icon: '📬', title: 'Inbox', description: 'Brand messages, organized' },
                      { icon: '👥', title: 'Contacts', description: 'Every brand, remembered' },
                      { icon: '🏷️', title: 'Rate Cards', description: 'Set your pricing tiers' },
                      { icon: '💰', title: 'Earnings', description: 'Track every dollar earned' },
                      { icon: '📅', title: 'Calendar', description: 'Deadlines, never missed' },
                      { icon: '📋', title: 'Contracts', description: 'Sign deals in seconds' }
                    ].map((feature, i) => (
                      <div key={i} className="p-3 rounded-lg hover:bg-teal/5 transition-all duration-200 cursor-pointer hover:shadow-md text-center">
                        <div className="text-2xl mb-2">{feature.icon}</div>
                        <div className="font-semibold text-forest text-xs">{feature.title}</div>
                        <div className="text-forest/50 text-xs mt-1 line-clamp-2">{feature.description}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Section */}
                  <div className="flex items-center justify-between">
                    <div className="text-forest/50 text-xs">
                      <span className="font-semibold">14-day free trial</span>
                      <span className="mx-2">·</span>
                      <span>No credit card</span>
                    </div>
                    <button className="text-teal font-semibold text-sm hover:text-teal-dark transition-colors duration-200 flex items-center gap-1">
                      Start free trial
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
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
            <button
              className="text-sm font-medium text-forest py-2 border-b border-border text-left flex items-center justify-between w-full"
              onClick={() => setFeaturesOpen(!featuresOpen)}>
              Features
              <svg className={`w-4 h-4 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            
            {/* Mobile Features Dropdown */}
            {featuresOpen && (
              <div>
                <div className="grid grid-cols-2 gap-3 p-4 bg-forest/2 rounded-xl border border-forest/5 mb-3">
                  {[
                    { icon: '📊', title: 'Dashboard', description: 'Everything at a glance' },
                    { icon: '📈', title: 'Pipelines', description: 'Drag deals across stages' },
                    { icon: '📬', title: 'Inbox', description: 'Brand messages, organized' },
                    { icon: '👥', title: 'Contacts', description: 'Every brand, remembered' },
                    { icon: '🏷️', title: 'Rate Cards', description: 'Set your pricing tiers' },
                    { icon: '💰', title: 'Earnings', description: 'Track every dollar earned' },
                    { icon: '📅', title: 'Calendar', description: 'Deadlines, never missed' },
                    { icon: '📋', title: 'Contracts', description: 'Sign deals in seconds' }
                  ].map((feature, i) => (
                    <div key={i} className="p-3 rounded-lg bg-white border border-forest/8 hover:shadow-md transition-shadow">
                      <div className="text-xl mb-1.5">{feature.icon}</div>
                      <div className="font-semibold text-forest text-xs">{feature.title}</div>
                      <div className="text-forest/50 text-xs mt-0.5">{feature.description}</div>
                    </div>
                  ))}
                </div>
                
                {/* Mobile CTA Section */}
                <div className="border-t border-border pt-3 flex flex-col gap-2">
                  <div className="text-forest/50 text-xs">
                    <span className="font-semibold">14-day free trial</span>
                    <span className="mx-1">·</span>
                    <span>No credit card</span>
                  </div>
                  <button className="text-teal font-semibold text-sm hover:text-teal-dark transition-colors duration-200 flex items-center gap-1">
                    Start free trial
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}
            
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
      <FeaturesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
