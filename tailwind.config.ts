import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        purpleGradientStart: '#7B38F6',
        pinkGradientEnd: '#D13CE8',

        // Color keys need to be in quotes because of the dash
        'deep-indigo': '#1b1c38',
        'charcoal-gray': '#2b2b2b',
        'purple-black': '#141016',
      },
      backgroundImage: {
        'logo-gradient': 'linear-gradient(90deg, #7B38F6, #D13CE8)',
      },
    },
  },
  plugins: [],
}

export default config
