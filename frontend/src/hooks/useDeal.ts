import { useState, useCallback } from 'react';
import type { Stage } from '@/components/KanbanBoard';

export interface Deal {
  id: string;
  brand: string;
  deliverable: string;
  value: string;
  stage: Stage;
  dueDate?: string;
  notes?: string;
  contractUrl?: string;
  createdAt?: string;
}

interface UseDealOptions {
  token?: string | null;
}

export function useDeal({ token }: UseDealOptions = {}) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchDeals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/deals', { headers: { ...authHeader } });
      if (!res.ok) throw new Error('Failed to load deals');
      const data: Deal[] = await res.json();
      setDeals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const createDeal = useCallback(async (payload: Omit<Deal, 'id'>) => {
    const res = await fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create deal');
    const newDeal: Deal = await res.json();
    setDeals((prev) => [...prev, newDeal]);
    return newDeal;
  }, [token]);

  const updateDeal = useCallback(async (id: string, updates: Partial<Deal>) => {
    const res = await fetch(`/api/deals?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update deal');
    const updated: Deal = await res.json();
    setDeals((prev) => prev.map((d) => (d.id === id ? updated : d)));
    return updated;
  }, [token]);

  const moveDeal = useCallback(async (id: string, newStage: Stage) => {
    // Optimistic update
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, stage: newStage } : d)));
    try {
      await updateDeal(id, { stage: newStage });
    } catch {
      // Revert on failure
      fetchDeals();
    }
  }, [updateDeal, fetchDeals]);

  const deleteDeal = useCallback(async (id: string) => {
    const res = await fetch(`/api/deals?id=${id}`, {
      method: 'DELETE',
      headers: { ...authHeader },
    });
    if (!res.ok) throw new Error('Failed to delete deal');
    setDeals((prev) => prev.filter((d) => d.id !== id));
  }, [token]);

  const totalPipelineValue = deals.reduce((sum, d) => {
    return sum + parseFloat(d.value.replace(/[$,]/g, '') || '0');
  }, 0);

  const dealsByStage = deals.reduce(
    (acc, deal) => {
      acc[deal.stage] = [...(acc[deal.stage] || []), deal];
      return acc;
    },
    {} as Record<Stage, Deal[]>
  );

  return {
    deals,
    isLoading,
    error,
    totalPipelineValue,
    dealsByStage,
    fetchDeals,
    createDeal,
    updateDeal,
    moveDeal,
    deleteDeal,
  };
}
