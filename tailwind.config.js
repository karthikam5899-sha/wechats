/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    colors: { ink: '#262626', muted: '#8e8e8e', brand: '#c026d3', soft: '#fae8ff', line: '#dbdbdb' },
    boxShadow: { soft: '0 2px 8px rgba(0, 0, 0, .04)' }
  }},
  plugins: []
}
