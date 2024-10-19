/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: '#FEC10E',
        secondary: '#475299',
      },
    },
  },
  plugins: [],
};
