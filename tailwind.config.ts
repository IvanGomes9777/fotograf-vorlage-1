import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF8",
        ink: "#15161A",
        muted: "#5a5d66",
        line: "rgba(0,0,0,0.08)",
        accent: { DEFAULT: "#2E5BFF", foreground: "#ffffff" },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      keyframes: {
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "fade-down": "fade-down 0.6s ease both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
