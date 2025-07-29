// Import - utils
import { getWebUrl } from "@/utils/methods/app-methods";
import { resetReactHookFormValues } from "@/utils/methods/form-methods";
import { changeFileNameForImage } from "@/utils/methods/image-methods";
import { isNullObject, safeParseJSON } from "@/utils/methods/object-methods";
import { numberToWords } from "@/utils/methods/string-methods";

// Variables
const textFields = ["header", "subHeader", "description"];
// const editorFields = ["rental_description"];
const listField1 = ["list_image_1", "list_header_1", "list_description_1"];
const listField2 = ["list_image_2", "list_header_2", "list_description_2"];
const listField3 = ["list_image_3", "list_header_3", "list_description_3"];
const listField4 = ["list_image_4", "list_header_4", "list_description_4"];
const listField5 = ["list_image_5", "list_header_5", "list_description_5"];
const listField6 = ["list_image_6", "list_header_6", "list_description_6"];
const brandGalleryFields = ["list_image_8", "list_image_9", "list_image_10"];
const allListFields = {
  listField1,
  listField2,
  listField3,
  listField4,
  listField5,
  listField6,
};
const listFields = [
  ...listField1,
  ...listField2,
  ...listField1,
  ...listField3,
  ...listField4,
  ...listField5,
  ...listField6,
];
const inputFields = [...textFields, ...listFields];

// Convert Why-Us Page form data
export const getWorkshopPageFormData = (data: any, selectedItem: any = {}) => {
  // Declare a variable to store result
  const result: any = {
    header: data.header ?? selectedItem?.header,
    subHeader: data.subHeader ?? selectedItem?.subHeader,
    description: data.description ?? selectedItem?.description,
    ...(data["workshopThumbnailPic"] && {
      workshopThumbnailPic: changeFileNameForImage(
        data["workshopThumbnailPic"],
        selectedItem?.workshopThumbnailPic,
        numberToWords(7)
      ),
    }),
    list: [],
    brand_gallery: [],
    // gallery: data["gallery"] ?? selectedItem?.gallery,
    // list: changeFileNameForImage(data["list"], selectedItem?.list),
  };

  // Process list
  for (let i = 0; i < selectedItem?.list?.length; i++) {
    const isListExist = Array.isArray(selectedItem?.list);
    result.list.push({
      header:
        data[`list_header_${i + 1}`] ??
        (isListExist ? selectedItem.list[i]?.header : ""),
      image: changeFileNameForImage(
        data[`list_image_${i + 1}`],
        selectedItem?.list?.[i]?.image,
        numberToWords(i + 1)
      ),
      description:
        data[`list_description_${i + 1}`] ??
        (isListExist ? selectedItem.list[i]?.description : ""),
    });
  }

  // Process brand_gallery
  for (let i = 1; i <= 3; i++) {
    result.brand_gallery.push(
      changeFileNameForImage(
        data[`list_image_${i + 7}`],
        selectedItem?.brand_gallery?.[i - 1],
        numberToWords(i + 7)
      )
    );
  }
  return result;
};

// Convert home page item data
export const getWorkshopPageItemData = (params: any) => {
  // Destructuring params
  const { store, rest, watch, isLessThan600, imgHidden, setImgHidden } = params;
  const { forms, handleFormChange, setForm } = store;
  const { api: apiData, formData, isLoading } = forms.get ?? {};
  const {
    workshopPage = {},
    _id: id,
    imageCoverPic,
  } = apiData?.data?.[0] || {};

  // Initial setup
  const type = "get";
  const page = {
    name: "workshopPage",
    query: "workshop",
  };
  let item: any = safeParseJSON(workshopPage);
  const pageLength = Object?.keys(item)?.length;

  // Reset form values
  const resetInitialFormValues = () => {
    resetReactHookFormValues(textFields, rest?.setValue, item);

    // Thumbnail pic
    rest?.setValue("workshopThumbnailPic", item?.workshopThumbnailPic);

    // Reset image values
    if (item?.list?.length) {
      rest?.setValue("list_image_1", item?.list[0]?.image);
      rest?.setValue("list_image_2", item?.list[1]?.image);
      rest?.setValue("list_image_3", item?.list[2]?.image);
      rest?.setValue("list_image_4", item?.list[3]?.image);
      rest?.setValue("list_image_5", item?.list[4]?.image);
      rest?.setValue("list_image_6", item?.list[5]?.image);
      // rest?.setValue("list_image_7", item?.list[5]?.image)
      rest?.setValue("list_image_8", item?.brand_gallery[0]?.image);
      rest?.setValue("list_image_9", item?.list[1]?.image);
      rest?.setValue("list_image_10", item?.list[2]?.image);
    }

    // rest?.setValue("rental_description", item?.rental_description);
  };

  // Check if form actions should be disabled
  const images = [
    watch("workshopThumbnailPic"),
    watch("list_image_1"),
    watch("list_image_2"),
    watch("list_image_3"),
    watch("list_image_4"),
    watch("list_image_5"),
    watch("list_image_6"),
    watch("list_image_8"),
    watch("list_image_9"),
    watch("list_image_10"),
  ];
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
    liveUrl: getWebUrl("/workshop"),
  };

  // Return the resulting object
  return {
    pointDivProps,
    innerPointProps,

    // Other needed data
    id,
    workshopPage,
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
    allListFields,
    brandGalleryFields,
    listField1,
    listField2,
    listField3,
    listField4,
    listField5,
    listField6,
    // thumbnailImageInputProps,
  };
};
