// Import - default
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";

// Import - components
import * as comp from "@/helpers/components";

// Import - hooks
import { ToastContext } from "@/helpers/contexts";
import * as hooks from "@/helpers/hooks";
import {
  useCategoryApi,
  useSubcategoryApi,
  useSubcategoryStore,
} from "@/helpers/stores";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { getInputErr } from "@/utils/methods/form-methods";
import { CRUD_ROUTES, SUB_CATEGORY_ROUTES } from "@/utils/data/api/api-routes";
import { getApiErrorMsg, getApiSuccessMsg } from "@/utils/methods/api-methods";
import {
  getLabelValuePair,
  isNullObject,
} from "@/utils/methods/object-methods";
import {
  InputOnChangeSchema,
  OptionSchema,
} from "@/utils/schemas/GlobalSchema";
import { generateUniqueId, toTitleCase } from "@/utils/methods/string-methods";
import { subCategoryMultiEnums } from "@/utils/constants/backend/model-constants";
import {
  fetchSubcategoryDraftData,
  getSubCategoryOption,
} from "@/utils/methods/app-methods";
import { SubcategoryEnumSchema } from "@/utils/schemas/OthersSchema";

// Main
const UpdateSubcategoryDraft = () => {
  // Context
  const { setToast } = useContext(ToastContext);

  // Refs
  const refs = {
    // enums
    includes: useRef(null),
    accommodation: useRef(null),
    bestSeason: useRef(null),
    excludes: useRef(null),
    fitnessLevel: useRef(null),
    groupSize: useRef(null),
    ridingSkill: useRef(null),
    meals: useRef(null),
    tourType: useRef(null),
    transportation: useRef(null),

    // draft-editors
    description: useRef(null),
    overview: useRef(null),
  };

  // Stores
  const { getAllData } = useCategoryApi();
  const subcategoryStore = useSubcategoryStore();

  // Hooks
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    ...rest
  } = useForm({
    // resolver: yupResolver(SubcategoryValidation),
    mode: "onChange",
  });
  const { getAllRefetch, subgetAllRefetch, subDraftGetAllRefetch } =
    useSubcategoryApi();
  const isOnline = hooks.useInternetOnline();
  const { isLessThan600 } = hooks.useScreenSize();

  // Variables
  const type = "update";
  const { forms, handleFormChange, setForm } = subcategoryStore;
  const { formData, isOpen, isLoading, item } = forms.update ?? {};

  // States
  const [selectedDates, setSelectedDates] = useState(null);
  // const [itineraryCount, setItineraryCount] = useState<number[]>([]);
  const [itineraries, setItineraries] = useState<OptionSchema[]>(
    item?.itinerary?.map((value: string) => ({
      label: generateUniqueId(),
      value,
    }))
  );

  // Other variables
  const itinerary = itineraries?.map(({ value }: OptionSchema) => value);
  const isMultiEnum = (item: SubcategoryEnumSchema) =>
    subCategoryMultiEnums?.includes(item);

  // Mutation
  const m = {
    method: "post",
    route: SUB_CATEGORY_ROUTES({}).post,
    onSuccess: (_: any) => {
      deleteDraftMutation?.mutate({});
      // getAllRefetch();
      // subgetAllRefetch();
      // subDraftGetAllRefetch();
      // setForm({ type, isLoading: false, isOpen: false });
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
  const mutation = hooks.useCustomMutation(m);

  // Draft Mutation
  const draftMutationParams = {
    method: "put",
    route: CRUD_ROUTES({ model: "subcategory_draft", id: item?._id }).update,
    onSuccess: (response: any) => {
      subDraftGetAllRefetch();
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      setForm({
        type,
        formData: {},
        item: {},
        isLoading: false,
        isOpen: false,
      });
      rest?.reset();
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
  const draftMutation = hooks.useCustomMutation(draftMutationParams);

  // Delete draft mutation
  const deleteDraftMutationData = {
    method: "delete",
    route: CRUD_ROUTES({ id: item?._id, model: "subcategory_draft" }).delete,
    // onSuccess: (data: any) => {
    onSuccess: () => {
      // setToast(t.TOAST_SUCCESS(getApiSuccessMsg(data)));
      // subgetAllRefetch();
      // subDraftGetAllRefetch();
      // setForm({ type, isOpen: false, isLoading: false });
      getAllRefetch();
      subgetAllRefetch();
      subDraftGetAllRefetch();
      setForm({ type, isLoading: false, isOpen: false });
      setToast(
        t.TOAST_SUCCESS(
          "Moved the draft to subcategory. Please verify in subcategory page!"
        )
      );
    },
    onError: () => {
      setForm({ type, isLoading: false });
      // clearFormModels();
      // clearAll();
    },
    onSettled: () => {
      // clearAll();
      // clearFormModels();
      setForm({ type, isLoading: false });
    },
  };
  const deleteDraftMutation = hooks.useCustomMutation(deleteDraftMutationData);

  const handleFormSubmission = (data: any, mutation: any) => {
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    // Modify the data that which the backend accepts
    const subcategoryData = fetchSubcategoryDraftData(data, item, itinerary);
    const { formData } = subcategoryData;

    // // If there is no change in data, throw a toast
    // if (
    //   isObjectSubsetOf({ ...data, itinerary }, item) ||
    //   imageValidity !== "TRUE"
    // ) {
    //   setToast(t.CHANGE_VALUES_TO_EDIT_ERROR);
    //   return;
    // }

    // Api part
    setForm({ type, isLoading: true });
    mutation.mutate(formData);
  };

  // Action when the form is submitted
  const onSubmit = (data: any) => {
    const modifiedData = { ...data, ...formData };
    handleFormSubmission(modifiedData, mutation);
  };

  // Custom form popup props
  const formProps = {
    isLoading,
    isOpen,
    type: "large",
    heading: "Edit Subcategory Draft",
    submitTitle: "Update",
    onSubmit: handleSubmit(onSubmit),
    handleClose: () => {
      setForm({ formData: {}, isOpen: false, type });
    },
  };

  // Custom sticky heaer props
  const stickyHeaderProps = {
    draftTitle: "Draft",
    handleFormDraft: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleFormSubmission(formData, draftMutation);
    },
    isDraftEnabled: true,
    isLoading,
    isSubmitDisabled: isNullObject(formData),
    setForm,
    submitTitle: "Publish",
    title: isLessThan600 ? "Edit" : "Edit Subcategory Draft",
    type,
  };

  // Set the vaue if there is item
  useEffect(() => {
    if (!isNullObject(item)) {
      // Text types
      rest.setValue("title", item?.title);
      rest.setValue("destination", item?.destination);
      rest.setValue("caption", item?.caption);
      rest.setValue("priceOriginal", item?.priceOriginal);
      rest.setValue("numberOfDays", item?.numberOfDays);

      // Date type
      rest.setValue("departureFrom", item?.departureFrom);

      // Image types
      rest.setValue("imageThumbnailPic", item?.imageThumbnailPic);
      rest.setValue("imageGalleryPic", item?.imageGalleryPic);
      rest.setValue("imageCoverPic", item?.imageCoverPic);
      rest.setValue("imageExtraPic", item?.imageExtraPic);

      // Category foreign key
      rest.setValue(
        "categoryIds",
        item?.categoryIds?.map(({ _id, title }: any) =>
          getLabelValuePair(_id, title)
        )
      );

      // Draft editors
      rest.setValue("overview", item?.overview);
      rest.setValue("description", item?.description);

      // Enum types
      rest.setValue("accommodation", item?.accommodation);
      rest.setValue("bestSeason", item?.bestSeason);
      rest.setValue("excludes", item?.excludes);
      rest.setValue("fitnessLevel", item?.fitnessLevel);
      rest.setValue("groupSize", item?.groupSize);
      rest.setValue("includes", item?.includes);
      rest.setValue("ridingSkill", item?.ridingSkill);
      rest.setValue("meals", item?.meals);
      rest.setValue("tourType", item?.tourType);
      rest.setValue("transportation", item?.transportation);

      // // Itineraries
      rest.setValue("itinerary", item?.itinerary);
    }
  }, [isOpen, rest.setValue]);

  // Handle if its trekking type
  const hasTrekking = formData?.tourType?.some(
    (item: OptionSchema) => item?.value === "Trekking"
  );

  // Set itineraries here at first
  useEffect(() => {
    setItineraries(
      item?.itinerary?.map((value: string) => ({
        label: generateUniqueId(),
        value,
      }))
    );
  }, [item?.itinerary?.length]);

  // Close the form on default load
  useEffect(() => {
    setForm({ formData: {}, isOpen: false, type });
  }, []);

  return (
    <comp.FormPopup {...formProps}>
      <div className="w-full">
        <comp.StickyHeaderSection {...stickyHeaderProps} />
        <div className="pt-2 pb-5 px-6 grid grid-cols-12 gap-7">
          {/* First section */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
            <comp.ColoredDivSection title="Common" status="secondary">
              <comp.ControllerInput
                {...f.title({ control })}
                {...getInputErr(errors, "title")}
                {...rest}
                value={formData?.title ?? item?.title}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "title", type)
                }
              />

              <comp.ControllerInput
                {...f.draftEditorInput({
                  control,
                  name: "description",
                  label: "Description",
                })}
                {...getInputErr(errors, "description")}
                {...rest}
                onChange={(e: any) =>
                  handleFormChange(e, "description", type, "react-select")
                }
                value={{ ...item?.description, entityMap: {} }}
              />
            </comp.ColoredDivSection>

            <comp.ColoredDivSection
              title="Extra trip details"
              status="secondary"
            >
              <comp.ControllerInput
                {...f.draftEditorInput({
                  control,
                  name: "overview",
                  label: "Overview",
                })}
                {...getInputErr(errors, "overview")}
                {...rest}
                onChange={(e: any) =>
                  handleFormChange(e, "overview", type, "react-select")
                }
                value={{ ...item?.overview, entityMap: {} }}
              />

              <comp.ControllerInput
                ref={refs["accommodation"] ?? undefined}
                {...f.selectInputOption({
                  control,
                  label: toTitleCase("accommodation"),
                  name: "accommodation",
                  options: getSubCategoryOption("accommodation"),
                })}
                isMulti={isMultiEnum("accommodation")}
                {...getInputErr(errors, item)}
                {...rest}
                value={
                  formData["accommodation"] ??
                  (isMultiEnum("accommodation")
                    ? item?.["accommodation"]?.map((innerItem: any) =>
                        getLabelValuePair(innerItem)
                      )
                    : getLabelValuePair(item?.["accommodation"]))
                }
                onChange={(e: any) =>
                  handleFormChange(e, "accommodation", type, "react-select")
                }
              />
            </comp.ColoredDivSection>

            <comp.ColoredDivSection
              title="Itinerary section"
              status="secondary"
            >
              <div className="col-span-12 w-full grid gap-5">
                <div className="flex justify-between items-center">
                  {/* <label htmlFor="itinerary">
                  <comp.CustomTypography
                    variant="h6"
                    className="text-blue-gray-700"
                  >
                    Itinerary Section
                  </comp.CustomTypography>
                </label> */}
                  <comp.CustomButton
                    onClick={() =>
                      setItineraries((prev: any) => [
                        ...prev,
                        { label: generateUniqueId(), value: "" },
                      ])
                    }
                    extendCss="text-[12px] px-5"
                  >
                    Add more
                  </comp.CustomButton>
                </div>
                <div className="grid gap-3">
                  {itineraries?.map(
                    ({ label, value }: OptionSchema, idx: number) => (
                      <div
                        key={idx}
                        className="w-full flex justify-between items-center gap-3"
                      >
                        <div className="basis-11/12">
                          {/* <comp.ControllerInput */}
                          <comp.TextInput
                            {...f.title({
                              control,
                              name: `day_${idx + 1}`,
                              label: `Day ${idx + 1}`,
                              placeholder: "Some description",
                            })}
                            //  { ...getInputErr(errors, `day_${idx + 1}`)}
                            value={value ?? item?.itinerary[idx]}
                            onChange={(e: any) =>
                              setItineraries((prev: OptionSchema[]) =>
                                prev?.map((item: OptionSchema) =>
                                  label === item?.label
                                    ? { ...item, value: e.target.value }
                                    : item
                                )
                              )
                            }
                            {...rest}
                          />
                        </div>
                        <div className="remove-itinerary-section">
                          <comp.CustomButton
                            color="bg-red-400 hover:bg-red-800 mb-1"
                            onClick={() =>
                              setItineraries((prev: OptionSchema[]) =>
                                prev.filter(
                                  ({ label: id }: OptionSchema) => label !== id
                                )
                              )
                            }
                          >
                            <IoCloseOutline className="text-white font-extrabold text-[24px]" />
                          </comp.CustomButton>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </comp.ColoredDivSection>

            <comp.ColoredDivSection
              title="Tools / Necessities"
              status="secondary"
            >
              <comp.ControllerInput
                ref={refs["groupSize"] ?? undefined}
                {...f.selectInputOption({
                  control,
                  label: toTitleCase("groupSize"),
                  name: "groupSize",
                  options: getSubCategoryOption("groupSize"),
                })}
                isMulti={isMultiEnum("groupSize")}
                {...getInputErr(errors, item)}
                {...rest}
                value={
                  formData["groupSize"] ??
                  (isMultiEnum("groupSize")
                    ? item?.["groupSize"]?.map((innerItem: any) =>
                        getLabelValuePair(innerItem)
                      )
                    : getLabelValuePair(item?.["groupSize"]))
                }
                onChange={(e: any) =>
                  handleFormChange(e, "groupSize", type, "react-select")
                }
              />

              <comp.ControllerInput
                ref={refs["meals"] ?? undefined}
                {...f.selectInputOption({
                  control,
                  label: toTitleCase("meals"),
                  name: "meals",
                  options: getSubCategoryOption("meals"),
                })}
                isMulti={isMultiEnum("meals")}
                {...getInputErr(errors, item)}
                {...rest}
                value={
                  formData["meals"] ??
                  (isMultiEnum("meals")
                    ? item?.["meals"]?.map((innerItem: any) =>
                        getLabelValuePair(innerItem)
                      )
                    : getLabelValuePair(item?.["meals"]))
                }
                onChange={(e: any) =>
                  handleFormChange(e, "meals", type, "react-select")
                }
              />

              <comp.ControllerInput
                ref={refs["transportation"] ?? undefined}
                {...f.selectInputOption({
                  control,
                  label: toTitleCase("transportation"),
                  name: "transportation",
                  options: getSubCategoryOption("transportation"),
                })}
                isMulti={isMultiEnum("transportation")}
                {...getInputErr(errors, item)}
                {...rest}
                value={
                  formData["transportation"] ??
                  (isMultiEnum("transportation")
                    ? item?.["transportation"]?.map((innerItem: any) =>
                        getLabelValuePair(innerItem)
                      )
                    : getLabelValuePair(item?.["transportation"]))
                }
                onChange={(e: any) =>
                  handleFormChange(e, "transportation", type, "react-select")
                }
              />

              <comp.ControllerInput
                ref={refs["bestSeason"] ?? undefined}
                {...f.selectInputOption({
                  control,
                  label: toTitleCase("bestSeason"),
                  name: "bestSeason",
                  options: getSubCategoryOption("bestSeason"),
                })}
                isMulti={isMultiEnum("bestSeason")}
                {...getInputErr(errors, item)}
                {...rest}
                value={
                  formData["bestSeason"] ??
                  (isMultiEnum("bestSeason")
                    ? item?.["bestSeason"]?.map((innerItem: any) =>
                        getLabelValuePair(innerItem)
                      )
                    : getLabelValuePair(item?.["bestSeason"]))
                }
                onChange={(e: any) =>
                  handleFormChange(e, "bestSeason", type, "react-select")
                }
              />
              {!hasTrekking && (
                <>
                  <comp.ControllerInput
                    ref={refs["ridingSkill"] ?? undefined}
                    {...f.selectInputOption({
                      control,
                      label: toTitleCase("ridingSkill"),
                      name: "ridingSkill",
                      options: getSubCategoryOption("ridingSkill"),
                    })}
                    isMulti={isMultiEnum("ridingSkill")}
                    {...getInputErr(errors, item)}
                    {...rest}
                    value={
                      formData["ridingSkill"] ??
                      (isMultiEnum("ridingSkill")
                        ? item?.["ridingSkill"]?.map((innerItem: any) =>
                            getLabelValuePair(innerItem)
                          )
                        : getLabelValuePair(item?.["ridingSkill"]))
                    }
                    onChange={(e: any) =>
                      handleFormChange(e, "ridingSkill", type, "react-select")
                    }
                  />
                  <comp.ControllerInput
                    ref={refs["fitnessLevel"] ?? undefined}
                    {...f.selectInputOption({
                      control,
                      label: toTitleCase("fitnessLevel"),
                      name: "fitnessLevel",
                      options: getSubCategoryOption("fitnessLevel"),
                    })}
                    isMulti={isMultiEnum("fitnessLevel")}
                    {...getInputErr(errors, item)}
                    {...rest}
                    value={
                      formData["fitnessLevel"] ??
                      (isMultiEnum("fitnessLevel")
                        ? item?.["fitnessLevel"]?.map((innerItem: any) =>
                            getLabelValuePair(innerItem)
                          )
                        : getLabelValuePair(item?.["fitnessLevel"]))
                    }
                    onChange={(e: any) =>
                      handleFormChange(e, "fitnessLevel", type, "react-select")
                    }
                  />
                </>
              )}
            </comp.ColoredDivSection>
          </div>

          {/* Second section */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <comp.ColoredDivSection title="Trip details" status="secondary">
              <comp.ControllerInput
                {...f.selectInputOption({
                  control,
                  label: "Categories",
                  name: "categoryIds",
                  options: getAllData?.data?.map((item: any) => ({
                    label: item?.title,
                    value: item?._id,
                  })),
                })}
                {...getInputErr(errors, "categoryIds")}
                {...rest}
                value={
                  formData?.categoryIds ??
                  item?.categoryIds?.map((innerItem: any) =>
                    getLabelValuePair(innerItem?._id, innerItem?.title)
                  )
                }
                onChange={(e: any) =>
                  handleFormChange(e, "categoryIds", type, "react-select")
                }
                isMulti
              />
              <comp.ControllerInput
                {...f.title({
                  control,
                  name: "destination",
                  label: "Destination",
                })}
                {...getInputErr(errors, "destination")}
                {...rest}
                value={formData?.destination ?? item?.destination}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "destination", type)
                }
              />
              <comp.ControllerInput
                {...f.date({
                  control,
                  name: "departureFrom",
                  label: "Departure From",
                })}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
                {...getInputErr(errors, "departureFrom")}
                {...rest}
                value={formData?.departureFrom ?? item?.departureFrom ?? ""}
                onChange={(e: InputOnChangeSchema) => {
                  handleFormChange(e, "departureFrom", type, "react-select");
                }}
              />
              <comp.ControllerInput
                {...rest}
                {...f.title({
                  control,
                  name: "numberOfDays",
                  label: "Number of days",
                })}
                {...getInputErr(errors, "numberOfDays")}
                {...rest}
                value={formData?.numberOfDays ?? item?.numberOfDays}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "numberOfDays", type)
                }
              />

              <comp.ControllerInput
                ref={refs["tourType"] ?? undefined}
                {...f.selectInputOption({
                  control,
                  label: toTitleCase("tourType"),
                  name: "tourType",
                  options: getSubCategoryOption("tourType"),
                })}
                isMulti={isMultiEnum("tourType")}
                {...getInputErr(errors, item)}
                {...rest}
                value={
                  formData["tourType"] ??
                  (isMultiEnum("tourType")
                    ? item?.["tourType"]?.map((innerItem: any) =>
                        getLabelValuePair(innerItem)
                      )
                    : getLabelValuePair(item?.["tourType"]))
                }
                onChange={(e: any) =>
                  handleFormChange(e, "tourType", type, "react-select")
                }
              />
            </comp.ColoredDivSection>

            <comp.ColoredDivSection title="More details" status="secondary">
              <comp.ControllerInput
                {...f.title({
                  control,
                  name: "priceOriginal",
                  label: "Original price",
                })}
                {...getInputErr(errors, "priceOriginal")}
                {...rest}
                value={formData?.priceOriginal ?? item?.priceOriginal}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "priceOriginal", type)
                }
              />
              {/* <comp.ControllerInput
                {...f.title({
                  control,
                  name: "trekkingGuide",
                  label: "Trekking Guide",
                })}
                {...getInputErr(errors, "trekkingGuide")}
                {...rest}
                value={formData?.trekkingGuide ?? item?.trekkingGuide}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "trekkingGuide", type)
                }
              /> */}
              <comp.ControllerInput
                {...f.title({
                  control,
                  name: "caption",
                  label: "Caption",
                })}
                {...getInputErr(errors, "caption")}
                {...rest}
                value={formData?.caption ?? item?.caption}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "caption", type)
                }
              />
              <comp.ControllerInput
                ref={refs["includes"] ?? undefined}
                {...f.selectInputOption({
                  control,
                  label: toTitleCase("includes"),
                  name: "includes",
                  options: getSubCategoryOption("includes"),
                })}
                isMulti={isMultiEnum("includes")}
                {...getInputErr(errors, item)}
                {...rest}
                value={
                  formData["includes"] ??
                  (isMultiEnum("includes")
                    ? item?.["includes"]?.map((innerItem: any) =>
                        getLabelValuePair(innerItem)
                      )
                    : getLabelValuePair(item?.["includes"]))
                }
                onChange={(e: any) =>
                  handleFormChange(e, "includes", type, "react-select")
                }
              />
              <comp.ControllerInput
                ref={refs["excludes"] ?? undefined}
                {...f.selectInputOption({
                  control,
                  label: toTitleCase("excludes"),
                  name: "excludes",
                  options: getSubCategoryOption("excludes"),
                })}
                isMulti={isMultiEnum("excludes")}
                {...getInputErr(errors, item)}
                {...rest}
                value={
                  formData["excludes"] ??
                  (isMultiEnum("excludes")
                    ? item?.["excludes"]?.map((innerItem: any) =>
                        getLabelValuePair(innerItem)
                      )
                    : getLabelValuePair(item?.["excludes"]))
                }
                onChange={(e: any) =>
                  handleFormChange(e, "excludes", type, "react-select")
                }
              />
            </comp.ColoredDivSection>

            <comp.ColoredDivSection title="Images" status="secondary">
              <comp.ControllerInput
                {...rest}
                {...f.imageInput({
                  name: "imageCoverPic",
                  label: "Cover images",
                  control,
                })}
                isMultiple
                imageList={<comp.ImageSlider imageSrc={item?.imageCoverPic} />}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "imageCoverPic", type, "image")
                }
                {...getInputErr(errors, "imageCoverPic")}
                {...rest}
              />
              <comp.ControllerInput
                {...rest}
                {...f.imageInput({
                  name: "imageThumbnailPic",
                  label: "Thumbnail image",
                  control,
                })}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "imageThumbnailPic", type, "image")
                }
                singleImage={
                  <comp.ThumbnailImage src={item?.imageThumbnailPic} />
                }
                {...getInputErr(errors, "imageThumbnailPic")}
                {...rest}
              />
              <comp.ControllerInput
                {...f.imageInput({
                  name: "imageGalleryPic",
                  label: "Gallery image",
                  control,
                })}
                imageList={
                  <comp.ImageSlider imageSrc={item?.imageGalleryPic} />
                }
                isMultiple
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "imageGalleryPic", type, "image")
                }
                {...getInputErr(errors, "imageGalleryPic")}
                {...rest}
              />
              <comp.ControllerInput
                {...f.imageInput({
                  name: "imageExtraPic",
                  label: "Extra images",
                  control,
                })}
                singleImage={<comp.ThumbnailImage src={item?.imageExtraPic} />}
                onChange={(e: InputOnChangeSchema) =>
                  handleFormChange(e, "imageExtraPic", type, "image")
                }
                {...getInputErr(errors, "imageExtraPic")}
                {...rest}
              />
            </comp.ColoredDivSection>
          </div>

          {/* Enum types */}
          {/* {Object.keys(subcategoryEnums)?.map(
          (selectItem: string, idx: number) => (
            <comp.ControllerInput
              key={idx}
              ref={refs[selectItem as SubcategoryEnumSchema] ?? undefined}
              {...f.selectInputOption({
                control,
                label: toTitleCase(selectItem),
                name: selectItem,
                options: getSubCategoryOption(
                  selectItem as SubcategoryEnumSchema
                ),
              })}
              isMulti={isMultiEnum(selectItem as SubcategoryEnumSchema)}
              {...getInputErr(errors, item)}
              {...rest}
              value={
                formData[selectItem] ??
                (isMultiEnum(selectItem as SubcategoryEnumSchema)
                  ? item?.[selectItem]?.map((innerItem: any) =>
                      getLabelValuePair(innerItem)
                    )
                  : getLabelValuePair(item?.[selectItem]))
              }
              onChange={(e: any) =>
                handleFormChange(e, selectItem, type, "react-select")
              }
            />
          )
        )} */}
        </div>
      </div>
    </comp.FormPopup>
  );
};

export default UpdateSubcategoryDraft;
