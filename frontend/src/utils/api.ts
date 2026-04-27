const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('collabify_token');
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token, headers = {} } = options;
  const authToken = token ?? getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail || `Request failed: ${res.status}`);
  }

  return res.json();
}

// Convenience helpers
export const api = {
  get: <T>(endpoint: string, opts?: RequestOptions) =>
    request<T>(endpoint, { ...opts, method: 'GET' }),

  post: <T>(endpoint: string, body: unknown, opts?: RequestOptions) =>
    request<T>(endpoint, { ...opts, method: 'POST', body }),

  put: <T>(endpoint: string, body: unknown, opts?: RequestOptions) =>
    request<T>(endpoint, { ...opts, method: 'PUT', body }),

  patch: <T>(endpoint: string, body: unknown, opts?: RequestOptions) =>
    request<T>(endpoint, { ...opts, method: 'PATCH', body }),

  delete: <T>(endpoint: string, opts?: RequestOptions) =>
    request<T>(endpoint, { ...opts, method: 'DELETE' }),
};

// Domain-specific API helpers
export const authApi = {
  signup: (name: string, email: string, password: string) =>
    api.post<{ access_token: string; user: unknown }>('/api/auth/signup', { name, email, password }),

  login: (email: string, password: string) =>
    api.post<{ access_token: string; user: unknown }>('/api/auth/login', { email, password }),

  me: () => api.get('/api/users/me'),
};

export const dealsApi = {
  list: () => api.get('/api/deals'),
  get: (id: string) => api.get(`/api/deals/${id}`),
  create: (data: unknown) => api.post('/api/deals', data),
  update: (id: string, data: unknown) => api.put(`/api/deals/${id}`, data),
  delete: (id: string) => api.delete(`/api/deals/${id}`),
};

export const invoicesApi = {
  list: () => api.get('/api/invoices'),
  get: (id: string) => api.get(`/api/invoices/${id}`),
  create: (data: unknown) => api.post('/api/invoices', data),
  update: (id: string, data: unknown) => api.put(`/api/invoices/${id}`, data),
  delete: (id: string) => api.delete(`/api/invoices/${id}`),
};

export const brandsApi = {
  list: () => api.get('/api/brands'),
  get: (id: string) => api.get(`/api/brands/${id}`),
  create: (data: unknown) => api.post('/api/brands', data),
  update: (id: string, data: unknown) => api.put(`/api/brands/${id}`, data),
  delete: (id: string) => api.delete(`/api/brands/${id}`),
};

export const mediaKitApi = {
  get: () => api.get('/api/media-kit'),
  save: (data: unknown) => api.post('/api/media-kit', data),
  getShareUrl: (handle: string) => `${BASE_URL}/kit/${handle}`,
};
