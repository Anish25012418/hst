// Import - default
import withMt from "@material-tailwind/react/utils/withMT";

// Import - relative
import colors from "./src/assets/colors";
import {
  backgroundImage,
  screens,
  zIndex,
} from "./src/assets/css/styles/tailwind-styles";
import { fontSize } from "./src/assets/fonts";
import fontFamily from "./src/assets/fonts/reactjs-fonts";

// Main
module.exports = withMt({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens,
    extend: {
      backgroundImage,
      colors,
      fontSize,
      fontFamily,
      zIndex,
    },
  },
  plugins: [],
});
