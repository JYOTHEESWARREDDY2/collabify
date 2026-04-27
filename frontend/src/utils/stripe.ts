const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

/**
 * Redirect to Stripe Checkout for a given plan.
 * The backend creates the session; we redirect to it.
 */
export async function redirectToCheckout(planId: 'pro' | 'agency', annual: boolean): Promise<void> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('collabify_token') : null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/stripe/create-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ plan_id: planId, annual }),
  });

  if (!res.ok) throw new Error('Failed to create checkout session');

  const { checkout_url } = await res.json();
  window.location.href = checkout_url;
}

/**
 * Redirect to Stripe Customer Portal to manage subscription.
 */
export async function redirectToPortal(): Promise<void> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('collabify_token') : null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/stripe/portal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) throw new Error('Failed to open billing portal');

  const { portal_url } = await res.json();
  window.location.href = portal_url;
}

/** Plan pricing config (mirrors backend) */
export const PLAN_PRICES = {
  starter: { monthly: 0, annual: 0 },
  pro:     { monthly: 29, annual: 19 },
  agency:  { monthly: 79, annual: 59 },
} as const;

export type PlanId = keyof typeof PLAN_PRICES;

export function getAnnualSavings(plan: PlanId): number {
  const { monthly, annual } = PLAN_PRICES[plan];
  return (monthly - annual) * 12;
}

export { STRIPE_PUBLISHABLE_KEY };
