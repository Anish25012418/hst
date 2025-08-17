// Import - config
import {NEXT_PUBLIC_IMAGE_URL} from "@/config/env";

// Import - utils
import { normalizeFilename } from "./string-methods";

// Constructing URLs for images stored on a backend server
export const getApiImg = (pathname: string = ""): string => {
  const baseUrl = NEXT_PUBLIC_IMAGE_URL || "";

  // Ensure no leading slash in pathname and no trailing slash in base URL
  const sanitizedBaseUrl = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;
  const sanitizedPathname = pathname.startsWith("/")
    ? pathname.slice(1)
    : pathname;
  const removedExtraUnderscoresUrl = normalizeFilename(sanitizedPathname);

  return `${sanitizedBaseUrl}/${removedExtraUnderscoresUrl}`;
};
