import type {Config} from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
        padding: '1rem',
        screens: {
          sm: '640px', // Para dispositivos pequeños (sm)
          md: '768px', // Para dispositivos medianos (md)
          lg: '1024px', // Para dispositivos grandes (lg)
          '2xl': '1400px', // Para dispositivos extra grandes (2xl)
        },
    },

    backgroundImage: {
      hero: 'linear-gradient(to right bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%) ,url(/bannerLanding.jpg)',
      bannerNews:
        'linear-gradient(to top, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.1) 70%),url(/bannernews.jpg)',
      bannerStore:
        'linear-gradient(to top, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.5) 70%),url(/fashionBanner.jpg)',
    },

    extend: {
      scale: {
        '108': '1.08',
        '175': '1.75',
      },
      transitionDuration: {
        '1500': '1500ms',
      },
      colors: {
        fondo: '#0f0f0f',
        negro: '#000000',
        rosaclarito: '#fcf0f6',
        marronnegro: '#261f1f',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
