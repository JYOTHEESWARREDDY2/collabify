'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest via-forest-mid to-forest flex items-center justify-center px-4">
      {/* Floating shapes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-teal/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Auth Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white text-sm">✦</span>
              <span className="font-bold text-white text-lg" style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em' }}>
                Collabify
              </span>
            </Link>

            <h1 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em' }}>
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-white/60 text-sm">
              {isLogin ? 'Sign in to your creator dashboard' : 'Join thousands of creators managing deals'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 focus:bg-white/15 transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isLogin ? 'Your password' : 'Create password'}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 focus:bg-white/15 transition-all duration-200"
                required
              />
            </div>

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-teal text-xs font-semibold hover:text-teal-dark transition-colors duration-200">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal text-white font-semibold py-3 rounded-lg hover:bg-teal-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6">
              {loading ? 'Loading...' : isLogin ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white/5 text-white/40">Or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/80 text-sm font-semibold hover:bg-white/15 hover:border-white/30 transition-all duration-200">
              Google
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white/80 text-sm font-semibold hover:bg-white/15 hover:border-white/30 transition-all duration-200">
              GitHub
            </button>
          </div>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center text-white/60 text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-teal font-semibold hover:text-teal-dark transition-colors duration-200">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>

          {/* Terms */}
          <p className="text-white/40 text-xs text-center mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-teal hover:text-teal-dark transition-colors">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-teal hover:text-teal-dark transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Demo Credentials */}
        {isLogin && (
          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs text-center">
            <p>Demo credentials:</p>
            <p className="mt-1 text-white/80">
              <span className="font-mono">demo@collabify.studio</span> / <span className="font-mono">demo123</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
