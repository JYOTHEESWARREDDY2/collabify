import React, { useState } from 'react';
import Button from './Button';

interface MediaKitData {
  name: string;
  bio: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  niche: string;
  rates: { reel: string; story: string; post: string };
}

interface MediaKitBuilderProps {
  onSave?: (data: MediaKitData) => void;
  onShare?: () => void;
}

export default function MediaKitBuilder({ onSave, onShare }: MediaKitBuilderProps) {
  const [form, setForm] = useState<MediaKitData>({
    name: '',
    bio: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    niche: '',
    rates: { reel: '', story: '', post: '' },
  });

  const inputClass =
    'w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-forest placeholder:text-forest/30 focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      rates: { ...prev.rates, [e.target.name]: e.target.value },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-forest/8 p-6">
        <h3 className="text-forest font-bold text-lg mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
          Profile
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">YOUR NAME</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Sarah Johnson" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">BIO</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Who you are, what you create..." rows={3} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">NICHE</label>
            <input name="niche" value={form.niche} onChange={handleChange} placeholder="e.g. Beauty, Fitness, Tech" className={inputClass} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-forest/8 p-6">
        <h3 className="text-forest font-bold text-lg mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
          Social Handles
        </h3>
        <div className="space-y-4">
          {[
            { name: 'instagram', label: 'INSTAGRAM', placeholder: '@yourhandle' },
            { name: 'tiktok', label: 'TIKTOK', placeholder: '@yourhandle' },
            { name: 'youtube', label: 'YOUTUBE', placeholder: 'Channel URL or handle' },
          ].map((s) => (
            <div key={s.name}>
              <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">{s.label}</label>
              <input name={s.name} value={form[s.name as keyof MediaKitData] as string} onChange={handleChange} placeholder={s.placeholder} className={inputClass} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-forest/8 p-6">
        <h3 className="text-forest font-bold text-lg mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
          Rate Card
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'reel', label: 'IG REEL' },
            { name: 'story', label: 'IG STORY' },
            { name: 'post', label: 'FEED POST' },
          ].map((r) => (
            <div key={r.name}>
              <label className="block text-xs font-semibold text-forest/50 mb-1.5 tracking-wider">{r.label}</label>
              <input name={r.name} value={form.rates[r.name as keyof typeof form.rates]} onChange={handleRateChange} placeholder="$0" className={inputClass} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="teal" onClick={() => onSave?.(form)}>Save Media Kit</Button>
        <Button variant="outline-forest" onClick={onShare}>Share Link</Button>
      </div>
    </div>
  );
}
