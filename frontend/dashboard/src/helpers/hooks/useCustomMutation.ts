// Import - default
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

import useAuthStore from "../stores/auth/useAuthStore";

// Import - helpers
import { ToastContext } from "@/helpers/contexts";

// Import - utils
import { apiQuery, authApiQuery } from "@/utils/methods/api-methods";
import * as t from "@/utils/constants/toast-constants";
import { ApiQuerySchema } from "@/utils/schemas/ApiSchema";

// Main
const useCustomMutation = (props: any) => {
  // Props
  const {
    method,
    route,
    timeout,
    // id,
    onSuccess,
    onError,
    onSettled,
    //
    isPublic,
    isAuthForm,
    isPublicForm,
  } = props;

  // Stores
  const { initialState: authStore } = useAuthStore();

  // Variables
  const { auth } = authStore;

  // Context
  const { setToast } = useContext(ToastContext);

  const mutation = useMutation({
    mutationFn: (formData: any) => {
      const commonData: ApiQuerySchema = { method, route, formData };
      const publicData: ApiQuerySchema = { ...commonData, isPublicForm };
      const authData: ApiQuerySchema = { ...commonData, auth, isAuthForm };
      return isPublic ? apiQuery(publicData) : authApiQuery(authData);
    },
    onSuccess: (data, variables, context) => {
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      // Handle default errrors
      if (error instanceof Error && error.message === "Timeout") {
        setToast(t.REQUEST_TIMED_OUT_ERROR);
      }

      if (onError) {
        onError(error, variables, context);
      }
    },
    onSettled: (data, error, variables, context) => {
      if (onSettled) {
        onSettled(data, error, variables, context);
      }
    },
  });

  // Handle the api timer / i.e. when the api takes too long
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const handleTimeout = () => {
      mutation.reset(); // Reset the mutation
      setToast(t.REQUEST_TIMED_OUT_ERROR); // Show timeout error message
    };

    if (timeout) {
      timerId = setTimeout(handleTimeout, timeout);
    }

    return () => {
      clearTimeout(timerId); // Clear the timeout on unmount or re-render
    };
  }, [timeout, mutation, setToast]);

  return mutation;
};

export default useCustomMutation;
