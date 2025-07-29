// Import - default
import { AxiosError } from "axios";

// Import - utils
import { BASE_API } from "@/utils/data/api/axios";
import { ApiQuerySchema } from "@/utils/schemas/ApiSchema";
import { safeParseJSON } from "./object-methods";
// import { ParamSchema } from "@/utils/schemas/GlobalSchema";

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

export const getApiSuccessMsg = (response: any) => {
  // Normal success message
  // { data: {}, message: "some message" };
  const success1 = response?.message;

  // Conditionally get the required error msg
  const result = success1 ?? "";

  return result;

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

  // const normalSuccess = response?.message;
  // const defaultSuccess = "Successful";
  // // { "message": "DailyServices added successfully" }

  // const result = normalSuccess ?? defaultSuccess;
  // return result;
};

export const getApiErrorMsg = (response: any) => {
  // Variables
  const errorMsg = response?.data?.error;
  const errorMsg2 = safeParseJSON(response)?.data?.error;

  // Actions
  const errorType1 = typeof errorMsg === "string" ? errorMsg : "";
  const errorType2 = typeof errorMsg2 === "string" ? errorMsg2 : "";
  const errorType3: any = Array.isArray(errorMsg2)
    ? errorMsg2
        .map((item: { [key: string]: any }) => item)
        .map((item: any) => Object.values(item)?.[0])
    : [];

  // Conditionally get the required error msg
  const result =
    errorType1 || errorType2 || errorType3?.[0] || "Some error occured.";
  return result;

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

  // const listErrors = response?.data?.Errors; // [{label1:"error"}, {label2:"error"}]
  // const msgError = [response?.data?.message]; // {message: "Error"}
  // const simpleError = [response?.data?.Error]; // {"Error": "There is no data to update."}
  // const loginError = [response?.data?.password]; // { "password": "Invalid login credentials provided" }
  // const defaultError = ["Some error occured."]; // Custom error message

  // // Conditionally get the required error message
  // const result = !checkInvalidArr(listErrors)
  //   ? listErrors
  //   : !checkInvalidArr(msgError)
  //   ? msgError
  //   : !checkInvalidArr(simpleError)
  //   ? simpleError
  //   : !checkInvalidArr(loginError)
  //   ? loginError
  //   : defaultError;
  // const errorMessage = Object?.values?.(result);
  // return errorMessage[0] as string;
};

// REST API that does not require access_token & session
// export const apiQuery = async ({ request: req, route, formData }: any) => {
//   const request = req.toLowerCase();
//   if (request === "post") {
//     try {
//       const response = await BASE_API.post(route, formData);
//       const data = await response.data;
//       return data;
//     } catch (err: any) {
//       throw new Error(JSON.stringify(getAxiosError(err)));
//     }
//   } else if (request === "put") {
//     try {
//       const response = await BASE_API.put(route, formData);
//       const data = await response.data;
//       return data;
//     } catch (err: any) {
//       throw new Error(JSON.stringify(getAxiosError(err)));
//     }
//   } else if (request === "delete") {
//     try {
//       const response = await BASE_API.delete(route);
//       const data = await response.data;
//       return data;
//     } catch (err: any) {
//       throw new Error(JSON.stringify(getAxiosError(err)));
//     }
//   }
// };

// REST API query function with improved structure and error handling
export const apiQuery = async (props: ApiQuerySchema) => {
  try {
    const { method, route, formData, isPublicForm } = props;
    const response = await BASE_API({
      method: method ?? "get",
      url: route,
      headers: {
        // Authorization: `Bearer ${auth?.access_token ?? ""}`,
        // "X-Session-ID": auth?.session ?? "",
        "Content-Type": isPublicForm
          ? "multipart/form-data"
          : "application/json",
        // "Content-Type": "application/json",
      },
      data: formData, // Pass formData as the request data
    });

    return response.data;
  } catch (error: any) {
    throw new Error(JSON.stringify(getAxiosError(error)));
  }
};

// REST API query function with improved structure and error handling
export const authApiQuery = async (props: ApiQuerySchema) => {
  try {
    const { method, route, formData, isAuthForm } = props;

    const response = await BASE_API({
      method: method ?? "get",
      url: route,
      headers: {
        // Authorization: `Bearer ${auth?.access_token ?? ""}`,
        // "X-Session-ID": auth?.session ?? "",
        "Content-Type": isAuthForm ? "multipart/form-data" : "application/json",
        // "Content-Type": "application/json",
      },
      data: formData, // Pass formData as the request data
    });

    return response.data;
    // return {};
  } catch (error: any) {
    throw new Error(JSON.stringify(getAxiosError(error)));
  }
};
