import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#0D0D0D',
        surface: '#1A1A1A',
        teal: {
          DEFAULT: '#5EEAD4',
          dark: '#2ACDAA',
        },
        'border-dark': '#222222',
        'border-light': '#E5E5E5',
        muted: '#888888',
        danger: '#E24B4A',
        ghost: 'rgba(255,255,255,0.38)',
      },
      fontFamily: {
        display: ['var(--font-figtree)', 'sans-serif'],
        body: ['var(--font-plus-jakarta)', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'sans-serif'],
      },
      fontSize: {
        display: ['72px', { lineHeight: '1.05', letterSpacing: '-2px', fontWeight: '800' }],
        h1: ['48px', { lineHeight: '1.1', letterSpacing: '-1.5px', fontWeight: '800' }],
        h2: ['36px', { lineHeight: '1.15', letterSpacing: '-1px', fontWeight: '700' }],
        h3: ['24px', { lineHeight: '1.25', letterSpacing: '-0.5px', fontWeight: '600' }],
        h4: ['20px', { lineHeight: '1.35', letterSpacing: '-0.25px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        body: ['16px', { lineHeight: '1.7' }],
        small: ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        caption: ['11px', { lineHeight: '1.2', letterSpacing: '1.5px', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        glow: '0 0 32px rgba(94, 234, 212, 0.35)',
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 6px rgba(0,0,0,0.07)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
      },
      maxWidth: {
        content: '1280px',
        reading: '720px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
