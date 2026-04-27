'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
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
          style={{ boxShadow: scrolled ? '0 4px 24px -8px rgba(2,44,34,0.14)' : 'none' }}
        >
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
            <Link href="/auth/login" className="text-sm font-semibold text-forest hover:text-teal transition-colors duration-200 px-3 py-2">
              Log in
            </Link>
            <Link href="/auth/signup" className="btn-teal text-sm !py-2 !px-5">
              Start trial
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-forest"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
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
            <Link href="/auth/signup" className="btn-teal w-full justify-center mt-2">Start 14-day trial</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
