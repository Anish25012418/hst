// Import - default
import { AxiosRequestConfig } from "axios";

// Import - relative
// import { AuthDataSchema } from "./HooksSchema";

export type ApiQuerySchema = {
  route: string;
  auth?: any;
  method?: AxiosRequestConfig["method"];
  formData?: any;
  isPublic?: boolean;
  isPublicForm?: boolean;
  isAuthForm?: boolean;
};

export type AxiosErrorResponse = {
  response?: {
    data?: any;
    status?: number;
    statusText?: string;
    headers?: any;
  };
  message?: string;
};
