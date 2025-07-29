// Import - default
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Import - helpers
import {
  ColoredDivSection,
  ControllerInput,
  DashboardContainer,
  StaticPageForm,
  ThumbnailImage,
} from "@/helpers/components";
import { ToastContext } from "@/helpers/contexts";
import { useAuthStore } from "@/helpers/stores";

// Import - utils
import { UpdateUserValidation } from "@/utils/validations/formValidation";
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { AUTH_ROUTES } from "@/utils/data/api/api-routes";
import { getApiSuccessMsg, getApiErrorMsg } from "@/utils/methods/api-methods";
import {
  useCustomMutation,
  useInternetOnline,
  useScreenSize,
} from "@/helpers/hooks";
import { getInputErr } from "@/utils/methods/form-methods";
import { isNullObject } from "@/utils/methods/object-methods";
import { InputOnChangeSchema } from "@/utils/schemas/GlobalSchema";
import { useNavigate } from "react-router-dom";

// Main
const SettingsPage = () => {
  // Context
  const { setToast } = useContext(ToastContext);

  // States
  const [activeTab, setActiveTab] = React.useState("update-user-profile");
  const [currentData, setCurrentData] = useState<any>({});

  // Stores
  const { initialState: store, setForm } = useAuthStore();

  // Stores variables
  const { type, isLoading } = store?.forms?.updateUser ?? {};
  const item = store?.auth?.data ?? {};
  const { _id: id, fullName, imageProfilePic } = item;

  // Hooks
  const navigate = useNavigate();
  const { isLessThan600 } = useScreenSize();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    ...rest
  } = useForm<any>({
    resolver: yupResolver(UpdateUserValidation),
    mode: "onChange",
  });
  const isOnline = useInternetOnline(); // Check if there is an internet connection

  // Variables
  const isFormActionDisabled =
    (Object?.keys(errors)?.length > 0 || isNullObject(currentData)) &&
    typeof watch("imageProfilePic") !== "object";

  // Mutation
  const updateUserMutationParams = {
    method: "put",
    route: AUTH_ROUTES({ id }).updateUser,
    onSuccess: (response: any) => {
      navigate(0);
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      clearFormValues();
    },
    onError: (error: any) => {
      setForm({ type, isLoading: false });
      setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
    },
    onSettled: () => {
      clearFormValues();
    },
    isAuthForm: true,
  };
  const updateUserMutation = useCustomMutation(updateUserMutationParams);

  // Action to clear the form values
  const clearFormValues = () => {
    // setForm({ type, isLoading: false, isOpen: false});
    setCurrentData({});
    rest?.setValue("fullName", fullName);
    (rest as any)?.setValue("imageProfilePic", imageProfilePic);
  };

  // Action when the form gets submitted
  const onSubmit = (data: any) => {
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }
    // Api part
    setForm({ type, isLoading: true });
    setTimeout(() => updateUserMutation.mutate(data), 600);
  };

  // Handle errors on toast
  useEffect(() => {
    const errorValues: any = Object?.values(errors);
    if (errorValues?.length > 0) {
      setToast(t.TOAST_ERROR(errorValues[0]?.message));
    }
  }, [errors]);

  // Clear form values on initial load
  useEffect(() => {
    clearFormValues();
  }, []);

  // Custom props for static page
  const stickyHeaderProps = {
    rest,
    title: isLessThan600 ? "Update Profile" : "Profile - Update User Details",
    bg: "bg-brand-yellow-1000",
    submitTitle: "Update",
    cancelTitle: "Reset",
    isLoading,
    isSubmitDisabled: isFormActionDisabled,
    isCancelDisabled: isFormActionDisabled,
    type,
    caption: isLessThan600 ? "Fill in:" : "Fill in the details.",
    setForm,
    handleFormCancel: clearFormValues,
  };
  const staticPageProps = {
    onSubmit: handleSubmit(onSubmit),
    item,
    stickyHeaderProps,
  };

  // Custom props including imgHidden
  const newRest = { ...rest, imgHidden: isFormActionDisabled };

  // Main data for tabs
  const data = [
    {
      label: "Update User Profile",
      value: "update-user-profile",
      desc: (
        <StaticPageForm {...staticPageProps}>
          <div className="col-span-12 md:col-span-6 flex flex-col gap-8">
            <ColoredDivSection status="secondary" title="Common">
              <ControllerInput
                {...f.fullName({ control, name: "fullName" })}
                {...getInputErr(errors, "fullName")}
                value={currentData?.fullName ?? fullName}
                onChange={(e: InputOnChangeSchema) =>
                  setCurrentData((prev: any) => ({
                    ...prev,
                    fullName: e?.target?.value,
                  }))
                }
              />
              <ControllerInput
                {...f.password({ control, label: "New Password" })}
                {...getInputErr(errors, "password")}
                value={currentData?.password ?? ""}
                onChange={(e: InputOnChangeSchema) =>
                  setCurrentData((prev: any) => ({
                    ...prev,
                    password: e?.target?.value,
                  }))
                }
              />
            </ColoredDivSection>
          </div>
          <div className="col-span-12 md:col-span-6">
            <ColoredDivSection status="secondary" title="Profile Picture">
              <ControllerInput
                {...f.imageInput({
                  name: "imageProfilePic",
                  label: "",
                  control,
                })}
                singleImage={<ThumbnailImage src={imageProfilePic} />}
                {...getInputErr(errors, "imageProfilePic")}
                {...newRest}
              />
            </ColoredDivSection>
          </div>
        </StaticPageForm>
      ),
    },
    // {
    //   label: "User Setting",
    //   value: "user-setting",
    //   desc: `some user settings..`,
    // },
    // {
    //   label: "Future Setting 2",
    //   value: "future-setting-2",
    //   desc: `Will implement some setting later`,
    // },
  ];

  return (
    <DashboardContainer>
      <Tabs
        value={activeTab}
        className="min-w-[340px] overflow-x-auto thin-scrollbar font-poppins"
      >
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={activeTab === value ? "text-gray-900" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data?.map(({ value, desc }: any) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </DashboardContainer>
  );
};

export default SettingsPage;
