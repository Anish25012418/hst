// Import - utils
import { getWebUrl } from "@/utils/methods/app-methods";
import { resetReactHookFormValues } from "@/utils/methods/form-methods";
import { changeFileNameForImage } from "@/utils/methods/image-methods";
import { isNullObject, safeParseJSON } from "@/utils/methods/object-methods";

// Variables
const textFields = ["title", "description"];
// const editorFields = ["rental_description"];
// First bike gallery
const tripsField1 = ["trips_title_1", "trips_description_1"];
// Second bike gallery
const tripsField2 = ["trips_title_2", "trips_description_2"];
const tripsFields = [...tripsField1, ...tripsField2];
const inputFields = [...textFields, ...tripsFields];

// Convert Why-Us Page form data
export const getHSTPokharaPageFormData = (
  data: any,
  selectedItem: any = {}
) => {
  // Declare a variable to store result
  const result: any = {
    title: data.title ?? selectedItem?.title,
    description: data.description ?? selectedItem?.description,
    trips: [],
    // gallery: data["gallery"] ?? selectedItem?.gallery,
    gallery: data?.["gallery"]?.every((item: any) => typeof item === "string")
      ? selectedItem?.gallery
      : changeFileNameForImage(data["gallery"], selectedItem?.gallery),
    gallery_image_number:
      data?.gallery_image_number?.value ?? selectedItem?.gallery_image_number,
  };

  // Process founders
  for (let i = 0; i <= 1; i++) {
    const isTripExist = Array.isArray(selectedItem?.trips);
    result.trips.push({
      title:
        data[`trips_title_${i + 1}`] ??
        (isTripExist ? selectedItem.trips[i]?.title : ""),
      description:
        data[`trips_description_${i + 1}`] ??
        (isTripExist ? selectedItem.trips[i]?.description : ""),
    });
  }
  return result;
};

// Convert home page item data
export const getHSTPokharaPageItemData = (params: any) => {
  // Destructuring params
  const { store, rest, watch, isLessThan600, imgHidden, setImgHidden } = params;
  const { forms, handleFormChange, setForm } = store;
  const { api: apiData, formData, isLoading } = forms.get ?? {};
  const {
    hstPokharaPage = {},
    _id: id,
    imageCoverPic,
  } = apiData?.data?.[0] || {};

  // Initial setup
  const type = "get";
  const page = {
    name: "hstPokharaPage",
    query: "hst_pokhara",
  };
  let item: any = safeParseJSON(hstPokharaPage);
  const pageLength = Object?.keys(item)?.length;

  // Reset form values
  const resetInitialFormValues = () => {
    resetReactHookFormValues(textFields, rest?.setValue, item);
    rest?.setValue("gallery", item?.gallery);
  };

  // Check if form actions should be disabled
  const images = [...(watch("gallery") ?? [])];
  const isImageUpdated = images?.some((image) => typeof image === "object");
  const isFormActionDisabled = isNullObject(formData) && !isImageUpdated;

  // Custom properties for various components
  const pointDivProps = {
    status: "secondary",
    extendCss: "!border-[1px] !border-blue-400 text-sm",
  };
  const innerPointProps = {
    color: "bg-gray-100",
    extendCss: "!border-[1px] !border-blue-400 text-sm",
  };

  // Clear form values
  const clearFormValues = () => {
    setImgHidden(true);
    resetInitialFormValues();
    setForm({ type, isLoading: false, isOpen: false });
  };

  // Custom properties for the sticky header
  const stickyHeaderProps = {
    rest,
    title: isLessThan600 ? "Home" : "Home Page",
    bg: "bg-brand-yellow-1000",
    submitTitle: "Update",
    cancelTitle: "Reset",
    isLoading,
    isSubmitDisabled: isFormActionDisabled,
    isCancelDisabled: isFormActionDisabled,
    type,
    setForm,
    handleFormCancel: clearFormValues,
    liveUrl: getWebUrl("/hst-pokhara"),
  };

  // Return the resulting object
  return {
    pointDivProps,
    innerPointProps,

    // Other needed data
    id,
    hstPokharaPage,
    pageLength,
    imageCoverPic,
    item,
    clearFormValues,
    isFormActionDisabled,
    handleFormChange,
    forms,
    setForm,
    isLoading,
    formData,
    type,
    page,
    stickyHeaderProps,
    imgHidden,

    // ALl the input fields
    inputFields,
    textFields,
    // editorFields,
    tripsField1,
    tripsField2,
    tripsFields,
    // thumbnailImageInputProps,
  };
};
