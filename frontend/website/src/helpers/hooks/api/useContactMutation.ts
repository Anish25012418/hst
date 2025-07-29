import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { apiQuery } from "@/utils/methods/api-methods";

// Define the form data interface
interface FormData {
  full_name: string;
  email: string;
  phone: string;
  tour_interested?: string;
  country?: string;
  request_date?: string;
  question?: string;
}

// Define the response type for the API request
interface ApiResponse {
  success: boolean;
  message?: string;
}

// Custom hook to handle contact form mutation
export const useContactMutation = (): UseMutationResult<
  ApiResponse,
  Error,
  FormData
> => {
  return useMutation({
    mutationFn: (formData: FormData) =>
      apiQuery({
        method: "post",
        route: "/public/send-email",
        formData,
        ...(process.env.MODE !== "production" && {
          url: "http://localhost:8001/public/send-email",
        }),
      }),
    onSuccess: () => {
      // alert("Email sent successfully:");
    },
    onError: (error: Error) => {
      alert(`Error sending email: ${error.message}`);
    },
  });
};
