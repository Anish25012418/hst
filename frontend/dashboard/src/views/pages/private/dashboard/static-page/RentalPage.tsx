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
import { getRentalPageItemData } from "@/utils/constants/dashboard/rental-constants";
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { CRUD_ROUTES } from "@/utils/data/api/api-routes";
import { getApiSuccessMsg, getApiErrorMsg } from "@/utils/methods/api-methods";
import { getInputErr } from "@/utils/methods/form-methods";
import { InputOnChangeSchema } from "@/utils/schemas/GlobalSchema";
import { RentalValidation } from "@/utils/validations/formValidation";
import { toTitleCase } from "@/utils/methods/string-methods";
import { getRentalPageFormData } from "@/utils/constants/dashboard/rental-constants";
import { isNullObject } from "@/utils/methods/object-methods";

// Main
const RentalPage = () => {
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
    resolver: yupResolver(RentalValidation),
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
    isFormActionDisabled,
    textFields,
    galleryField1,
    egalleryField1,
    galleryField2,
    egalleryField2,
  } = getRentalPageItemData({
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
    // Check if the data is empty

    // Check for image validity
    // const imageGalleryPicTemp = data?.imageGalleryPic;
    // const imageValidity = validateImages({ imageGalleryPicTemp });

    // If there is no change in data, throw a toast
    // if (isObjectSubsetOf(data, item) || imageValidity !== "TRUE") {
    //   setToast(t.CHANGE_VALUES_TO_EDIT_ERROR);
    //   return;
    // }

    // Prettify form data to send to the backend
    const modifiedData = getRentalPageFormData(data, item); // get the correct data pattern here
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

  return (
    <comp.StaticPageForm {...staticPageProps}>
      <div className="col-span-12 md:col-span-6">
        <comp.ColoredDivSection status="secondary" title="Common">
          <comp.ControllerInput
            {...f.imageInput({
              name: "rental_image",
              label: "Thumbnail image",
              control,
            })}
            singleImage={<comp.ThumbnailImage src={item?.rental_image} />}
            {...getInputErr(errors, "rental_image")}
            {...newRest}
          />
          {textFields?.map((singleText: string, idx: number) => {
            // Variables
            const isTextArea = ["bike_description"].includes(singleText);
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

      <div className="col-span-12 md:col-span-6">
        <comp.ColoredDivSection
          status="secondary"
          title="Rental Page Description"
        >
          <comp.ControllerInput
            {...rest}
            {...f.draftEditorInput({
              control,
              name: "rental_description",
              label: "",
              // label: toTitleCase(rental_description),
            })}
            {...getInputErr(errors, "rental_description")}
            value={
              !isNullObject(formData?.rental_description)
                ? { ...formData?.rental_description, entityMap: {} }
                : { ...item?.rental_description, entityMap: {} }
            }
            // onChange={(e: any) =>
            //   handleFormChange(e, "rental_description", type, "react-select")
            // }
          />
        </comp.ColoredDivSection>
      </div>

      {/* <GalleryCommonSection ref={galleryField1Ref} arr={galleryField1} /> */}
      {/* <GalleryCommonSection ref={galleryField2Ref} arr={galleryField2} /> */}
      <div className="col-span-12 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection status="secondary" title="First Bike Gallery">
            {galleryField1?.map((galleryItem: string, idx: number) => {
              if (galleryItem.includes("bike_gallery_title")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.title({
                      control,
                      name: galleryItem,
                      label: "Name",
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ?? item?.bike_gallery?.[0]?.title
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                  />
                );
              } else if (galleryItem.includes("bike_gallery_description")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.textArea({
                      control,
                      name: galleryItem,
                      label: "Description",
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ??
                      item?.bike_gallery?.[0]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                  />
                );
              } else if (galleryItem.includes("bike_gallery_image")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.imageInput({
                      name: galleryItem,
                      label: "Display Image",
                      control,
                    })}
                    singleImage={
                      <comp.ThumbnailImage
                        src={item?.bike_gallery?.[0]?.image}
                      />
                    }
                    // <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                    {...getInputErr(errors, galleryItem)}
                    {...newRest}
                  />
                );
              } else {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.textArea({
                      control,
                      name: galleryItem,
                      label: `Feature ${idx - 2}`,
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ??
                      (galleryItem
                        ? (() => {
                            const key =
                              Number(galleryItem.split("_").pop()) - 1;
                            return key >= 0
                              ? item?.bike_gallery?.[0]?.features?.[key]
                              : "";
                          })()
                        : "")
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                    height="min-h-[56px]"
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
          .
        </div>
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection
            status="secondary"
            title="Second Bike Gallery"
          >
            {galleryField2?.map((galleryItem: string, idx: number) => {
              if (galleryItem.includes("bike_gallery_title")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.title({
                      control,
                      name: galleryItem,
                      label: "Name",
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ?? item?.bike_gallery?.[1]?.title
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                  />
                );
              } else if (galleryItem.includes("bike_gallery_description")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.textArea({
                      control,
                      name: galleryItem,
                      label: "Description",
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ??
                      item?.bike_gallery?.[1]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                  />
                );
              } else if (galleryItem.includes("bike_gallery_image")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.imageInput({
                      name: galleryItem,
                      label: "Display Image",
                      control,
                    })}
                    singleImage={
                      <comp.ThumbnailImage
                        src={item?.bike_gallery?.[1]?.image}
                      />
                    }
                    // <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                    {...getInputErr(errors, galleryItem)}
                    {...newRest}
                  />
                );
              } else {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.textArea({
                      control,
                      name: galleryItem,
                      label: `Feature ${idx - 2}`,
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ??
                      (galleryItem
                        ? (() => {
                            const key =
                              Number(galleryItem.split("_").pop()) - 1;
                            return key >= 0
                              ? item?.bike_gallery?.[1]?.features?.[key]
                              : "";
                          })()
                        : "")
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                    height="min-h-[56px]"
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
        </div>
      </div>

      <div className="col-span-12 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection
            status="secondary"
            title="First E-Bike Gallery"
          >
            {egalleryField1?.map((galleryItem: string, idx: number) => {
              if (galleryItem.includes("ebike_gallery_title")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.title({
                      control,
                      name: galleryItem,
                      label: "Name",
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ?? item?.ebike_gallery?.[0]?.title
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                  />
                );
              } else if (galleryItem.includes("ebike_gallery_description")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.textArea({
                      control,
                      name: galleryItem,
                      label: "Description",
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ??
                      item?.ebike_gallery?.[0]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                  />
                );
              } else if (galleryItem.includes("ebike_gallery_image")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.imageInput({
                      name: galleryItem,
                      label: "Display Image",
                      control,
                    })}
                    singleImage={
                      <comp.ThumbnailImage
                        src={item?.ebike_gallery?.[0]?.image}
                      />
                    }
                    // <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                    {...getInputErr(errors, galleryItem)}
                    {...newRest}
                  />
                );
              } else {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.textArea({
                      control,
                      name: galleryItem,
                      label: `Feature ${idx - 2}`,
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ??
                      (galleryItem
                        ? (() => {
                            const key =
                              Number(galleryItem.split("_").pop()) - 1;
                            return key >= 0
                              ? item?.ebike_gallery?.[0]?.features?.[key]
                              : "";
                          })()
                        : "")
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                    height="min-h-[56px]"
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
          .
        </div>
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection
            status="secondary"
            title="Second E-Bike Gallery"
          >
            {egalleryField2?.map((galleryItem: string, idx: number) => {
              if (galleryItem.includes("ebike_gallery_title")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.title({
                      control,
                      name: galleryItem,
                      label: "Name",
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ?? item?.ebike_gallery?.[1]?.title
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                  />
                );
              } else if (galleryItem.includes("ebike_gallery_description")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.textArea({
                      control,
                      name: galleryItem,
                      label: "Description",
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ??
                      item?.ebike_gallery?.[1]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                  />
                );
              } else if (galleryItem.includes("ebike_gallery_image")) {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.imageInput({
                      name: galleryItem,
                      label: "Display Image",
                      control,
                    })}
                    singleImage={
                      <comp.ThumbnailImage
                        src={item?.ebike_gallery?.[1]?.image}
                      />
                    }
                    // <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                    {...getInputErr(errors, galleryItem)}
                    {...newRest}
                  />
                );
              } else {
                return (
                  <comp.ControllerInput
                    key={galleryItem}
                    {...f.textArea({
                      control,
                      name: galleryItem,
                      label: `Feature ${idx - 2}`,
                    })}
                    {...getInputErr(errors, galleryItem)}
                    value={
                      formData[galleryItem] ??
                      (galleryItem
                        ? (() => {
                            const key =
                              Number(galleryItem.split("_").pop()) - 1;
                            return key >= 0
                              ? item?.ebike_gallery?.[1]?.features?.[key]
                              : "";
                          })()
                        : "")
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, galleryItem, type)
                    }
                    height="min-h-[56px]"
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
        </div>
      </div>
    </comp.StaticPageForm>
  );
};

export default RentalPage;
