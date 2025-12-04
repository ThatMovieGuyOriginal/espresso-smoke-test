import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#111111",
        "dark-surface": "#1A1A1A",
        "dark-border": "#333333",
        "accent-orange": "#FF9900",
        "accent-orange-hover": "#E68A00",
        "accent-green": "#2ECC71",
        "text-primary": "#F3F4F6",
        "text-secondary": "#9CA3AF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Roboto", "sans-serif"],
      },
      letterSpacing: {
        "tight-heading": "-0.02em",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}

export default config
