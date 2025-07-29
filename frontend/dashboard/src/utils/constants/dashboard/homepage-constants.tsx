// Import - utils
import { getWebUrl } from "@/utils/methods/app-methods";
import { resetReactHookFormValues } from "@/utils/methods/form-methods";
import { isNullObject, safeParseJSON } from "@/utils/methods/object-methods";

// Variables
const inputFields = [
  "site_header",
  "site_description",
  "professional_guide_info",
  "flexibility_info",
  "local_and_authentic_info",
  "trail_experts_info",
  "category_header",
  "sub_category_header",
  "blogs_header",
  "testimonials_header",
  "footer_description",
];

// Convert home page item data
export const getHomePageItemData = (params: any) => {
  // Destructuring params
  const { store, rest, watch, isLessThan600, imgHidden, setImgHidden } = params;
  const { forms, handleFormChange, setForm } = store;
  const { api: apiData, formData, isLoading } = forms.get ?? {};
  const { homePage = {}, _id: id, imageCoverPic } = apiData?.data?.[0] || {};

  // Initial setup
  const type = "get";
  const page = {
    name: "homePage",
    query: "home",
  };
  let item: any = safeParseJSON(homePage);
  const pageLength = Object?.keys(item)?.length;

  // Reset form values
  const resetInitialFormValues = () => {
    resetReactHookFormValues(
      inputFields,
      rest?.setValue,
      item,
      ["imageCoverPic"],
      apiData
    );
    rest?.setValue("imageCoverPic", imageCoverPic);
  };

  // Check if form actions should be disabled
  const currentImages = watch("imageCoverPic");
  const areImagesSame =
    JSON.stringify(currentImages) === JSON.stringify(imageCoverPic);
  const isFormActionDisabled = isNullObject(formData) ? areImagesSame : false;

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
    liveUrl: getWebUrl("/"),
  };

  // Custom properties for the cover image input
  const coverImageInputProps = {
    isMultiple: true,
    imgHidden,
    setImgHidden,
    handleFirstLoad: clearFormValues,
  };

  // Return the resulting object
  return {
    pointDivProps,
    innerPointProps,

    // Other needed data
    id,
    homePage,
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
    inputFields,
    // thumbnailImageInputProps,
    coverImageInputProps,
  };
};
