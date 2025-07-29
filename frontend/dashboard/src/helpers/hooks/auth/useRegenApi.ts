// Import - default
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import - helpers
import { ToastContext } from "@/helpers/contexts";
import { useCustomMutation } from "@/helpers/hooks";
import { useAuthStore } from "@/helpers/stores";

// Import - utils
import * as t from "@/utils/constants/toast-constants";
import { AUTH_ROUTES } from "@/utils/data/api/api-routes";
import { getUser } from "@/utils/methods/app-methods";

// Main
const useRegenApi = () => {
  // Ref
  const isTokenApiRef = useRef(false);

  // Contexts
  const { setToast } = useContext(ToastContext);

  // Hooks
  const { initialState: authStore, ...state } = useAuthStore();
  const navigate = useNavigate();

  // Variables
  const { isAuthStore } = getUser({ authStore });

  // Mutation
  const m = {
    method: "post",
    route: AUTH_ROUTES({}).regenAuthToken,
    onSuccess: (response: any) => {
      isAuthStore &&
        setToast(t.TOAST_SUCCESS(`Welcome back, ${response?.data?.fullName}.`));
      state.setAuth(response);
      state.setIsLoadingLogin(false);
      state.setIsLoggedIn(true);
    },
    onError: (error: any) => {
      state.setAuth(error);
      state.setIsLoadingLogin(false);
      state.setIsLoggedIn(false);
      navigate("/login");
      // setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
    },
    onSettled: () => {
      state.setIsLoadingLogin(false);
    },
    isPublic: true,
  };
  const mutation = useCustomMutation(m);

  // Call the regen api here
  useEffect(() => {
    // Only call regen token api if there is a valid auth & cookie
    // if (!isTokenApiRef.current && !isAuthStore && isCookie) {
    if (!isTokenApiRef.current) {
      isTokenApiRef.current = true;
      state.setIsLoadingLogin(true);
      setTimeout(() => mutation.mutate({}), 1000);
    }
  }, []);
};
export default useRegenApi;
