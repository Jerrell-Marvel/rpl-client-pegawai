import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryCol: "#1AB1E5",
        secondaryCol: "#046E89",
        tertiaryCol: "#DCDCDC",
        "status-pemanggilan": "#F59E0B",
        "status-pemeriksaan": "#3BC354",
        "status-pembayaran": "#FF0004",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
