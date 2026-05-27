import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1729",
        navy: "#10223A",
        steel: "#526171",
        gold: "#C99A49",
        ember: "#D63B2A",
        mist: "#F5F7FA"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(11, 23, 41, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
