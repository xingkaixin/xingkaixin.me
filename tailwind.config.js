import { config } from './lib/server/config'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ['./pages/**/*.js', './components/**/*.js', './layouts/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: config.lightBackground || '#faf7f2'
        },
        night: {
          DEFAULT: config.darkBackground || '#0a0a0b'
        },
        // 东方墨韵色板
        paper: {
          white: '#faf7f2',
          cream: '#f0ebe0',
          warm: '#e8e0d0',
        },
        ink: {
          black: '#1a1a1c',
          dark: '#2d2d2f',
          medium: '#4a4a4c',
          light: '#6b6b6d',
          faint: '#9a9a9c',
        },
        vermillion: {
          DEFAULT: '#c41e3a',
          light: '#d64a5e',
          dark: '#9a1830',
        },
        gold: {
          accent: '#b8860b',
        }
      },
      fontFamily: {
        sans: ['"LXGW WenKai"', 'MiSans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'ui-serif', 'serif'],
        calligraphy: ['"LXGW WenKai"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'ink-spread': 'ink-spread 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'brush-stroke': 'brush-stroke 2s ease-out forwards',
      },
      keyframes: {
        'ink-spread': {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'brush-stroke': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
