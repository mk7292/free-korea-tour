import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C8102E",
          blue: "#1B3FAB",
          text: "#0D0D0D",
        },
      },
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
