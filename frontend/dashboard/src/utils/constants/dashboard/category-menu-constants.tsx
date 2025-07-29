// Import - utils
import {
  getLabelValuePair,
  isNullObject,
  safeParseJSON,
} from "@/utils/methods/object-methods";

// Variables
const inputFields = [
  ["title_1", "select_1"],
  ["title_2", "select_2"],
  ["title_3", "select_3"],
  ["title_4", "select_4"],
  ["title_5", "select_5"],
  ["title_6", "select_6"],
];

// Convert Category Menu page form data
export const getCategoryMenuPageFormData = (
  data: any,
  selectedItem: any,
  categoriesData: any
) => {
  // Variables
  const {
    title_1,
    title_2,
    title_3,
    title_4,
    title_5,
    title_6,
    select_1,
    select_2,
    select_3,
    select_4,
    select_5,
    select_6,
  } = data;

  // Actions to get title & selected item
  const getCommonSelect = (select: any, index: number) =>
    select?.map(({ value }: any) => value) ??
    selectedItem?.[index]?.categories?.map(({ id }: any) => id);
  const getSelectedTitle = (title: any, select: any, index: number) => {
    const temp = title || selectedItem?.[index]?.title;
    const tempSelect = getCommonSelect(select, index);
    const {
      _id,
      slug,
      title: name,
    } = categoriesData?.find(({ _id }: any) => _id === tempSelect?.[0]) ?? {};
    const result =
      tempSelect?.length === 1
        ? { slug, name, _id, isMulti: false }
        : {
            ...(typeof temp === "string" ? { name: temp } : temp),
            isMulti: tempSelect?.length > 1,
          };
    const modifiedResult = temp?.isMulti
      ? { name: result?.name, isMulti: result?.isMulti }
      : result;
    return modifiedResult;
  };
  const getSelectedItem = (select: any, index: number) => {
    const temp = getCommonSelect(select, index) || [];
    const result = temp?.length === 1 ? [] : temp;
    return result;
  };

  // Prettify result to meet the required needs
  const result: any = {
    menu_pattern: [
      {
        title: getSelectedTitle(title_1, select_1, 0),
        categoryIds: getSelectedItem(select_1, 0),
      },
      {
        title: getSelectedTitle(title_2, select_2, 1),
        categoryIds: getSelectedItem(select_2, 1),
      },
      {
        title: getSelectedTitle(title_3, select_3, 2),
        categoryIds: getSelectedItem(select_3, 2),
      },
      {
        title: getSelectedTitle(title_4, select_4, 3),
        categoryIds: getSelectedItem(select_4, 3),
      },
      {
        title: getSelectedTitle(title_5, select_5, 4),
        categoryIds: getSelectedItem(select_5, 4),
      },
      {
        title: getSelectedTitle(title_6, select_6, 5),
        categoryIds: getSelectedItem(select_6, 5),
      },
    ],
  };

  return result;
};

// export const getCategoryMenuPageFormData = (data: any, selectedItem: any) => {
//   console.log("selectedItem", selectedItem);
//   // Variables
//   const { titles, selects } = getTitlesSelects(data);

//   // Actual form data to be sent to the backend
//   const menuPattern = titles.map((title, index) => ({
//     title,
//     categoryIds:
//       selects[index]?.map(({ value }: any) => value) ||
//       selectedItem?.[index]?.categories?.map(({ id }: any) => id) ||
//       [],
//   }));

//   console.log("menuPattern", menuPattern);
//   return { menu_pattern: menuPattern };
// };

// Convert Category Menu page item data
export const getCategoryMenuPageItemData = (params: any) => {
  // Destructuring params
  const { store, rest, isLessThan600, imgHidden, setImgHidden } = params;
  const { forms, handleFormChange, setForm } = store;
  const { api: apiData, formData, isLoading } = forms.get ?? {};
  const { menu_pattern = {}, _id: id } = apiData?.data?.[0] || {};

  // Initial setup
  const type = "get";
  let item: any = safeParseJSON(menu_pattern);

  // Extracting section data

  // Reset form values
  const resetInitialFormValues = () => {
    // Action to set the multiple inputBranches values'
    // const setBranchValues = (branchName: string, branchData: any) => {
    //   rest?.setValue(`${branchName}_phone`, branchData?.phone);
    //   rest?.setValue(`${branchName}_email`, branchData?.email);
    //   rest?.setValue(`${branchName}_location`, branchData?.location);
    // };
    inputFields.forEach(([title, select]: string[], index: number) => {
      rest?.setValue(title, item?.[index]?.title);
      rest?.setValue(
        select,
        item?.[index]?.categories?.map(({ id, title }: any) =>
          getLabelValuePair(id, title)
        )
      );
    });
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
    title: isLessThan600 ? "Category Menu" : "Category Menu Page",
    bg: "bg-brand-yellow-1000",
    submitTitle: "Update",
    cancelTitle: "Reset",
    isLoading,
    isSubmitDisabled: isFormActionDisabled,
    isCancelDisabled: isFormActionDisabled,
    type,
    setForm,
    handleFormCancel: clearFormValues,
  };

  // Return the resulting object
  return {
    // Text data

    // Custom properties
    pointDivProps,
    innerPointProps,

    // Other needed data
    id,
    menu_pattern,
    item,
    clearFormValues,
    isFormActionDisabled,
    handleFormChange,
    forms,
    setForm,
    isLoading,
    formData,
    type,
    stickyHeaderProps,
    imgHidden,
    inputFields,
    // thumbnailImageInputProps,
  };
};
