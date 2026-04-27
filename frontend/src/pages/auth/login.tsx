'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: connect to /api/auth/login
    setTimeout(() => setLoading(false), 1000);
  };

  const inputClass =
    'w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all';

  return (
    <>
      <Head><title>Log In — Collabify</title></Head>
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-forest text-xl">
              <span className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-white">✦</span>
              <span style={{ fontFamily: 'Fraunces, serif' }}>Collabify</span>
            </Link>
            <h1 className="text-2xl font-bold text-forest mt-4" style={{ fontFamily: 'Fraunces, serif' }}>Welcome back</h1>
            <p className="text-forest/50 text-sm mt-1">Log in to your Collabify workspace.</p>
          </div>

          <div className="bg-white rounded-2xl border border-forest/8 shadow-card p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">EMAIL</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">PASSWORD</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Your password" className={inputClass} required />
              </div>
              <div className="flex items-center justify-end">
                <a href="#" className="text-xs text-teal hover:text-teal-dark font-semibold">Forgot password?</a>
              </div>
              <button type="submit" disabled={loading} className="btn-teal w-full justify-center">
                {loading ? 'Logging in...' : 'Log in →'}
              </button>
            </form>
          </div>

          <p className="text-center text-forest/50 text-sm mt-6">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-teal font-semibold hover:text-teal-dark">Start free trial</Link>
          </p>
        </div>
      </div>
    </>
  );
}
