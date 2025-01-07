import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#504d4A',
        alternate: '#efebe5',
        alternateDark: '#d9d4ce',
        mercury: '#f8f8f8',
        mercuryDark: '#d2d2d2',
        btn: '#969696'
      },
    },
  },
  plugins: [],
};
export default config;
