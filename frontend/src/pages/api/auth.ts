import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { action } = req.query;

  if (req.method === 'POST' && action === 'signup') {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch {
      return res.status(500).json({ error: 'Failed to connect to backend' });
    }
  }

  if (req.method === 'POST' && action === 'login') {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch {
      return res.status(500).json({ error: 'Failed to connect to backend' });
    }
  }

  if (req.method === 'POST' && action === 'logout') {
    return res.status(200).json({ message: 'Logged out' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
