import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'starter' | 'pro' | 'agency';
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Restore session from localStorage
  useEffect(() => {
    const token = localStorage.getItem('collabify_token');
    const userRaw = localStorage.getItem('collabify_user');
    if (token && userRaw) {
      try {
        setState({ user: JSON.parse(userRaw), token, isLoading: false, isAuthenticated: true });
      } catch {
        setState((p) => ({ ...p, isLoading: false }));
      }
    } else {
      setState((p) => ({ ...p, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Login failed');
    const { access_token, user } = await res.json();
    localStorage.setItem('collabify_token', access_token);
    localStorage.setItem('collabify_user', JSON.stringify(user));
    setState({ user, token: access_token, isLoading: false, isAuthenticated: true });
    router.push('/dashboard');
  }, [router]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const res = await fetch('/api/auth?action=signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error((await res.json()).detail || 'Signup failed');
    const { access_token, user } = await res.json();
    localStorage.setItem('collabify_token', access_token);
    localStorage.setItem('collabify_user', JSON.stringify(user));
    setState({ user, token: access_token, isLoading: false, isAuthenticated: true });
    router.push('/auth/onboarding');
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem('collabify_token');
    localStorage.removeItem('collabify_user');
    setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
    router.push('/');
  }, [router]);

  return { ...state, login, signup, logout };
}
