import React from 'react';
import type { Deal } from './KanbanBoard';

interface DealCardProps {
  deal: Deal;
  stageColor: string;
  stageBg: string;
  onDragStart?: () => void;
  onClick?: () => void;
}

export default function DealCard({ deal, stageColor, stageBg, onDragStart, onClick }: DealCardProps) {
  return (
    <div
      className="bg-white rounded-xl p-3 border border-forest/8 cursor-pointer hover:shadow-md transition-shadow duration-200 select-none"
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
    >
      <span
        className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 block w-fit"
        style={{ color: stageColor, background: stageBg }}
      >
        {deal.stage.toUpperCase()}
      </span>
      <div className="text-forest font-semibold text-sm">{deal.brand}</div>
      <div className="text-forest/40 text-xs mt-0.5">{deal.deliverable}</div>
      <div className="text-forest font-bold text-sm mt-1">{deal.value}</div>
      {deal.dueDate && (
        <div className="text-forest/30 text-xs mt-1">Due: {deal.dueDate}</div>
      )}
    </div>
  );
}
