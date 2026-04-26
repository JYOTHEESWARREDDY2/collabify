module.exports = {
  /** @type {import('tailwindcss').Config} */
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5f2eb',
        'cream-dark': '#efe9e1',
        'deep-purple': '#1b0b2c',
        'mid-purple': '#2a0e33',
        pink: '#ec4899',
        'pink-dark': '#d63384',
        'yellow-accent': '#ffdf80',
        'yellow-bright': '#ffd93d',
        'green-accent': '#10b981',
        border: '#e7e0da',
        muted: '#665c70',
        // New green theme
        forest: '#022c22',
        'forest-mid': '#064e3b',
        teal: '#0d9488',
        'teal-dark': '#0f766e',
        'teal-600': '#0f766e',
        'mint': '#f0fdf4',
        'mint-dark': '#dcfce7',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
        script: ['Dancing Script', 'cursive'],
      },
      borderRadius: {
        pill: '999px',
        card: '18px',
        btn: '10px',
      },
      keyframes: {
        scrollx: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        scrollx: 'scrollx 35s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      boxShadow: {
        subtle: '0 20px 50px -15px rgba(27,11,44,0.15)',
        card: '0 4px 24px -8px rgba(27,11,44,0.12)',
        'card-hover': '0 30px 60px -20px rgba(27,11,44,0.18)',
        pink: '0 8px 20px -8px rgba(236,72,153,0.45)',
        'pink-hover': '0 12px 24px -8px rgba(236,72,153,0.55)',
      },
    },
  },
  plugins: [],
};
