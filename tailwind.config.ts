/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dongle: ["Dongle", "sans-serif"], // 여기서 이름을 font-dongle로 사용 가능
      },
    },
  },
  plugins: [],
};
