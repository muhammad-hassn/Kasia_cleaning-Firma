/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#faf8f4',
        beige: '#f0ebe2',
        sand: '#e6dfd2',
        sage: {
          DEFAULT: '#8a9a7b',
          light: '#a3b394',
          dark: '#6d7d5e',
        },
        charcoal: {
          DEFAULT: '#2b2826',
          light: '#3d3a37',
          dark: '#1c1a19',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      maxWidth: {
        editorial: '1400px',
      },
      transitionTimingFunction: {
        elegant: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
