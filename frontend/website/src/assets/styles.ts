import defaultTheme from "tailwindcss/defaultTheme";

// Box shadow
export const boxShadow = {
  "bottom-xl":
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  "top-xl":
    "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
};

// Responsive screens
export const screens = {
  ...defaultTheme.screens, // Default Tailwind CSS breakpoints
  "4xs": "175px", // Extremely small screens (smartwatches),
  "3xs": "300px", // Extremely small screens (smartwatches)
  "2xs": "404px", // Very small screens
  xs: "475px", // Small screens (standard smartphones)
  sm: "640px", // Medium screens (tablets)
  md: "768px", // Medium-large screens (iPads, larger tablets)
  mdx: "848px", // Break point
  lg: "1024px", // Large screens (small laptops, desktops)
  xl: "1280px", // Extra-large screens (standard desktops)
  ipad: "1366px", // Extra-extra-large screens (large desktops)
  "2xl": "1536px", // Extra-extra-large screens (large desktops)
  // "3xl": "1921px", // Extra-extra-large screens (large desktops)
};
