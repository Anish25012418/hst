// Import - default
import axios from "axios";

// Import - config
import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env";

export const BASE_API = axios.create({
  //   baseURL: import.meta.env.NEXT_PUBLIC_BACKEND_URL,
  // baseURL: "https://himalayan-single-track.onrender.com",
  baseURL: NEXT_PUBLIC_BACKEND_URL,
  // baseURL: "http://dev.localhost.com:8001",
});
