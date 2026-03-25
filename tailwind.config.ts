import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#8B1A1A',
          light: '#F0EAE8',
          dark: '#5C1111',
          50: '#FDF5F5',
          100: '#F5D9D9',
          200: '#E8A8A8',
          600: '#8B1A1A',
          800: '#5C1111',
        },
        navy: {
          DEFAULT: '#1A1F2E',
          light: '#EEF0F5',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#FDF3D0',
          50: '#FEFBEF',
          100: '#FDF3D0',
          600: '#C9A227',
          800: '#7A5800',
        },
        available: {
          bg: '#E8F5E9',
          text: '#2E7D32',
          border: '#81C784',
        },
        urgent: {
          bg: '#FFF3E0',
          text: '#E65100',
        },
        hiring: {
          bg: '#EDE7F6',
          text: '#4527A0',
        },
        neutral: {
          50: '#FAFAF8',
          100: '#F5F4F0',
          200: '#E8E6E0',
          300: '#D4D2CC',
          400: '#B0AEA8',
          500: '#888780',
          600: '#666560',
          700: '#444441',
          800: '#2C2C2A',
          900: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: ['11px', { lineHeight: '1.5' }],
        sm: ['13px', { lineHeight: '1.5' }],
        base: ['14px', { lineHeight: '1.6' }],
        md: ['16px', { lineHeight: '1.6' }],
        lg: ['20px', { lineHeight: '1.4' }],
        xl: ['24px', { lineHeight: '1.3' }],
        '2xl': ['32px', { lineHeight: '1.2' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08)',
        panel: '0 4px 16px rgba(0,0,0,0.12)',
        float: '0 8px 24px rgba(0,0,0,0.16)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

export default config
