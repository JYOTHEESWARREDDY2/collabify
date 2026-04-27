'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to /api/auth/signup
    setTimeout(() => setLoading(false), 1200);
  };

  const inputClass =
    'w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all';

  return (
    <>
      <Head><title>Sign Up — Collabify</title></Head>
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-forest text-xl">
              <span className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-white">✦</span>
              <span style={{ fontFamily: 'Fraunces, serif' }}>Collabify</span>
            </Link>
            <h1 className="text-2xl font-bold text-forest mt-4" style={{ fontFamily: 'Fraunces, serif' }}>
              Start your free trial
            </h1>
            <p className="text-forest/50 text-sm mt-1">14 days free. No credit card required.</p>
          </div>

          <div className="bg-white rounded-2xl border border-forest/8 shadow-card p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">YOUR NAME</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Sarah Johnson" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">EMAIL</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">PASSWORD</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min. 8 characters" className={inputClass} required minLength={8} />
              </div>
              <button type="submit" disabled={loading} className="btn-teal w-full justify-center mt-2">
                {loading ? 'Creating account...' : 'Create free account →'}
              </button>
            </form>
            <p className="text-center text-forest/40 text-xs mt-6">
              By signing up you agree to our{' '}
              <a href="#" className="underline hover:text-forest">Terms</a> and{' '}
              <a href="#" className="underline hover:text-forest">Privacy Policy</a>.
            </p>
          </div>

          <p className="text-center text-forest/50 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-teal font-semibold hover:text-teal-dark">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
