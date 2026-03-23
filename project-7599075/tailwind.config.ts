import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
        caprasimo: ['Caprasimo', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        ink: '#1a1a1a',
        sage: '#5a6e4e',
        mist: '#f8f7f5',
        stone: '#888888',
        parchment: '#f0ede8',
        brand: {
          green: '#2D5016',
          'green-light': '#4A7C2C',
          brown: '#5C4033',
          'brown-light': '#8B6F47',
          beige: '#D4C5B9',
          'beige-light': '#E8DDD3',
          black: '#1A1A1A',
          grey: '#6B7280',
          'grey-light': '#9CA3AF',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
