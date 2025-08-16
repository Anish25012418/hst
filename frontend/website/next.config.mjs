// Default imports
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load the appropriate environment file
// Derive __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";

// Determine which .env file to use
const envPath = isProduction
  ? path.resolve(__dirname, ".env.production")
  : path.resolve(__dirname, ".env.development");
dotenv.config({ path: envPath });

// Main
const nextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },

  // Production only settings
  ...(isProduction && {
    //output: "export", // should only run during build and not during npm start
    trailingSlash: true,
  }),

  // images: { unoptimized: true },
  // IMAGE CONFIG
  images: {
    unoptimized: true,
    // Add image domain if imported from a site
    domains: [
      // Production
      "https://api.himalayansingletrack.com/",
      "https://app.himalayansingletrack.com/",
      "https://web.himalayansingletrack.com/",
      "https://himalayansingletrack.com/",

      // Development
      "http://dev.localhost.com",
      "http://front.localhost.com",

      // Cloudinary to store some images
      "https://res.cloudinary.com",

      // Others
      "https://dynamic-media-cdn.tripadvisor.com",
      "https://guamhomesforsaleandrent.com",
      "https://media.tacdn.com",

      "https://s3-cdn.designerjourneys.com",
      "https://swiperjs.com",
      "https://thumbs.dreamstime.com",
      "https://www.atlasrideco.com",
      "https://www.manasluadventures.com",
      "https://www.valthorens.com",
    ],
  },
  //   deviceSizes: [320, 420, 768, 1024, 1200],
  //   unoptimized: true,
  //   loader: "custom",
  //   loaderFile: "./src/utils/loaders/cloudinaryLoader.ts",
  // },

  // Folder directory control with /
};

export default nextConfig;
