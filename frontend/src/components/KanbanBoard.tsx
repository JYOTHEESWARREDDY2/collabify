import React, { useState } from 'react';
import DealCard from './DealCard';

export interface Deal {
  id: string;
  brand: string;
  deliverable: string;
  value: string;
  stage: Stage;
  dueDate?: string;
}

export type Stage = 'Prospecting' | 'Negotiating' | 'Contract Sent' | 'Live' | 'Invoiced' | 'Paid';

const STAGES: { name: Stage; color: string; bg: string }[] = [
  { name: 'Prospecting',    color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
  { name: 'Negotiating',    color: '#0d9488', bg: 'rgba(13,148,136,0.08)' },
  { name: 'Contract Sent',  color: '#d97706', bg: 'rgba(217,119,6,0.08)' },
  { name: 'Live',           color: '#0891b2', bg: 'rgba(8,145,178,0.08)' },
  { name: 'Invoiced',       color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
  { name: 'Paid',           color: '#059669', bg: 'rgba(5,150,105,0.08)' },
];

interface KanbanBoardProps {
  deals: Deal[];
  onDealMove?: (dealId: string, newStage: Stage) => void;
  onDealClick?: (deal: Deal) => void;
}

export default function KanbanBoard({ deals, onDealMove, onDealClick }: KanbanBoardProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (dealId: string) => setDraggedId(dealId);

  const handleDrop = (stage: Stage) => {
    if (draggedId && onDealMove) {
      onDealMove(draggedId, stage);
    }
    setDraggedId(null);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {STAGES.map((stage) => {
        const stageDeals = deals.filter((d) => d.stage === stage.name);
        return (
          <div
            key={stage.name}
            className="flex-shrink-0 w-60 bg-white rounded-2xl border border-forest/8 p-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(stage.name)}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold tracking-widest" style={{ color: stage.color }}>
                {stage.name.toUpperCase()}
              </span>
              <span className="text-xs font-bold text-forest/30">{stageDeals.length}</span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 min-h-[120px]">
              {stageDeals.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  stageColor={stage.color}
                  stageBg={stage.bg}
                  onDragStart={() => handleDragStart(deal.id)}
                  onClick={() => onDealClick?.(deal)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
