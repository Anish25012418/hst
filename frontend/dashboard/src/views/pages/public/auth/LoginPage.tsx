// Import - default
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";

// Import - helpers
import { ControllerInput, Image, SimpleForm } from "@/helpers/components";
import { ToastContext } from "@/helpers/contexts";
import { useCustomMutation, useInternetOnline } from "@/helpers/hooks";
import { useAuthStore } from "@/helpers/stores";

// Import - utils
import * as c from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { AUTH_ROUTES } from "@/utils/data/api/api-routes";
import { getApiErrorMsg } from "@/utils/methods/api-methods";
import { getInputErr } from "@/utils/methods/form-methods";
import { LoginValidation } from "@/utils/validations/formValidation";

// Main
const LoginPage = () => {
  // Contexts
  const { setToast } = useContext(ToastContext);

  // Hooks
  const { initialState: store, ...state } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginValidation), mode: "onChange" });
  const isOnline = useInternetOnline(); // Check if there is an internet connection

  // Mutation
  const m = {
    method: "post",
    route: AUTH_ROUTES({}).login,
    onSuccess: (response: any) => {
      state.clearFormModels();
      // setToast(t.TOAST_SUCCESS(`Welcome back, ${response?.data?.fullName}.`));
      state.setAuth(response); // Store authentication data in useAuthStore upon successful login
      state.setIsLoggedIn(true);
      // api.refetchRegenTokenData(); // refetch the api to refresh the token on login
    },
    onError: (error: any) => {
      state.setIsLoading(false);
      state.setIsLoggedIn(false);
      setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
    },
    onSettled: () => {
      state.setIsLoading(false);
    },
    isPublic: true,
  };
  // timeout: 5, // Shall be used in the future I guess
  const mutation = useCustomMutation(m);

  // Handle the submit of Login form
  const onSubmit = (data: any) => {
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }
    // Api part
    state.setIsLoading(true);
    setTimeout(() => mutation.mutate(data), 600);
  };

  return (
    <div className="h-screen grid place-items-center">
      <Image
        src="https://res.cloudinary.com/dcljf43v8/image/upload/v1718691572/hst/homepage/v1/banner_slider/banner_2.jpg"
        alt="login_image"
        divCss="absolute w-full h-full object-cover"
        // imgCss=""
      />
      <SimpleForm
        isLoading={store.isLoading}
        extendCss="max-h-[500px] overflow-y-auto thin-scrollbar bg-white/80 p-6 rounded-none"
        submitTitle="Login"
        onSubmit={handleSubmit(onSubmit)}
        nextPage={{
          title: "Don't have an account? Register.",
          href: "/register",
        }}
        heading="Login Page"
        showLogo
      >
        <ControllerInput
          {...c.email({ control })}
          {...getInputErr(errors, "email")}
        />

        <ControllerInput
          {...c.password({ control })}
          {...getInputErr(errors, "password")}
        />
      </SimpleForm>
    </div>
  );
};

export default LoginPage;
