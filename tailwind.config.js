/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      navcolor: '#064e3b'
    },

    extend: {
      margin: {
        '50px': '50 px',
        '160px': '160 px',
        '450px': '450 px',
        '540px': '540 px',
        '600px': '600 px',
        'cardrem': '100rem',
      }
    },
  },
  plugins: [],
})