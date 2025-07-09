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
          button: "#A78BFA",
          light: "#ffffff",
        },
        underlay: {
          dark: "#1f2937",
        },
      },
    },
  },
  plugins: [],
};
