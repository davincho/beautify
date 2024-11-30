/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-typewriter")({
      wordsets: {
        texts: {
          words: ["JSON", "JSX", "Typescript", "Javascript", "Markdown"],
          pauseBetween: 2,
        },
      },
    }),
  ],
};
