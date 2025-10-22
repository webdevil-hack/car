/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b'
        },
        neon: {
          blue: '#00d9ff',
          purple: '#bd00ff',
          pink: '#ff0084',
          green: '#00ff88',
          yellow: '#ffdd00'
        },
        accent: {
          primary: '#00d9ff',
          secondary: '#bd00ff',
          success: '#00ff88',
          warning: '#ffdd00',
          danger: '#ff0084'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'gradient': 'gradient 15s ease infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 217, 255, 0.5), 0 0 20px rgba(0, 217, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.8), 0 0 40px rgba(0, 217, 255, 0.5)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-dark': 'radial-gradient(circle at center, rgba(0, 217, 255, 0.1) 0%, transparent 70%)',
        'gradient-mesh': `radial-gradient(at 40% 20%, rgba(189, 0, 255, 0.1) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(0, 217, 255, 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(255, 0, 132, 0.1) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(0, 255, 136, 0.1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(255, 221, 0, 0.1) 0px, transparent 50%)`
      }
    },
  },
  plugins: [],
}