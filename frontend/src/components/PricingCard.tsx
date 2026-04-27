import React from 'react';
import Button from './Button';

interface PricingCardProps {
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  badge?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  annual?: boolean;
  onCta?: () => void;
}

export default function PricingCard({
  name,
  price,
  description,
  badge,
  features,
  cta,
  highlighted = false,
  annual = true,
  onCta,
}: PricingCardProps) {
  const displayPrice = annual ? price.annual : price.monthly;

  return (
    <div className={`rounded-2xl p-8 relative transition-all duration-200 hover:-translate-y-1 ${
      highlighted
        ? 'bg-forest text-white shadow-2xl scale-105'
        : 'bg-white border border-forest/10 shadow-sm hover:shadow-lg'
    }`}>
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-teal text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">{badge}</span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={`font-display text-2xl mb-1 ${highlighted ? 'text-white' : 'text-forest'}`}
          style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.01em' }}
        >
          {name}
        </h3>
        <p className={`text-sm ${highlighted ? 'text-white/60' : 'text-forest/50'}`}>{description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-5xl font-black ${highlighted ? 'text-white' : 'text-forest'}`}
            style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.03em' }}
          >
            {price.monthly === 0 ? 'Free' : `$${displayPrice}`}
          </span>
          {price.monthly > 0 && (
            <span className={`text-sm ${highlighted ? 'text-white/50' : 'text-forest/40'}`}>/mo</span>
          )}
        </div>
        {price.monthly > 0 && annual && (
          <p className={`text-xs mt-1 ${highlighted ? 'text-white/50' : 'text-forest/40'}`}>
            Billed annually · ${price.annual * 12}/yr
          </p>
        )}
      </div>

      <button
        onClick={onCta}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-sm mb-8 transition-all duration-200 ${
          highlighted
            ? 'bg-teal text-white hover:bg-teal-600 shadow-lg'
            : 'bg-forest text-white hover:bg-forest/90'
        }`}
      >
        {cta}
      </button>

      <ul className="space-y-3">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs ${
              highlighted ? 'bg-white/20 text-white' : 'bg-teal/15 text-teal'
            }`}>✓</span>
            <span className={`text-sm ${highlighted ? 'text-white/80' : 'text-forest/70'}`}>{feat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
