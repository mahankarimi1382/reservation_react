/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    darkTheme: "light",
  },

  // مهم‌ترین بخش — اصلاح شده برای CRA
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1380px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  plugins: [require("daisyui")],
};
