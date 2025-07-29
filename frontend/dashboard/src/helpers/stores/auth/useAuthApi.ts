// Import - default
import { useContext } from "react";

// Import - helpers
import useAuthStore from "./useAuthStore";
import { ToastContext } from "@/helpers/contexts";
import { useCustomMutation } from "@/helpers/hooks";

// utils
import { getApiErrorMsg, getApiSuccessMsg } from "@/utils/methods/api-methods";
import { AUTH_ROUTES } from "@/utils/data/api/api-routes";
import * as t from "@/utils/constants/toast-constants";

// Main
const useAuthApi = () => {
  // Props
  // const { children } = props;

  // Contexts
  const { setToast } = useContext(ToastContext);

  // Hooks
  const { initialState: authStore, ...state } = useAuthStore();

  // Mutation
  const m = {
    method: "post",
    route: AUTH_ROUTES({}).logout,
    onSuccess: (data: any) => {
      state.setIsLoadingLogout(false);
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(data)));
      state.setLogoutData(data);
    },
    onError: (error: any) => {
      state.setIsLoadingLogout(false);
      setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
    },
    onSettled: () => {
      state.setIsLoadingLogout(false);
    },
    isPublic: true,
  };
  const mutation = useCustomMutation(m);

  // Action when logout button is clicked
  const handleLogout = (e: any) => {
    e.preventDefault();
    // setTimeout(() => {
    try {
      state.setIsLoadingLogout(true);
      mutation.mutate({});
      useAuthStore.persist.clearStorage();
      state.clearAuth();
    } catch (error) {
      console.error("Error during logout:", error);
    }
    // }, 1000);
  };

  return { handleLogout };
};

export default useAuthApi;
