/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          black: '#000000',
          dark: '#121212',
          darker: '#181818',
          light: '#282828',
          green: '#1DB954',
          white: '#FFFFFF',
          gray: '#B3B3B3',
        },
        quantum: {
          primary: '#00ffff',
          secondary: '#00d4ff',
          accent: '#9333ea',
        },
        classical: {
          primary: '#ff00ff',
          secondary: '#ff0080',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-spotify': 'linear-gradient(180deg, #1e1e2e 0%, #0a0a14 100%)',
        'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-quantum': 'linear-gradient(135deg, #00ffff 0%, #9333ea 100%)',
        'gradient-classical': 'linear-gradient(135deg, #ff00ff 0%, #ff0080 100%)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
