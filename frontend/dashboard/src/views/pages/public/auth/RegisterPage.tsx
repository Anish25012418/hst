// Import - default
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";

// Import - helpers
import { ToastContext } from "@/helpers/contexts";
import * as comp from "@/helpers/components";
import { useCustomMutation, useInternetOnline } from "@/helpers/hooks";
import { useAuthStore } from "@/helpers/stores";

// Import - utils
import * as c from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { RegisterValidation } from "@/utils/validations/formValidation";
import { getApiErrorMsg, getApiSuccessMsg } from "@/utils/methods/api-methods";
import { AUTH_ROUTES } from "@/utils/data/api/api-routes";
import { getInputErr } from "@/utils/methods/form-methods";
import { useNavigate } from "react-router-dom";

// Main
const RegisterPage = () => {
  // Contexts
  const { setToast } = useContext(ToastContext);

  // Hooks
  const { initialState: store, ...state } = useAuthStore();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    ...rest
  } = useForm({
    resolver: yupResolver(RegisterValidation),
    mode: "onChange",
  });
  const isOnline = useInternetOnline(); // Check if there is an internet connection

  // Mutation
  const m = {
    method: "post",
    route: AUTH_ROUTES({}).register,
    onSuccess: (response: any) => {
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      state.setRegisterData(response);
      state.clearFormModels();
      navigate("/login");
    },
    onError: (error: any) => {
      state.setIsLoadingRegister(false);
      setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
    },
    onSettled: () => {
      state.setIsLoadingRegister(false);
    },
    isPublic: true,
    isPublicForm: true,
  };
  // timeout: 5, // Shall be used in the future I guess
  const mutation = useCustomMutation(m);

  // Handle the submit of Login form
  const onSubmit = (data: any) => {
    // Check if there is no internet
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    // Modify the data that which the backend accepts
    const formData = {
      ...data,
      imageProfilePic: data.imageProfilePic[0],
    };

    // Api part
    state.setIsLoadingRegister(true); // set the loading spinner to true
    setTimeout(() => mutation.mutate(formData), 600);
  };

  // Handle error case for profile image
  // const imageProfilePicValue = watch("imageProfilePic");
  // useEffect(() => {
  //   setProfileImageError(errors?.imageProfilePic?.message);
  //   rest?.trigger("imageProfilePic");
  // }, [
  //   // errors?.imageProfilePic,
  //   imageProfilePicValue,
  //   // globalStore?.fileImages?.length,
  //   // trigger,
  // ]);

  return (
    <div className="h-screen grid place-items-center">
      <comp.Image
        src="https://res.cloudinary.com/dcljf43v8/image/upload/v1718691572/hst/homepage/v1/banner_slider/banner_2.jpg"
        alt="login_image"
        divCss="absolute w-full h-full object-cover"
        // imgCss=""
      />
      <comp.SimpleForm
        isLoading={store.isLoadingRegister}
        extendCss="max-h-[500px] overflow-y-auto thin-scrollbar bg-white/80 p-6 rounded-none"
        submitTitle="Register"
        onSubmit={handleSubmit(onSubmit)}
        nextPage={{
          title: "Already have an account? Login.",
          href: "/login",
        }}
        heading="Register Page"
        showLogo
      >
        <comp.ControllerInput
          {...c.fullName({
            name: "fullName",
            control,
            ...getInputErr(errors, "fullName"),
          })}
        />

        <comp.ControllerInput
          {...c.email({ control, ...getInputErr(errors, "email") })}
        />

        <comp.ControllerInput
          {...c.password({ control, ...getInputErr(errors, "password") })}
        />

        <comp.ControllerInput
          {...rest}
          {...c.imageInput({
            name: "imageProfilePic",
            label: "Profile image",
            control,
            ...getInputErr(errors, "imageProfilePic"),
          })}
        />
      </comp.SimpleForm>
    </div>
  );
};

export default RegisterPage;
