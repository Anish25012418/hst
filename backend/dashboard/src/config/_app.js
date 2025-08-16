// Import configuration from the environment file
const { IS_PRODUCTION } = require("./env");

// Define common URLs for local development
const LOCAL_DEVELOPMENT_URLS = [
  // Localhost on different ports for testing various scenarios
  'http://localhost',          // Default localhost
  'http://localhost:3000',      // Port 3000, commonly used for React development
  'http://localhost:6789',      // Custom port for additional testing
  'http://localhost:8001',      // Another custom port

  // Local network IP addresses for testing on different machines
  'http://192.168.1.153',      // Local IP address 1
  'http://192.168.1.153:6789',  // Custom port on local IP 1
  'http://192.168.1.83',       // Local IP address 2
  'http://192.168.1.83:8001',   // Custom port on local IP 2
  'http://192.168.1.83:6789',   // Another port on local IP 2

  // Development environment URLs
  'http://dev.localhost.com',   // Development domain
  'http://dev.localhost.com:8001', // Custom port for development domain
  'http://dev.localhost.com:6789', // Another custom port for development domain

  // Additional testing URLs
  'http://localhost:5555',      // Additional port for testing purposes

  // Frontend testing URLs
  'http://front.localhost.com', // Frontend development domain
  'http://front.localhost.com:6789', // Custom port for frontend domain
  'http://front.localhost.com:3000',  // Another custom port for frontend domain
];

// Define common URLs for production
const PRODUCTION_URLS = [
  ...LOCAL_DEVELOPMENT_URLS, // Remove this in final production

  // Local URL for testing in production mode
  'http://localhost:3000',      // Port 3000, commonly used for local testing

  // Production domains for the application
  'https://app.himalayansingletrack.com',
  'https://dashboard.himalayansingletrack.com',
  'https://web.himalayansingletrack.com',
  'https://newapp.himalayansingletrack.com',
  'https://newweb.himalayansingletrack.com'
];

// Set ALLOWED_ORIGINS based on the environment
const ALLOWED_ORIGINS = IS_PRODUCTION
  ? PRODUCTION_URLS
  : LOCAL_DEVELOPMENT_URLS;

// Export the allowed origins for use in other parts of the application
module.exports = {
  ALLOWED_ORIGINS
};
