// Default
import withMT from "@material-tailwind/react/utils/withMT";

// Assets
import colors from "./src/assets/colors";
import { boxShadow, screens } from "./src/assets/styles";

// main
module.exports = withMT({
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens,
    extend: { colors, boxShadow },
  },
  plugins: [],
});
