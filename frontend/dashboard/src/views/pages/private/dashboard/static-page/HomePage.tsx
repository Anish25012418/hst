// Import - default
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

// Import - helpers
import * as comp from "@/helpers/components";
import { ToastContext } from "@/helpers/contexts";
import * as hooks from "@/helpers/hooks";
import { useStaticPageApi, useStaticPageStore } from "@/helpers/stores";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { CRUD_ROUTES } from "@/utils/data/api/api-routes";
import { getApiSuccessMsg, getApiErrorMsg } from "@/utils/methods/api-methods";
import {
  getInputErr,
  transformUpdateFormData,
} from "@/utils/methods/form-methods";
import { InputOnChangeSchema } from "@/utils/schemas/GlobalSchema";
import { HomeValidation } from "@/utils/validations/formValidation";
import { toTitleCase } from "@/utils/methods/string-methods";
import { getHomePageItemData } from "@/utils/constants/dashboard/homepage-constants";

// Main
const HomePage = () => {
  // Ref
  const isAlreadyLoadedRef = useRef(false);

  // States
  const [imgHidden, setImgHidden] = useState(false);

  // Context
  const { setToast } = useContext(ToastContext);

  // Stores
  // const api = useBlogApi();
  const api = useStaticPageApi();
  const store = useStaticPageStore();

  // Hooks
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    ...rest
  } = useForm({
    resolver: yupResolver(HomeValidation),
    mode: "onChange",
  });
  const isOnline = hooks.useInternetOnline();
  const { isLessThan600 } = hooks.useScreenSize();

  // Variables
  const { getAllData, getAllIsRefetchError } = api;
  const {
    // Other needed data
    id,
    // imageGalleryPic,
    item,
    setForm,
    formData,
    clearFormValues,
    type,
    page,
    handleFormChange,
    stickyHeaderProps,
    inputFields,
    imageCoverPic,
    isFormActionDisabled,
    coverImageInputProps,
  } = getHomePageItemData({
    store,
    rest,
    watch,
    isLessThan600,
    imgHidden,
    setImgHidden,
  });

  // Mutation
  const updateMutationParams = {
    method: "put",
    route: CRUD_ROUTES({
      id,
      model: "static_page",
      params: `?q=${page?.query}`,
    }).update,
    onSuccess: (response: any) => {
      api.getAllRefetch();
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      setForm({ type, isLoading: false, isOpen: false });
      // clearFormValues();
    },
    onError: (error: any) => {
      setForm({ type, isLoading: false });
      setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
    },
    onSettled: () => {
      setForm({ type, isLoading: false });
      // clearFormValues();
    },
    isAuthForm: true,
  };
  const updateMutation = hooks.useCustomMutation(updateMutationParams);

  // Action when the form is submitted
  const onSubmit = (data: any) => {
    // If there is no internet, throw offline internet error
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    // Prettify form data to send to the backend
    const modifiedData = transformUpdateFormData(inputFields, data, item); // get the correct data pattern here
    const formData = {
      [page?.name]: { ...modifiedData },
      // ...(!isArraySubsetOf(imageGalleryPicTemp, item?.imageGalleryPic) && {
      // imageGalleryPic: imageGalleryPicTemp,
      // }),
    };

    // Api part
    setForm({ type, isLoading: true });
    updateMutation.mutate(formData);
  };

  // Custom props for static page
  const staticPageProps = {
    onSubmit: handleSubmit(onSubmit),
    item,
    stickyHeaderProps,
  };

  // Custom props including imgHidden
  const newRest = { ...rest, imgHidden: isFormActionDisabled };

  // Refetch the statuc page section
  useEffect(() => {
    isAlreadyLoadedRef.current = true;

    // Handle in case there is no data in refetch
    if (getAllIsRefetchError) {
      setForm({ type, api: [] });
    } else {
      setForm({ type, api: getAllData });
    }
    clearFormValues();
  }, [getAllIsRefetchError, getAllData]);

  // Set the initial values of the react hook form inputs
  // Since the data is empty at first before api call, will need to wait for the api first
  // useEffect(() => {
  //   if (imgHidden) {
  //     clearFormValues();
  //   }
  // }, [imgHidden]);

  // useEffect(() => {
  //   clearFormValues();
  // }, []);

  // Handle errors on toast
  useEffect(() => {
    const errorValues: any = Object?.values(errors);
    if (errorValues?.length > 0) {
      setToast(t.TOAST_ERROR(errorValues[0]?.message));
    }
  }, [errors]);

  return (
    <comp.StaticPageForm {...staticPageProps}>
      <div className="col-span-12 md:col-span-7">
        <comp.ColoredDivSection status="secondary" title="Common">
          {inputFields?.map((singleField: string, idx: number) => {
            // Variables
            const isInfoField = singleField?.endsWith("_info");
            const isTextArea =
              ["site_description", "inquiry", "footer_description"].includes(
                singleField
              ) || isInfoField;
            const textAreaHeight = `min-h-[${
              isTextArea ? (isInfoField ? "120px" : "240px") : "240px"
            }]`;
            const label =
              singleField === "professional_guide_info"
                ? "MTB Professionals"
                : toTitleCase(singleField);
            return (
              <comp.ControllerInput
                key={idx}
                {...f.title({
                  control,
                  name: singleField,
                  label,
                  type: isTextArea ? "textarea" : "text",
                })}
                {...getInputErr(errors, singleField)}
                value={formData[singleField] ?? item?.[singleField]}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, singleField, type)
                }
                height={textAreaHeight}
              />
            );
          })}
        </comp.ColoredDivSection>
      </div>

      <div className="col-span-12 md:col-span-5">
        <comp.ColoredDivSection title="Images" status="secondary">
          <comp.ControllerInput
            {...newRest}
            {...f.imageInput({
              isCaption: true,
              name: "imageCoverPic",
              label: "Cover images",
              defaultFiles: imageCoverPic ?? [],
              control,
            })}
            onChange={(e: InputOnChangeSchema) =>
              handleFormChange(e, "imageCoverPic", type, "image")
            }
            isMultiple
          />
        </comp.ColoredDivSection>
      </div>
    </comp.StaticPageForm>
  );
};

export default HomePage;
