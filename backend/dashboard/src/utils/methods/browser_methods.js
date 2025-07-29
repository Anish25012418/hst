// Import - config
// const env = require("../config/env")
// const { COOKIE_DOMAIN, IS_PRODUCTION } = env;

////////////////////////////////////////
////////////////////////////////////////
// Options for setting cookie
////////////////////////////////////////
////////////////////////////////////////
const setCookie = (res, name, value, options = {}) => {
  // Variables
  const isProduction = process.env.NODE_ENV === "production";
  const COOKIE_DOMAINS_PROD = [
    ".himalayansingletrack.com",
    "app.himalayansingletrack.com",
    ".onrender.com",
    "himalayan-single-track.onrender.com",
  ];
  const COOKIE_DOMAINS_DEV = [
    ".dev.localhost.com",
    ".front.localhost.com",
    ".localhost.com",
    "dev.localhost.com",
    "front.localhost.com",
    "localhost",
    "localhost:6789",
  ];

  const domains = isProduction ? COOKIE_DOMAINS_PROD : undefined;

  if (isProduction) {
    domains.forEach((domain) => {
      const cookieOptions = {
        httpOnly: isProduction,
        sameSite: isProduction ? "None" : "Lax",
        secure: isProduction,
        maxAge: options.maxAge || 24 * 60 * 60 * 1000, // 1 day
        domain: domain,
      };
      res.cookie(name, value, cookieOptions);
    });
  }
};

////////////////////////////////////////
module.exports = {
  setCookie,
};
