// Default
import { AxiosRequestConfig } from "axios";

export type ApiQuerySchema = {
  route: string;
  // auth?: AuthDataSchema;
  method?: AxiosRequestConfig["method"];
  formData?: any;
  url?: string;
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
