// Default
import { AxiosError } from "axios";

// Utils
import { BASE_API } from "@/utils/data/api/axios";
import { ApiQuerySchema } from "@/utils/schemas/ApiSchema";

// Utility function to handle Axios errors and extract relevant information
const getAxiosError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    return {
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      status: 0,
      data: "No response received from server",
    };
  } else {
    // Something happened in setting up the request that triggered an error
    return {
      status: -1,
      data: error.message,
    };
  }
};

export const getResponseErrorMsg = (response: any) => {
  const listErrors = response?.data?.Errors; // [{label1:"error"}, {label2:"error"}]
  const msgError = [response?.data?.message]; // {message: "Error"}
  const defaultError = ["Some error occured."];

  // Conditionally get the required error message
  const errorMsg = Object?.values?.(listErrors ?? msgError ?? defaultError);
  return errorMsg[0] as string;
};

// REST API query function with improved structure and error handling
export const apiQuery = async (props: ApiQuerySchema) => {
  try {
    const { method, route, formData, url } = props;
    const response = await BASE_API({
      method: method ?? "get",
      url: url ?? route,
      // headers: {
      //   Authorization: `Bearer ${auth?.access_token ?? ""}`,
      //   "X-Session-ID": auth?.session ?? "",
      // },
      data: formData, // Pass formData as the request data
    });

    return response?.data;
  } catch (error: any) {
    throw new Error(JSON.stringify(getAxiosError(error)));
  }
};
