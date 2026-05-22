import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#04514D",
          dark: "#033C39",
          light: "#0A6A65",
        },

        secondary: {
          DEFAULT: "#FF8A3D",
          dark: "#F97316",
          light: "#FFB37A",
        },

        background: "#F5F7F6",

        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#EEF5F2",
        },

        text: {
          DEFAULT: "#12312F",
          light: "#5D6E6C",
          white: "#FFFFFF",
        },

        border: "#DCE7E3",
      },

      boxShadow: {
        card: "0 10px 30px rgba(4, 81, 77, 0.08)",
        button: "0 8px 24px rgba(255, 138, 61, 0.25)",
      },

      borderRadius: {
        card: "1.5rem",
        button: "1rem",
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },

  plugins: [],
} satisfies Config;


/*Exemplo de Uso
<button className="
  bg-secondary
  hover:bg-secondary-dark
  text-white
  shadow-button
  rounded-button
">
*/