# Design System — Collabify

## Brand Identity

**Collabify** is calm, professional, and built for creators. The aesthetic is:
- **Forest green** as the dominant brand color — serious, trustworthy
- **Teal** as the action/CTA accent — energetic but not garish
- **Fraunces** (variable serif) for all display/heading text — distinctive, editorial
- **Inter** for body text — legible, neutral, modern

---

## Color Tokens

```css
/* Brand */
--forest:      #022c22;   /* Primary text, nav, footer background */
--forest-mid:  #064e3b;   /* Hover states */
--teal:        #0d9488;   /* CTA buttons, links, accents */
--teal-dark:   #0f766e;   /* Teal hover */

/* Backgrounds */
--mint:        #f0fdf4;   /* Page backgrounds */
--mint-dark:   #dcfce7;   /* Hover tints */

/* Semantic */
--paid:        #059669;   /* Success / paid status */
--pending:     #d97706;   /* Warning / pending */
--overdue:     #dc2626;   /* Error / overdue */
--negotiating: #0d9488;   /* Teal stages */
--contract:    #7c3aed;   /* Violet stages */
```

Tailwind config: `tailwind.config.js`

---

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display H1 | Fraunces | 700–900 | clamp(48–88px) |
| Display H2 | Fraunces | 700 | clamp(32–52px) |
| Display H3 | Fraunces | 600 | 24–32px |
| Body | Inter | 400 | 14–18px |
| Label | Inter | 600–700 | 10–12px, uppercase, tracked |
| Mono | system-ui mono | 400 | 12px |

**Usage pattern:**
```tsx
<h1 style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em' }}>
  Heading
</h1>
```

---

## Spacing

Follows Tailwind's 4px base unit. Key values:
- Section padding: `py-16` to `py-24` (64–96px)
- Card padding: `p-5` to `p-8` (20–32px)
- Gap between cards: `gap-4` to `gap-6` (16–24px)
- Border radius: `rounded-xl` (12px), `rounded-2xl` (16px)

---

## Components

### Buttons

```tsx
// Primary CTA
<button className="btn-teal">Start trial</button>

// Secondary / outline
<button className="btn-outline-forest">See pricing</button>

// Reusable Button component
<Button variant="teal" | "outline-forest" | "pink" | "outline">
  Label
</Button>
```

### Chips / badges

```tsx
<div className="chip">
  <span className="text-teal font-bold">New:</span> Feature name
</div>
```

### Cards

```tsx
<Card className="p-6">
  Content
</Card>
```

### Status badges

```tsx
// Inline with color + background
<span
  className="text-xs font-bold px-2.5 py-1 rounded-full"
  style={{ color: '#059669', background: 'rgba(5,150,105,0.1)' }}
>
  PAID
</span>
```

### Nav

```tsx
<Navbar />   // Fixed, pill-shaped, blur backdrop
<Footer />   // Dark forest bg, 4-column grid
```

---

## Layout Patterns

### Page wrapper
```tsx
<div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
  <Navbar />
  <main className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
    {/* content */}
  </main>
  <Footer />
</div>
```

### Section header
```tsx
<div className="text-center mb-14">
  <div className="chip mb-5 mx-auto">TAG</div>
  <h2 className="font-display text-forest mb-4" style={{ fontFamily: 'Fraunces, serif', ... }}>
    Heading<br /><span className="italic">italic part.</span>
  </h2>
  <p className="text-forest/60 text-lg max-w-xl mx-auto">Subheading.</p>
</div>
```

### Stat card (3-column grid)
```tsx
<div className="grid grid-cols-3 gap-4">
  <div className="bg-white rounded-2xl p-5 border border-forest/8">
    <div className="text-forest/40 text-xs font-bold tracking-wider mb-1">LABEL</div>
    <div className="text-forest font-bold text-2xl">$9,450</div>
    <div className="text-xs font-semibold mt-1" style={{ color: '#0d9488' }}>+12%</div>
  </div>
</div>
```

---

## Icons

Uses `@heroicons/react` via the `AppIcon` component:

```tsx
import Icon from '@/components/ui/AppIcon';
<Icon name="ArrowLeftIcon" size={16} />
<Icon name="HomeIcon" size={20} variant="solid" />
```

---

## CSS Utility Classes (custom)

Defined in `src/styles/tailwind.css`:

| Class | Description |
|---|---|
| `.btn-teal` | Primary teal CTA button |
| `.btn-outline-forest` | Outline button on light bg |
| `.btn-pink` | Pink CTA (legacy) |
| `.chip` | Pill-shaped badge/label |
| `.pill-nav` | Frosted glass navbar pill |
| `.font-display` | Fraunces variable font |
| `.font-caveat` | Caveat handwritten font |
| `.marquee` / `.marquee-inner` | Horizontal scroll ticker |
| `.subtle-shadow` | Large soft shadow |
| `.scribble-note` | Pink handwritten annotation |
