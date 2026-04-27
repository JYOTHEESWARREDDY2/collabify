'use client';

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head><title>404 — Page Not Found · Collabify</title></Head>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-12">
          <span className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-white text-sm">✦</span>
          <span className="font-bold text-forest text-lg" style={{ fontFamily: 'Fraunces, serif' }}>Collabify</span>
        </Link>

        {/* Big 404 */}
        <div
          className="text-forest/5 font-black select-none mb-2 leading-none"
          style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(120px, 20vw, 220px)' }}
          aria-hidden
        >
          404
        </div>

        <h1
          className="text-forest text-3xl font-bold mb-3 text-center -mt-4"
          style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em' }}
        >
          This page went dark.
        </h1>
        <p className="text-forest/50 text-base mb-10 text-center max-w-sm leading-relaxed">
          The page you're looking for doesn't exist, was moved, or the link might be wrong.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link href="/" className="btn-teal text-sm">← Back to home</Link>
          <Link href="/dashboard" className="btn-outline-forest text-sm">Go to dashboard</Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 flex items-center gap-6 text-sm text-forest/40">
          <Link href="/pricing" className="hover:text-teal transition-colors">Pricing</Link>
          <span>·</span>
          <a href="mailto:hi@collabify.studio" className="hover:text-teal transition-colors">Support</a>
          <span>·</span>
          <Link href="/auth/login" className="hover:text-teal transition-colors">Log in</Link>
        </div>
      </div>
    </>
  );
}
