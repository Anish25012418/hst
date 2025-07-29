// Import - utils
import { getWebUrl } from "@/utils/methods/app-methods";
import { isNullObject, safeParseJSON } from "@/utils/methods/object-methods";
import {
  ContactInfoSchema,
  ContactPageSchema,
} from "@/utils/schemas/PageSchema";

// Variables
const inputFields = [
  "send_message",
  "get_in_touch",
  "caption",
  "brand_name",
  "inquiry",
  "talk_to_an_expert",
  "our_business_units",
];
const inputBranches = ["main_branch", "kathmandu_branch", "pokhara_branch"];

// Get all the required inputs from contact page
export const getContactInputDetails = (data: any) => {
  // Destructuring params
  const {
    send_message,
    get_in_touch,
    caption,
    brand_name,
    inquiry,
    talk_to_an_expert,
    our_business_units,
    ...rest
  } = data;

  // Action to get the branch info
  const getBranchInfo = (branch_name: string): ContactInfoSchema => ({
    phone: rest?.[`${branch_name}_phone`],
    email: rest?.[`${branch_name}_email`],
    location: rest?.[`${branch_name}_location`],
  });

  // Branches
  const main_branch = getBranchInfo("main_branch");
  const kathmandu_branch = getBranchInfo("kathmandu_branch");
  const pokhara_branch = getBranchInfo("pokhara_branch");

  // Prettify result to meet the required needs
  const result = { ...data, main_branch, kathmandu_branch, pokhara_branch };
  return result;
};

// Convert contact page form data
export const getContactPageFormData = (data: any, selectedItem: any) => {
  // Variables
  const {
    send_message,
    get_in_touch,
    caption,
    brand_name,
    inquiry,
    talk_to_an_expert,
    our_business_units,

    // Branches
    main_branch,
    kathmandu_branch,
    pokhara_branch,
  } = getContactInputDetails(data);

  // Prettify result to meet the required needs
  const result: ContactPageSchema = {
    send_message: send_message ?? selectedItem?.send_message,
    get_in_touch: get_in_touch ?? selectedItem?.get_in_touch,
    caption: caption ?? selectedItem?.caption,
    brand_name: brand_name ?? selectedItem?.brand_name,
    inquiry: inquiry ?? selectedItem?.inquiry,
    talk_to_an_expert: talk_to_an_expert ?? selectedItem?.talk_to_an_expert,
    our_business_units: our_business_units ?? selectedItem?.our_business_units,
    main_branch: !isNullObject(main_branch)
      ? main_branch
      : selectedItem?.main_branch,
    kathmandu_branch: !isNullObject(kathmandu_branch)
      ? kathmandu_branch
      : selectedItem?.kathmandu_branch,
    pokhara_branch: !isNullObject(pokhara_branch)
      ? pokhara_branch
      : selectedItem?.pokhara_branch,
  };

  return result;
};

// Convert contact page item data
export const getContactPageItemData = (params: any) => {
  // Destructuring params
  const { store, rest, isLessThan600, imgHidden, setImgHidden } = params;
  const { forms, handleFormChange, setForm } = store;
  const { api: apiData, formData, isLoading } = forms.get ?? {};
  const {
    contactPage = {},
    _id: id,
    imageGalleryPic,
  } = apiData?.data?.[0] || {};

  // Initial setup
  const type = "get";
  const page = {
    name: "contactPage",
    query: "contact",
  };
  let item: any = safeParseJSON(contactPage);
  const pageLength = Object?.keys(item)?.length;

  // Extracting section data

  // Reset form values
  const resetInitialFormValues = () => {
    // Action to set the multiple inputBranches values'
    const setBranchValues = (branchName: string, branchData: any) => {
      rest?.setValue(`${branchName}_phone`, branchData?.phone);
      rest?.setValue(`${branchName}_email`, branchData?.email);
      rest?.setValue(`${branchName}_location`, branchData?.location);
    };
    inputFields.forEach((field) => rest?.setValue(field, item?.[field]));
    inputBranches.forEach((branch) => setBranchValues(branch, item?.[branch]));
  };

  // Check if form actions should be disabled
  // const currentImages = watch("imageGalleryPic");
  // const areImagesSame =
  //   JSON.stringify(currentImages) === JSON.stringify(imageGalleryPic);
  const isFormActionDisabled = isNullObject(formData);

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
    title: isLessThan600 ? "Contact" : "Contact Page",
    bg: "bg-brand-yellow-1000",
    submitTitle: "Update",
    cancelTitle: "Reset",
    isLoading,
    isSubmitDisabled: isFormActionDisabled,
    isCancelDisabled: isFormActionDisabled,
    type,
    setForm,
    handleFormCancel: clearFormValues,
    liveUrl: getWebUrl("/contact"),
  };

  // Return the resulting object
  return {
    // Text data

    // Custom properties
    pointDivProps,
    innerPointProps,

    // Other needed data
    id,
    contactPage,
    pageLength,
    imageGalleryPic,
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
    inputBranches,
    // thumbnailImageInputProps,
  };
};
