/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./_layout.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#111827",
          button: "#6d28d9",
          light: "#ffffff",
          btnLight: "rgb(196 181 253 / 0.5)",
        },
        underlay: {
          dark: "#1f2937",
        },
      },
      size: {
        default: {
          DEFAULT: "[17px]",
        },
      },
    },
  },
  plugins: [],
};
