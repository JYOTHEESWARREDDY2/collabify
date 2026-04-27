import React from 'react';
import Link from 'next/link';

export default function Footer() {
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
                { label: 'Contact', href: 'mailto:hi@collabify.studio' },
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
