import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        phone: "360px",
        xs: "420px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      colors: {
        // Backgrounds
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",

        // Neutral / Gray
        "gray-lighter": "var(--color-gray-lighter)",
        "gray-lightest": "var(--color-gray-lightest)",

        // Primary
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",

        // Secondary
        secondary: "var(--color-secondary)",
        "secondary-light": "var(--color-secondary-light)",
        "secondary-very-light": "var(--color-secondary-very-light)",

        // Text
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",

        // Border
        border: "var(--color-border)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
