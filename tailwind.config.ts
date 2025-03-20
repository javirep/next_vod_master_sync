/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",  // For App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // For Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}"
  ],
  // purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  media: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      screens: {
        xs: '375px',
        sm: '600px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1536px',
        '3xl': '1792px',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        background: {
          primary: '#242424'
        },
        blue: {
          primary: '#2D64BE',
          secondary: '#C0D0EB',
        },
        white: '#D3D1D1',
        error: '#BE3144',
        grey: {
          25: '#1F1F1F',
          50: "#2E2E2E",
          100: '#4C4C4C',
          200: '#595959',
          300: '#C4C4C4',
        },
        bluePrimary: "#2D64BE"
      },
    },
  },
  plugins: [],
};
