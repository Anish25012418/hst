// Import - default
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";

// Import - components
import * as comp from "@/helpers/components";

// Import - hooks
import { ToastContext } from "@/helpers/contexts";
import * as stores from "@/helpers/stores";
import * as hooks from "@/helpers/hooks";

// Import - utils
import * as f from "@/utils/constants/form-constants";
import * as t from "@/utils/constants/toast-constants";
import { getInputErr, transformToFormData } from "@/utils/methods/form-methods";
import { CRUD_ROUTES, SUB_CATEGORY_ROUTES } from "@/utils/data/api/api-routes";
import {
  subCategoryMultiEnums,
  subcategoryEnums,
} from "@/utils/constants/backend/model-constants";
import { getApiErrorMsg, getApiSuccessMsg } from "@/utils/methods/api-methods";
import {
  fetchSubcategoryDraftData,
  getSubCategoryOption,
} from "@/utils/methods/app-methods";
import { generateUniqueId, toTitleCase } from "@/utils/methods/string-methods";
import {
  InputOnChangeSchema,
  OptionSchema,
} from "@/utils/schemas/GlobalSchema";
import { SubcategoryValidation } from "@/utils/validations/formValidation";

// Main
const PostSubcategory = () => {
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

  // Context
  const { setToast } = useContext(ToastContext);

  // States
  const [selectedDates, setSelectedDates] = useState([]);
  // const [itineraryCount, setItineraryCount] = useState<number[]>([]);
  const [itineraries, setItineraries] = useState<OptionSchema[]>([
    { label: generateUniqueId(), value: "" },
    { label: generateUniqueId(), value: "" },
    { label: generateUniqueId(), value: "" },
  ]);

  // Stores
  // const categoryApi = useSubcategoryApi();
  const subcategoryStore = stores.useSubcategoryStore();
  const {
    getAllData,
    subgetAllRefetch,
    subgetAllIsFetching,
    // subDraftGetAllData,
    subDraftGetAllRefetch,
    // subDraftGetAllIsFetching,
  } = stores.useSubcategoryApi();

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm<any>({
    resolver: yupResolver(SubcategoryValidation),
    mode: "onChange",
    defaultValues: {
      accommodation: "",
      departureFrom: undefined,
    },
  });
  const isOnline = hooks.useInternetOnline();
  const { isLessThan600 } = hooks.useScreenSize();

  // Variables
  const type = "post";
  const { forms, handleFormChange, setForm } = subcategoryStore;
  const { isOpen, formData, isLoading } = forms.post ?? {};
  const itinerary = itineraries?.map(({ value }: any) => value);

  // Mutation
  const m = {
    method: type,
    route: SUB_CATEGORY_ROUTES({}).post,
    onSuccess: (response: any) => {
      subgetAllRefetch();
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      setForm({ type, isLoading: false, isOpen: false });
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

  // console.log("formData", formData);

  // Draft Mutation
  const draftMutationParams = {
    method: type,
    route: CRUD_ROUTES({ model: "subcategory_draft" }).post,
    onSuccess: (response: any) => {
      subDraftGetAllRefetch();
      setToast(t.TOAST_SUCCESS(getApiSuccessMsg(response)));
      setForm({ type, isLoading: false, isOpen: false });
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

  // Action when the form is submitted
  const onSubmit = (data: any) => {
    // If there is no internet, throw offline internet error
    if (!isOnline) {
      setToast(t.NO_INTERNET_ERROR);
      return;
    }

    // Validation for itineraries
    if (itineraries?.length < 1) {
      setToast(t.EMPTY_FIELD_WARNING("itineraries"));
      return;
    }

    // Modify the data that which the backend accepts
    const enumKeys = Object.keys(subcategoryEnums) ?? [];
    const formDataTemp = transformToFormData(data, enumKeys);
    const formData = {
      ...formDataTemp,
      itinerary,
    };

    // Api part
    setForm({ type, isLoading: true });
    mutation.mutate(formData);
    // mutation.mutate(JSON.stringify(formData));
  };

  // Handle if its trekking type
  const hasTrekking = formData?.tourType?.some(
    (item: OptionSchema) => item?.value === "Trekking"
  );

  // Custom form popup props
  const formProps = {
    handleClose: () => {
      setForm({ formData: {}, isOpen: false, type });
    },
    heading: "Add subcategory",
    isLoading,
    isOpen,
    onSubmit: handleSubmit(onSubmit),
    submitTitle: "Add",
    type: "large",
  };

  // Custom props for sticky header
  const stickyHeaderProps = {
    rest,
    title: isLessThan600 ? "Add" : "Add Subcategory",
    isLoading,
    type,
    setForm,
    isDraftEnabled: true,
    handleFormDraft: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      rest?.reset();
      const { formData: fd } = fetchSubcategoryDraftData(
        formData,
        {},
        itinerary
      );
      draftMutation.mutate(fd);
    },
  };

  // Close the form on default load
  useEffect(() => {
    setForm({ formData: {}, isOpen: false, type });
  }, []);

  return (
    <comp.OuterLayerForm isLoading={subgetAllIsFetching}>
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
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "description", type, "react-select")
                  }
                />
              </comp.ColoredDivSection>

              {/* {Object.keys(subcategoryEnums)?.map((item: string, idx: number) => (
              <comp.ControllerInput
                key={idx}
                ref={refs.enumType}
                {...f.selectInputOption({
                  control,
                  label: toTitleCase(item),
                  name: item,
                  options: getSubCategoryOption(item as SubcategoryEnumSchema),
                })}
                isMulti={subCategoryMultiEnums?.includes(
                  item as SubcategoryEnumSchema
                )}
                {...getInputErr(errors, item)}
                {...rest}
              />
            ))} */}

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
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "overview", type, "react-select")
                  }
                />

                <comp.ControllerInput
                  ref={refs.accommodation}
                  {...f.selectInputOption({
                    control,
                    label: toTitleCase("accommodation"),
                    name: "accommodation",
                    options: getSubCategoryOption("accommodation"),
                  })}
                  isMulti={subCategoryMultiEnums?.includes("accommodation")}
                  {...getInputErr(errors, "accommodation")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
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
                      Add itinerary
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
                              value={value}
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
                                    ({ label: id }: OptionSchema) =>
                                      label !== id
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
                  ref={refs.groupSize}
                  {...f.selectInputOption({
                    control,
                    label: toTitleCase("groupSize"),
                    name: "groupSize",
                    options: getSubCategoryOption("groupSize"),
                  })}
                  isMulti={subCategoryMultiEnums?.includes("groupSize")}
                  {...getInputErr(errors, "groupSize")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "groupSize", type, "react-select")
                  }
                />
                {!hasTrekking && (
                  <>
                    <comp.ControllerInput
                      ref={refs.ridingSkill}
                      {...f.selectInputOption({
                        control,
                        label: toTitleCase("ridingSkill"),
                        name: "ridingSkill",
                        options: getSubCategoryOption("ridingSkill"),
                      })}
                      isMulti={subCategoryMultiEnums?.includes("ridingSkill")}
                      {...getInputErr(errors, "ridingSkill")}
                      {...rest}
                      onChange={(e: InputOnChangeSchema) =>
                        handleFormChange(e, "ridingSkill", type, "react-select")
                      }
                    />
                    <comp.ControllerInput
                      ref={refs.fitnessLevel}
                      {...f.selectInputOption({
                        control,
                        label: toTitleCase("fitnessLevel"),
                        name: "fitnessLevel",
                        options: getSubCategoryOption("fitnessLevel"),
                      })}
                      isMulti={subCategoryMultiEnums?.includes("fitnessLevel")}
                      {...getInputErr(errors, "fitnessLevel")}
                      {...rest}
                      onChange={(e: InputOnChangeSchema) =>
                        handleFormChange(
                          e,
                          "fitnessLevel",
                          type,
                          "react-select"
                        )
                      }
                    />
                  </>
                )}

                <comp.ControllerInput
                  ref={refs.meals}
                  {...f.selectInputOption({
                    control,
                    label: toTitleCase("meals"),
                    name: "meals",
                    options: getSubCategoryOption("meals"),
                  })}
                  isMulti={subCategoryMultiEnums?.includes("meals")}
                  {...getInputErr(errors, "meals")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "meals", type, "react-select")
                  }
                />
                <comp.ControllerInput
                  ref={refs.transportation}
                  {...f.selectInputOption({
                    control,
                    label: toTitleCase("transportation"),
                    name: "transportation",
                    options: getSubCategoryOption("transportation"),
                  })}
                  isMulti={subCategoryMultiEnums?.includes("transportation")}
                  {...getInputErr(errors, "transportation")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "transportation", type, "react-select")
                  }
                />
                <comp.ControllerInput
                  ref={refs.bestSeason}
                  {...f.selectInputOption({
                    control,
                    label: toTitleCase("bestSeason"),
                    name: "bestSeason",
                    options: getSubCategoryOption("bestSeason"),
                  })}
                  isMulti={subCategoryMultiEnums?.includes("bestSeason")}
                  {...getInputErr(errors, "bestSeason")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "bestSeason", type, "react-select")
                  }
                />
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
                  isMulti
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "categoryIds", type, "react-select")
                  }
                />
                <comp.ControllerInput
                  {...f.title({
                    control,
                    name: "destination",
                    label: "Destination",
                  })}
                  {...getInputErr(errors, "destination")}
                  {...rest}
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
                  value={selectedDates}
                  setSelectedDates={setSelectedDates}
                  {...getInputErr(errors, "departureFrom")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) => {
                    // console.log("e", e);
                    handleFormChange(e, "departureFrom", type, "react-select");
                  }}
                />
                <comp.ControllerInput
                  {...rest}
                  {...f.title({
                    control,
                    name: "numberOfDays",
                    label: "Number of days",
                    type: "number",
                  })}
                  {...getInputErr(errors, "numberOfDays")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "numberOfDays", type)
                  }
                />
                <comp.ControllerInput
                  ref={refs.tourType}
                  {...f.selectInputOption({
                    control,
                    label: toTitleCase("tourType"),
                    name: "tourType",
                    options: getSubCategoryOption("tourType"),
                  })}
                  isMulti={subCategoryMultiEnums?.includes("tourType")}
                  {...getInputErr(errors, "tourType")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
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
                    type: "number",
                  })}
                  {...getInputErr(errors, "priceOriginal")}
                  {...rest}
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
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "caption", type)
                  }
                />
                <comp.ControllerInput
                  ref={refs.includes}
                  {...f.selectInputOption({
                    control,
                    label: toTitleCase("includes"),
                    name: "includes",
                    options: getSubCategoryOption("includes"),
                  })}
                  isMulti={subCategoryMultiEnums?.includes("includes")}
                  {...getInputErr(errors, "includes")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "includes", type, "react-select")
                  }
                />
                <comp.ControllerInput
                  ref={refs.excludes}
                  {...f.selectInputOption({
                    control,
                    label: toTitleCase("excludes"),
                    name: "excludes",
                    options: getSubCategoryOption("excludes"),
                  })}
                  isMulti={subCategoryMultiEnums?.includes("excludes")}
                  {...getInputErr(errors, "excludes")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "excludes", type, "react-select")
                  }
                />
              </comp.ColoredDivSection>

              <comp.ColoredDivSection title="Images" status="secondary">
                <comp.ControllerInput
                  {...f.imageInput({
                    name: "imageGalleryPic",
                    label: "Gallery image",
                    control,
                  })}
                  isMultiple
                  {...getInputErr(errors, "imageGalleryPic")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "imageGalleryPic", type, "image")
                  }
                />
                {/*<comp.ControllerInput*/}
                {/*  {...f.imageInput({*/}
                {/*    name: "imageExtraPic",*/}
                {/*    label: "Extra image",*/}
                {/*    control,*/}
                {/*  })}*/}
                {/*  {...getInputErr(errors, "imageExtraPic")}*/}
                {/*  {...rest}*/}
                {/*  onChange={(e: InputOnChangeSchema) =>*/}
                {/*    handleFormChange(e, "imageExtraPic", type, "image")*/}
                {/*  }*/}
                {/*/>*/}
                <comp.ControllerInput
                  {...rest}
                  {...f.imageInput({
                    name: "imageCoverPic",
                    label: "Cover images",
                    control,
                  })}
                  isMultiple
                  {...getInputErr(errors, "imageCoverPic")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "imageCoverPic", type, "image")
                  }
                />
                <comp.ControllerInput
                  {...rest}
                  {...f.imageInput({
                    name: "imageThumbnailPic",
                    label: "Thumbnail image",
                    control,
                  })}
                  {...getInputErr(errors, "imageThumbnailPic")}
                  {...rest}
                  onChange={(e: InputOnChangeSchema) =>
                    handleFormChange(e, "imageThumbnailPic", type, "image")
                  }
                />
              </comp.ColoredDivSection>
            </div>
          </div>
        </div>
      </comp.FormPopup>
    </comp.OuterLayerForm>
  );
};

export default PostSubcategory;
