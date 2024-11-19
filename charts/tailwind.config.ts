import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        profit: "var(--profit)",
        loss: "var(--loss)",
        chart: {
          line: "var(--chart-line)",
          grid: "var(--chart-grid)",
          candleUp: "var(--candle-up)",
          candleDown: "var(--candle-down)",
        },
      },
      height: {
        'chart': '400px',
        'indicator': '200px',
      }
    },
  },
  plugins: [],
} satisfies Config;
