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
import { getInputErr } from "@/utils/methods/form-methods";
import { InputOnChangeSchema } from "@/utils/schemas/GlobalSchema";
import { WorkshopValidation } from "@/utils/validations/formValidation";
import { toTitleCase } from "@/utils/methods/string-methods";
import {
  getWorkshopPageFormData,
  getWorkshopPageItemData,
} from "@/utils/constants/dashboard/workshop-constants";
import { isObjectSubsetOf } from "@/utils/methods/object-methods";

// Main
const WorkshopPage = () => {
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
    resolver: yupResolver(WorkshopValidation),
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
    // textFields,
    textFields,
    allListFields,
    brandGalleryFields,
    isFormActionDisabled,
  } = getWorkshopPageItemData({
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
    const modifiedData = getWorkshopPageFormData(data, item); // get the correct data pattern here

    // console.log("modifiedData", modifiedData);

    // return;

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
      [page?.name]: { ...modifiedData },
      // ...(!isArraySubsetOf(imageGalleryPicTemp, item?.imageGalleryPic) && {
      // imageGalleryPic: imageGalleryPicTemp,
      // }),
    };
    // console.log("new form data", formData);

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

  return (
    <comp.StaticPageForm {...staticPageProps}>
      <div className="col-span-12">
        <comp.ColoredDivSection status="secondary" title="Common">
          {textFields?.map((singleText: string, idx: number) => {
            // Variables
            const inputType = ["description"].includes(singleText)
              ? "textarea"
              : "text";

            // Determine the initial value
            const value = formData[singleText]
              ? formData[singleText]
              : item?.[singleText];

            return (
              <comp.ControllerInput
                key={idx}
                {...f.title({
                  control,
                  name: singleText,
                  label: toTitleCase(singleText),
                  type: inputType,
                })}
                {...getInputErr(errors, singleText)}
                value={value}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, singleText, type)
                }
              />
            );
          })}
          <comp.ControllerInput
            {...f.imageInput({
              name: "workshopThumbnailPic",
              label: "Thumbnail image",
              control,
            })}
            singleImage={
              <comp.ThumbnailImage src={item?.workshopThumbnailPic} />
            }
            {...getInputErr(errors, "workshopThumbnailPic")}
            {...newRest}
          />
        </comp.ColoredDivSection>
      </div>

      {/* <GalleryCommonSection ref={tripsField1Ref} arr={tripsField1} /> */}
      {/* <GalleryCommonSection ref={tripsField2Ref} arr={tripsField2} /> */}

      {/* Services section */}
      <div className="col-span-12 grid grid-cols-12 gap-8">
        {/* Section 1 */}
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection status="secondary" title="Section 1">
            {allListFields?.listField1?.map((singleService: string) => {
              if (singleService.includes("list_header")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.title({
                      control,
                      name: singleService,
                      label: "Header",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={formData[singleService] ?? item?.list?.[0]?.header}
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else if (singleService.includes("list_description")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.textArea({
                      control,
                      name: singleService,
                      label: "Description",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={
                      formData[singleService] ?? item?.list?.[0]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.imageInput({
                      name: singleService,
                      label: "Display Image",
                      control,
                    })}
                    singleImage={
                      <comp.ThumbnailImage src={item?.list?.[0]?.image} />
                    }
                    // <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                    {...getInputErr(errors, singleService)}
                    {...newRest}
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
          .
        </div>

        {/* Section 2 */}
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection status="secondary" title="Section 2">
            {allListFields?.listField2?.map((singleService: string) => {
              if (singleService.includes("list_header")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.title({
                      control,
                      name: singleService,
                      label: "Header",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={formData[singleService] ?? item?.list?.[1]?.header}
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else if (singleService.includes("list_description")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.textArea({
                      control,
                      name: singleService,
                      label: "Description",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={
                      formData[singleService] ?? item?.list?.[1]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.imageInput({
                      name: singleService,
                      label: "Display Image",
                      control,
                    })}
                    singleImage={
                      <comp.ThumbnailImage src={item?.list?.[1]?.image} />
                    }
                    // <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                    {...getInputErr(errors, singleService)}
                    {...newRest}
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
          .
        </div>

        {/* Section 3 */}
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection status="secondary" title="Section 3">
            {allListFields?.listField3?.map((singleService: string) => {
              if (singleService.includes("list_header")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.title({
                      control,
                      name: singleService,
                      label: "Header",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={formData[singleService] ?? item?.list?.[2]?.header}
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else if (singleService.includes("list_description")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.textArea({
                      control,
                      name: singleService,
                      label: "Description",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={
                      formData[singleService] ?? item?.list?.[2]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.imageInput({
                      name: singleService,
                      label: "Display Image",
                      control,
                    })}
                    singleImage={
                      <comp.ThumbnailImage src={item?.list?.[2]?.image} />
                    }
                    // <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                    {...getInputErr(errors, singleService)}
                    {...newRest}
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
          .
        </div>

        {/* Section 4 */}
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection status="secondary" title="Section 4">
            {allListFields?.listField4?.map((singleService: string) => {
              if (singleService.includes("list_header")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.title({
                      control,
                      name: singleService,
                      label: "Header",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={formData[singleService] ?? item?.list?.[3]?.header}
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else if (singleService.includes("list_description")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.textArea({
                      control,
                      name: singleService,
                      label: "Description",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={
                      formData[singleService] ?? item?.list?.[3]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.imageInput({
                      name: singleService,
                      label: "Display Image",
                      control,
                    })}
                    singleImage={
                      <comp.ThumbnailImage src={item?.list?.[3]?.image} />
                    }
                    // <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                    {...getInputErr(errors, singleService)}
                    {...newRest}
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
          .
        </div>

        {/* Section 5 */}
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection status="secondary" title="Section 5">
            {allListFields?.listField5?.map((singleService: string) => {
              if (singleService.includes("list_header")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.title({
                      control,
                      name: singleService,
                      label: "Header",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={formData[singleService] ?? item?.list?.[4]?.header}
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else if (singleService.includes("list_description")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.textArea({
                      control,
                      name: singleService,
                      label: "Description",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={
                      formData[singleService] ?? item?.list?.[4]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.imageInput({
                      name: singleService,
                      label: "Display Image",
                      control,
                    })}
                    singleImage={
                      <comp.ThumbnailImage src={item?.list?.[4]?.image} />
                    }
                    // <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                    {...getInputErr(errors, singleService)}
                    {...newRest}
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
          .
        </div>

        {/* Section 6 */}
        <div className="col-span-12 md:col-span-6">
          <comp.ColoredDivSection status="secondary" title="Section 6">
            {allListFields?.listField6?.map((singleService: string) => {
              if (singleService.includes("list_header")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.title({
                      control,
                      name: singleService,
                      label: "Header",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={formData[singleService] ?? item?.list?.[5]?.header}
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else if (singleService.includes("list_description")) {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.textArea({
                      control,
                      name: singleService,
                      label: "Description",
                    })}
                    {...getInputErr(errors, singleService)}
                    value={
                      formData[singleService] ?? item?.list?.[5]?.description
                    }
                    onChange={(e: InputOnChangeSchema) =>
                      handleFormChange(e, singleService, type)
                    }
                  />
                );
              } else {
                return (
                  <comp.ControllerInput
                    key={singleService}
                    {...f.imageInput({
                      name: singleService,
                      label: "Display Image",
                      control,
                    })}
                    singleImage={
                      <comp.ThumbnailImage src={item?.list?.[5]?.image} />
                    }
                    // <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                    {...getInputErr(errors, singleService)}
                    {...newRest}
                  />
                );
              }
            })}
          </comp.ColoredDivSection>
        </div>
      </div>

      {/* Brnad section */}
      <div className="col-span-12">
        <comp.ColoredDivSection status="secondary" title="Brand Gallery">
          <div className="grid grid-cols-12 gap-4">
            {brandGalleryFields?.map((singleBrand: string, idx: number) => (
              <div key={singleBrand} className="col-span-12 md:col-span-4">
                <comp.ControllerInput
                  singleImage={
                    <comp.ThumbnailImage src={item?.brand_gallery?.[idx]} />
                  }
                  {...getInputErr(errors, singleBrand)}
                  {...newRest}
                  {...f.imageInput({
                    name: singleBrand,
                    label: `Brand ${idx + 1}`,
                    control,
                  })}
                />
              </div>
            ))}
          </div>
        </comp.ColoredDivSection>
      </div>
    </comp.StaticPageForm>
  );
};

export default WorkshopPage;
