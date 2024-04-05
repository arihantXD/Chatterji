const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#BEADFA",
        "light-blue": "#3FC1C9",
        pink: "#FC5185",
        sender: "#FB88B4",
        receiver: "#B7C9F2",
        gray: "#676767",
      },
      plugins: [
        nextui({
          themes: {
            light: {
              colors: {
                blue: "#BEADFA",
                "light-blue": "#3FC1C9",
                pink: "#FC5185",
                gray: "#676767",
              },
            },
          },
        }),
      ],
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "800px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      backgroundImage: {
        "hero-pattern": "url('/img/hero-pattern.svg')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
