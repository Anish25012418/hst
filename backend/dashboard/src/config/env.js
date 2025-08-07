// Import - default
const dotenv = require("dotenv");
const path = require("path");

// Global variables
const mode = process.env.NODE_ENV || "development";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const envFilePath = path.resolve(__dirname, `../../.env`);

try {
  // Load environment variables from the selected file
  dotenv.config({ path: envFilePath });
} catch (err) {
  console.error(
    `Error loading environment variables from ${envFilePath}:`,
    err
  );
  process.exit(1); // Exit the process if there's an error loading env variables
}

// Variables
const { COOKIE_DOMAIN, DATABASE_URL, JWT_SECRET, PORT } = process.env;

module.exports = {
  COOKIE_DOMAIN,
  DATABASE_URL,
  IS_PRODUCTION,
  JWT_SECRET,
  PORT,
};
