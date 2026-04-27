import { useState, useEffect, useCallback, useRef } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseFetchOptions {
  immediate?: boolean;  // fetch on mount (default: true)
  token?: string | null;
}

export function useFetch<T = unknown>(url: string, options: UseFetchOptions = {}) {
  const { immediate = true, token } = options;
  const [state, setState] = useState<FetchState<T>>({ data: null, isLoading: false, error: null });
  const abortRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (body?: unknown, method = 'GET') => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setState((p) => ({ ...p, isLoading: true, error: null }));

    try {
      const res = await fetch(url, {
        method,
        signal: abortRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail || 'Request failed');
      }

      const data: T = await res.json();
      setState({ data, isLoading: false, error: null });
      return data;
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setState((p) => ({ ...p, isLoading: false, error: msg }));
      throw err;
    }
  }, [url, token]);

  useEffect(() => {
    if (immediate) execute();
    return () => abortRef.current?.abort();
  }, [immediate, execute]);

  const refetch = () => execute();
  const post = (body: unknown) => execute(body, 'POST');
  const put = (body: unknown) => execute(body, 'PUT');
  const del = () => execute(undefined, 'DELETE');

  return { ...state, refetch, post, put, del, execute };
}
