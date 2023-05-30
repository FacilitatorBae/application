import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: "var(--font-poppins)",
        comfortaa: "var(--font-comfortaa)",
        inter: "var(--font-inter)",
      },
      colors: {
        "blue-brand": "#0071BD",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
} satisfies Config;
