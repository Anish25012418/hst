// Import - default
import {yupResolver} from "@hookform/resolvers/yup";
import {useContext, useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";

// Import - helpers
import * as comp from "@/helpers/components";
import {ToastContext} from "@/helpers/contexts";
import * as hooks from "@/helpers/hooks";
import {useStaticPageApi, useStaticPageStore} from "@/helpers/stores";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import {CRUD_ROUTES} from "@/utils/data/api/api-routes";
import {getApiSuccessMsg, getApiErrorMsg} from "@/utils/methods/api-methods";
import {getInputErr} from "@/utils/methods/form-methods";
import {InputOnChangeSchema} from "@/utils/schemas/GlobalSchema";
import {HSTPokharaValidation} from "@/utils/validations/formValidation";
import {toTitleCase} from "@/utils/methods/string-methods";
import {
  getHSTPokharaPageFormData,
  getHSTPokharaPageItemData,
} from "@/utils/constants/dashboard/hst-pokhara-constants";
import {
  getLabelValuePair,
  isObjectSubsetOf,
} from "@/utils/methods/object-methods";
import {sortImagesByNumber} from "@/utils/methods/app-methods";

// Main
const HSTPokharaPage = () => {
  // Ref
  const isAlreadyLoadedRef = useRef(false);

  // States
  const [imgHidden, setImgHidden] = useState(false);

  // Context
  const {setToast} = useContext(ToastContext);

  // Stores
  // const api = useBlogApi();
  const api = useStaticPageApi();
  const store = useStaticPageStore();

  // Hooks
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
    ...rest
  } = useForm({
    resolver: yupResolver(HSTPokharaValidation),
    mode: "onChange",
  });
  const isOnline = hooks.useInternetOnline();
  const {isLessThan600} = hooks.useScreenSize();

  // Variables
  const {getAllData, getAllIsRefetchError} = api;
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
    isFormActionDisabled,
    textFields,
    tripsField1,
    tripsField2,
  } = getHSTPokharaPageItemData({
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
      setForm({type, isLoading: false, isOpen: false});
      // clearFormValues();
    },
    onError: (error: any) => {
      setForm({type, isLoading: false});
      setToast(t.TOAST_ERROR(getApiErrorMsg(JSON.parse(error.message))));
    },
    onSettled: () => {
      setForm({type, isLoading: false});
      // clearFormValues();
    },
    isAuthForm: true,
  };
  const updateMutation = hooks.useCustomMutation(updateMutationParams);

  const [watchGallery] = watch(["gallery"]);

  // Action when the form is submitted
  const onSubmit = (data: any) => {
    // If there is no internet, throw offline internet error
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    // Prettify form data to send to the backend
    const modifiedData = getHSTPokharaPageFormData(data, item);

    // Check for image validity
    // const imageGalleryPicTemp = data?.gallery;
    // const imageValidity = validateImages({ imageGalleryPicTemp });

    // If there is no change in data, throw a toast
    if (isObjectSubsetOf(modifiedData, item)) {
      // if (isObjectSubsetOf(data, item) || imageValidity !== "TRUE") {
      setToast(t.CHANGE_VALUES_TO_EDIT_ERROR);
      return;
    }

    // Get the correct data pattern here
    const formData = {
      [page?.name]: {...modifiedData},
    };

    console.log(formData);

    // Api part
    setForm({type, isLoading: true});
    updateMutation.mutate(formData);
  };

  // Custom props for static page
  const staticPageProps = {
    onSubmit: handleSubmit(onSubmit),
    item,
    stickyHeaderProps,
  };

  // Custom props including imgHidden
  const newRest = {...rest, imgHidden: isFormActionDisabled};

  // Refetch the statuc page section
  useEffect(() => {
    isAlreadyLoadedRef.current = true;

    // Handle in case there is no data in refetch
    if (getAllIsRefetchError) {
      setForm({type, api: []});
    } else {
      setForm({type, api: getAllData});
    }
    clearFormValues();
  }, [getAllIsRefetchError, getAllData]);

  // Handle errors on toast
  useEffect(() => {
    const errorValues: any = Object?.values(errors);
    if (errorValues?.length > 0) {
      setToast(t.TOAST_ERROR(errorValues[0]?.message));
    }
  }, [errors]);

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
  // console.log("item?.gallery", item?.gallery);

  return (
    <comp.StaticPageForm {...staticPageProps}>
      <div className="col-span-12">
        <comp.ColoredDivSection status="secondary" title="Common">
          {textFields?.map((singleText: string, idx: number) => {
            // Variables
            const isTextArea = ["description"].includes(singleText);
            // const textAreaHeight = `min-h-[${
            //   isTextArea ? "300px" : "240px"
            // }]`;
            const textAreaHeight = "min-h-[200px]";
            return (
              <comp.ControllerInput
                key={idx}
                {...f.title({
                  control,
                  name: singleText,
                  label: toTitleCase(singleText),
                  type: isTextArea ? "textarea" : "text",
                })}
                {...getInputErr(errors, singleText)}
                value={formData[singleText] ?? item?.[singleText]}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, singleText, type)
                }
                height={textAreaHeight}
              />
            );
          })}
        </comp.ColoredDivSection>
      </div>

      {/* <GalleryCommonSection ref={tripsField1Ref} arr={tripsField1} /> */}
      {/* <GalleryCommonSection ref={tripsField2Ref} arr={tripsField2} /> */}
      <div className="col-span-12 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection status="secondary" title="First Trip">
            {tripsField1?.map((singleTrip: string) => {
              if (singleTrip.includes("trips_title")) {
                return (
                  <comp.ControllerInput
                    key={singleTrip}
                    {...f.title({
                      control,
                      name: singleTrip,
                      label: "Name",
                    })}
                    {...getInputErr(errors, singleTrip)}
                    value={formData[singleTrip] ?? item?.trips?.[0]?.title}
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleTrip, type)
                    }
                  />
                );
              } else if (singleTrip.includes("trips_description")) {
                return (
                  <comp.ControllerInput
                    key={singleTrip}
                    {...f.textArea({
                      control,
                      name: singleTrip,
                      label: "Description",
                    })}
                    {...getInputErr(errors, singleTrip)}
                    value={
                      formData[singleTrip] ?? item?.trips?.[0]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleTrip, type)
                    }
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
          .
        </div>
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection status="secondary" title="Second Trip">
            {tripsField2?.map((singleTrip: string) => {
              if (singleTrip.includes("trips_title")) {
                return (
                  <comp.ControllerInput
                    key={singleTrip}
                    {...f.title({
                      control,
                      name: singleTrip,
                      label: "Name",
                    })}
                    {...getInputErr(errors, singleTrip)}
                    value={formData[singleTrip] ?? item?.trips?.[1]?.title}
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleTrip, type)
                    }
                  />
                );
              } else if (singleTrip.includes("trips_description")) {
                return (
                  <comp.ControllerInput
                    key={singleTrip}
                    {...f.textArea({
                      control,
                      name: singleTrip,
                      label: "Description",
                    })}
                    {...getInputErr(errors, singleTrip)}
                    value={
                      formData[singleTrip] ?? item?.trips?.[1]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleTrip, type)
                    }
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
        </div>
      </div>

      <div className="col-span-12">
        <comp.ColoredDivSection status="secondary" title="Gallery Images">
          {item?.gallery?.length && (
            <comp.ControllerInput
              {...f.selectInputOption({
                control,
                label: toTitleCase(
                  "Which gallery image do you want for Hst pokhara banner?"
                ),
                name: "gallery_image_number",
                options: Array.from(
                  {length: item?.gallery?.length},
                  (_, index) => ({
                    label: (index + 1).toString(),
                    value: (index + 1).toString(),
                  })
                ),
              })}
              {...getInputErr(errors, item)}
              {...rest}
              value={
                formData["gallery_image_number"] ??
                getLabelValuePair(item?.["gallery_image_number"])
              }
              onChange={(e: any) =>
                handleFormChange(
                  e,
                  "gallery_image_number",
                  type,
                  "react-select"
                )
              }
            />
          )}
          <comp.ControllerInput
            {...newRest}
            {...f.imageInput({
              name: "gallery",
              label: "",
              control,
              defaultFiles: item?.gallery ?? [],
              ...getInputErr(errors, "gallery")
            })}
            onChange={(e: InputOnChangeSchema) =>
              handleFormChange(e, "gallery", type, "image")
            }
            isMultiple
          />
        </comp.ColoredDivSection>
      </div>
    </comp.StaticPageForm>
  );
};

export default HSTPokharaPage;
