module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        "uk-banner": "url('/images/uk/banner.jpeg')",
        "us-banner": "url('/images/us/banner1.jpeg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
