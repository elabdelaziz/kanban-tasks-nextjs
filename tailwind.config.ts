import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainBorder: "rgb(228 235 250/1)",
        darkBorder: "rgb(62 63 78/1)",

        bgDark: "#2B2C37",
        mainDark: "#20212C",
        buttonsMain: "#635FC7",
        inputBorder: "rgba(130,143,163,.4)",
        mainText: "#635FC7",
        bgWhite: "#F4F7FD",
      },
    },
  },
  plugins: [],
} satisfies Config;
