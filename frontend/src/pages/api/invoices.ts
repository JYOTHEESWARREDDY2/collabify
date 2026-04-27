import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getAuthHeader(req: NextApiRequest) {
  return req.headers.authorization ? { Authorization: req.headers.authorization as string } : {};
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const base = `${BACKEND_URL}/api/invoices`;
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

    // Handle PDF download
    if (req.query.pdf === 'true') {
      const buffer = await response.arrayBuffer();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="invoice-${id}.pdf"`);
      return res.send(Buffer.from(buffer));
    }

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({ error: 'Failed to connect to backend' });
  }
}
