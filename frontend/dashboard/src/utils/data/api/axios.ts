// Import - default
import axios from "axios";

// Base api for project to talk to backend
export const BASE_API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Include credentials (cookies) in requests
});
