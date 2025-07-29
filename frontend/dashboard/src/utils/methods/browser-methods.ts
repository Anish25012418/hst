// Import - utils
import { safeParseJSON } from "./object-methods";

// Custom function to check if a token is present in the cookie
export const isTokenPresentInCookie = (tokenName: string) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${tokenName}=`)) {
      return true; // Token found in the cookie
    }
  }
  return false; // Token not found in the cookie
};

// Options for setting cookie
export const setCookie = (
  res: any,
  name: string,
  value: string,
  options: any = {}
) => {
  // Variables
  const isProduction = process.env.mode === "production";
  const COOKIE_DOMAINS = [".onrender.com"];

  const cookieOptions = {
    httpOnly: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
    maxAge: options.maxAge || 24 * 60 * 60 * 1000, // 1 day
    domain: isProduction ? COOKIE_DOMAINS : undefined, // Set the domain array only in production
  };

  res.cookie(name, value, cookieOptions);
};

// Get the required values of from token stored in local storage
export const getAuthDataInLocalStorage = () => {
  const { data, message } = safeParseJSON(localStorage?.getItem("auth"));
  return { data, message };
};
