import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
        lilita: ["var(--font-lilita-one)", "cursive"],
      },
colors: {
  ink: {
    DEFAULT: "#1a1a1a",
    soft: "#2e2e2e",
    muted: "#6b6b6b",
  },
  parchment: {
    DEFAULT: "#f5f2ec",
    soft: "#faf8f4",
    deep: "#ede9e0",
  },
  accent: {
    DEFAULT: "#8b5e3c",
    light: "#b8845a",
    pale: "#f0e8df",
  },

  // ✅ 広告寄せ：緑×黄×生成り
  brand: {
    DEFAULT: "#167A73", // hero背景の基準色（=green）
    green: "#167A73",
    yellow: "#F2D14B",
    paper: "#F6F1E7",   // 生成り（サイトの背景/中間背景にも使える）
  },
},
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "scale-in": "scaleIn 0.4s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
