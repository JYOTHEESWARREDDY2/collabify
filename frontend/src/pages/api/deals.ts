import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getAuthHeader(req: NextApiRequest) {
  return req.headers.authorization ? { Authorization: req.headers.authorization as string } : {};
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const base = `${BACKEND_URL}/api/deals`;
  const url = id ? `${base}/${id}` : base;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(req),
      },
      body: ['POST', 'PUT', 'PATCH'].includes(req.method!) ? JSON.stringify(req.body) : undefined,
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({ error: 'Failed to connect to backend' });
  }
}
