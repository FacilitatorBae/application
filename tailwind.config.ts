import { type Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        progressBar: {
          "1%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      animation: {
        progressBar: "progressBar 4s linear forwards",
      },
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
}) satisfies Config;
