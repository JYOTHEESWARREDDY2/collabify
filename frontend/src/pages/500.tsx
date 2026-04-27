import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Custom500() {
  return (
    <>
      <Head><title>500 — Server Error · Collabify</title></Head>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}
      >
        <Link href="/" className="flex items-center gap-2 mb-12">
          <span className="w-8 h-8 rounded-full bg-forest flex items-center justify-center text-white text-sm">✦</span>
          <span className="font-bold text-forest text-lg" style={{ fontFamily: 'Fraunces, serif' }}>Collabify</span>
        </Link>

        <div
          className="text-forest/5 font-black select-none mb-2 leading-none"
          style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(120px, 20vw, 220px)' }}
          aria-hidden
        >
          500
        </div>

        <h1
          className="text-forest text-3xl font-bold mb-3 text-center -mt-4"
          style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em' }}
        >
          Something broke on our end.
        </h1>
        <p className="text-forest/50 text-base mb-10 text-center max-w-sm leading-relaxed">
          Our team has been notified. Try refreshing or come back in a moment.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="btn-teal text-sm"
          >
            ↺ Refresh page
          </button>
          <Link href="/" className="btn-outline-forest text-sm">Back to home</Link>
        </div>

        <div className="mt-12 flex items-center gap-6 text-sm text-forest/40">
          <a href="mailto:hi@collabify.studio" className="hover:text-teal transition-colors">Contact support</a>
        </div>
      </div>
    </>
  );
}
