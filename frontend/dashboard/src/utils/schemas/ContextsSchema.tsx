import { ToastStatusSchema } from "./GlobalSchema";

// ToastContext
export interface ToastSchema extends ToastStatusSchema {
  msg?: string;
  isPopup?: boolean;
  isWidthFull?: boolean;
  duration?: number;
}
export interface ToastContextSchema {
  toast: ToastSchema;
  setToast: React.Dispatch<React.SetStateAction<any>>;
}
