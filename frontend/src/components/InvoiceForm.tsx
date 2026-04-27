import React, { useState } from 'react';
import Button from './Button';

interface InvoiceFormData {
  brandName: string;
  projectName: string;
  amount: string;
  dueDate: string;
  notes: string;
}

interface InvoiceFormProps {
  onSubmit?: (data: InvoiceFormData) => void;
  onCancel?: () => void;
}

export default function InvoiceForm({ onSubmit, onCancel }: InvoiceFormProps) {
  const [form, setForm] = useState<InvoiceFormData>({
    brandName: '',
    projectName: '',
    amount: '',
    dueDate: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  const inputClass =
    'w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">BRAND NAME</label>
          <input
            name="brandName"
            value={form.brandName}
            onChange={handleChange}
            placeholder="e.g. Glossier"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">PROJECT NAME</label>
          <input
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            placeholder="e.g. Summer Campaign"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">AMOUNT ($)</label>
          <input
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="e.g. 1200"
            type="number"
            min="0"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">DUE DATE</label>
          <input
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            type="date"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">NOTES</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Deliverables, payment terms, etc."
          rows={3}
          className={inputClass}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" variant="teal">Generate Invoice</Button>
        {onCancel && (
          <Button type="button" variant="outline-forest" onClick={onCancel}>Cancel</Button>
        )}
      </div>
    </form>
  );
}
