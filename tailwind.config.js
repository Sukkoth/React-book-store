/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        "dashboard-bg": "#F0F2FF",
        midnight: {
          50: "#eff6fe",
          100: "#e2edfd",
          200: "#cbddfa",
          300: "#abc6f6",
          400: "#8aa6ef",
          500: "#6d87e7",
          600: "#5163da",
          700: "#4352bf",
          800: "#38459b",
          900: "#343f7b",
          950: "#171b36",
        },
        picton: {
          50: "#eff9ff",
          100: "#def1ff",
          200: "#b6e6ff",
          300: "#75d3ff",
          400: "#2cbeff",
          500: "#00abff",
          600: "#0084d4",
          700: "#0069ab",
          800: "#00588d",
          900: "#064a74",
          950: "#042f4d",
        },
      },
    },
  },
  plugins: [],
};
