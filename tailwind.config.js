/**
 * XiomiNails — Design System (Luxury)
 * Tailwind v4 usa @theme en src/index.css como fuente de verdad.
 * Este archivo documenta tokens y sirve de referencia de marca.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          soft: '#141414',
          muted: '#1f1f1f',
        },
        ivory: {
          DEFAULT: '#f8f8f2',
          muted: 'rgba(248, 248, 242, 0.72)',
          faint: 'rgba(248, 248, 242, 0.48)',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#e8d48b',
          dark: '#b8942a',
          soft: 'rgba(212, 175, 55, 0.14)',
        },
        primary: {
          DEFAULT: '#d4af37',
          light: '#f5f0e3',
          dark: '#b8942a',
        },
        accent: {
          DEFAULT: '#9b7fbf',
          light: '#ece5f3',
          dark: '#7a5fa0',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f4f4f0',
          dark: '#0a0a0a',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.22em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.35)',
        gold: '0 10px 40px rgba(212, 175, 55, 0.28)',
      },
    },
  },
  plugins: [],
};
