// Import - utils
import { getWebUrl } from "@/utils/methods/app-methods";
import { removeDraftEditorSpacings } from "@/utils/methods/editor-methods";
import { changeFileNameForImage } from "@/utils/methods/image-methods";
import { isNullObject, safeParseJSON } from "@/utils/methods/object-methods";
import { numberToWords } from "@/utils/methods/string-methods";

// Variables
const textFields = ["rental_title", "bike_title", "bike_description"];
// const editorFields = ["rental_description"];
// First bike gallery
const galleryField1 = [
  "bike_gallery_title_1",
  "bike_gallery_description_1",
  "bike_gallery_image_1",
  "bike_gallery_feature_1_point_1",
  "bike_gallery_feature_1_point_2",
  "bike_gallery_feature_1_point_3",
  "bike_gallery_feature_1_point_4",
  "bike_gallery_feature_1_point_5",
];
const egalleryField1 = [
  "ebike_gallery_title_1",
  "ebike_gallery_description_1",
  "ebike_gallery_image_1",
  "ebike_gallery_feature_1_point_1",
  "ebike_gallery_feature_1_point_2",
  "ebike_gallery_feature_1_point_3",
  "ebike_gallery_feature_1_point_4",
  "ebike_gallery_feature_1_point_5",
];
// Second bike gallery
const galleryField2 = [
  "bike_gallery_title_2",
  "bike_gallery_description_2",
  "bike_gallery_image_2",
  "bike_gallery_feature_2_point_1",
  "bike_gallery_feature_2_point_2",
  "bike_gallery_feature_2_point_3",
  "bike_gallery_feature_2_point_4",
  "bike_gallery_feature_2_point_5",
];
const egalleryField2 = [
  "ebike_gallery_title_2",
  "ebike_gallery_description_2",
  "ebike_gallery_image_2",
  "ebike_gallery_feature_2_point_1",
  "ebike_gallery_feature_2_point_2",
  "ebike_gallery_feature_2_point_3",
  "ebike_gallery_feature_2_point_4",
  "ebike_gallery_feature_2_point_5",
];
const galleryFields = [
  ...galleryField1,
  ...galleryField2,
  ...egalleryField1,
  ...egalleryField2,
];
const inputFields = [...textFields, ...galleryFields, "rental_description"];

// Convert Why-Us Page form data
export const getRentalPageFormData = (data: any, selectedItem: any = {}) => {
  // Declare a variable to store result
  const result: any = {
    // Rental
    rental_title: data.rental_title ?? selectedItem?.rental_title,
    rental_description: !isNullObject(data.rental_description)
      ? data.rental_description
      : selectedItem?.rental_description,
    rental_image: changeFileNameForImage(
      data["rental_image"],
      selectedItem?.rental_image,
      numberToWords(1)
    ),

    // Bike
    bike_title: data.bike_title ?? selectedItem?.bike_title,
    bike_description: data.bike_description ?? selectedItem?.bike_description,
    bike_gallery: [],
    ebike_gallery: [],
  };

  for (let i = 0; i <= 1; i++) {
    const isBikeGalleryExist = Array.isArray(selectedItem?.bike_gallery);
    result.bike_gallery.push({
      title:
        data[`bike_gallery_title_${i + 1}`] ??
        (isBikeGalleryExist ? selectedItem.bike_gallery?.[i]?.title : ""),
      description:
        data[`bike_gallery_description_${i + 1}`] ??
        (isBikeGalleryExist ? selectedItem.bike_gallery?.[i]?.description : ""),
      image: changeFileNameForImage(
        data[`bike_gallery_image_${i + 1}`],
        selectedItem?.bike_gallery?.[i]?.image,
        numberToWords(i + 2)
      ),
      features: [
        data[`bike_gallery_feature_${i + 1}_point_1`] ??
          (isBikeGalleryExist
            ? selectedItem?.bike_gallery?.[i]?.features[0]
            : ""),
        data[`bike_gallery_feature_${i + 1}_point_2`] ??
          (isBikeGalleryExist
            ? selectedItem?.bike_gallery?.[i]?.features[1]
            : ""),
        data[`bike_gallery_feature_${i + 1}_point_3`] ??
          (isBikeGalleryExist
            ? selectedItem?.bike_gallery?.[i]?.features[2]
            : ""),
        data[`bike_gallery_feature_${i + 1}_point_4`] ??
          (isBikeGalleryExist
            ? selectedItem?.bike_gallery?.[i]?.features[3]
            : ""),
        data[`bike_gallery_feature_${i + 1}_point_5`] ??
          (isBikeGalleryExist
            ? selectedItem?.bike_gallery?.[i]?.features[4]
            : ""),
      ],
    });
  }

  for (let i = 0; i <= 1; i++) {
    const isBikeGalleryExist = Array.isArray(selectedItem?.ebike_gallery);
    result.ebike_gallery.push({
      title:
        data[`ebike_gallery_title_${i + 1}`] ??
        (isBikeGalleryExist ? selectedItem.ebike_gallery?.[i]?.title : ""),
      description:
        data[`ebike_gallery_description_${i + 1}`] ??
        (isBikeGalleryExist
          ? selectedItem.ebike_gallery?.[i]?.description
          : ""),
      image: changeFileNameForImage(
        data[`ebike_gallery_image_${i + 1}`],
        selectedItem?.ebike_gallery?.[i]?.image,
        numberToWords(i + 4)
      ),
      features: [
        data[`ebike_gallery_feature_${i + 1}_point_1`] ??
          (isBikeGalleryExist
            ? selectedItem?.ebike_gallery?.[i]?.features[0]
            : ""),
        data[`ebike_gallery_feature_${i + 1}_point_2`] ??
          (isBikeGalleryExist
            ? selectedItem?.ebike_gallery?.[i]?.features[1]
            : ""),
        data[`ebike_gallery_feature_${i + 1}_point_3`] ??
          (isBikeGalleryExist
            ? selectedItem?.ebike_gallery?.[i]?.features[2]
            : ""),
        data[`ebike_gallery_feature_${i + 1}_point_4`] ??
          (isBikeGalleryExist
            ? selectedItem?.ebike_gallery?.[i]?.features[3]
            : ""),
        data[`ebike_gallery_feature_${i + 1}_point_5`] ??
          (isBikeGalleryExist
            ? selectedItem?.ebike_gallery?.[i]?.features[4]
            : ""),
      ],
    });
  }
  return result;
};

// Convert home page item data
export const getRentalPageItemData = (params: any) => {
  // Destructuring params
  const { store, rest, watch, isLessThan600, imgHidden, setImgHidden } = params;
  const { forms, handleFormChange, setForm } = store;
  const { api: apiData, formData, isLoading } = forms.get ?? {};
  const { rentalPage = {}, _id: id, imageCoverPic } = apiData?.data?.[0] || {};

  // Initial setup
  const type = "get";
  const page = {
    name: "rentalPage",
    query: "rental",
  };
  let item: any = safeParseJSON(rentalPage);
  const pageLength = Object?.keys(item)?.length;

  // Reset form values
  const resetInitialFormValues = () => {
    // resetReactHookFormValues(textFields, rest?.setValue, item);
    rest?.setValue("rental_description", {
      ...item?.rental_description,
      entityMap: {},
    });

    // Set images here
    rest?.setValue("rental_image", item?.rental_image);
    rest?.setValue("bike_gallery_image_1", item?.bike_gallery?.[0]?.image);
    rest?.setValue("bike_gallery_image_2", item?.bike_gallery?.[1]?.image);
    rest?.setValue("ebike_gallery_image_1", item?.ebike_gallery?.[0]?.image);
    rest?.setValue("ebike_gallery_image_2", item?.ebike_gallery?.[1]?.image);

    // galleryFields.forEach((singleItem) => {
    //   const firstGallery = [
    //     "bike_gallery_title_1",
    //     "bike_gallery_description_1",
    //     "bike_gallery_feature_1",
    //   ];
    //   const secondGallery = [
    //     "bike_gallery_title_2",
    //     "bike_gallery_description_2",
    //     "bike_gallery_feature_2",
    //   ];

    //   if (firstGallery?.includes(singleItem)) {
    //     if ("bike_gallery_title"?.includes(singleItem)) {
    //       rest?.setValue(singleItem, item?.[singleItem]);
    //     }
    //   }
    // });
    // rest?.setValue("bike_gallery_title_1", "demo");
    // rest?.setValue()
  };

  // Check if form actions should be disabled

  // Images
  const images = [
    watch("rental_image"),
    watch("bike_gallery_image_1"),
    watch("bike_gallery_image_2"),
    watch("ebike_gallery_image_1"),
    watch("ebike_gallery_image_2"),
  ];
  const isImageUpdated = images?.some((image) => typeof image === "object");

  // Description
  const currentRentalDesc = JSON.stringify(
    removeDraftEditorSpacings(watch("rental_description") ?? {})
  );
  const previousRentalDesc = JSON.stringify(
    removeDraftEditorSpacings(safeParseJSON(item?.rental_description))
  );
  const isRentalDescSame = currentRentalDesc === previousRentalDesc;

  const isFormActionDisabled =
    isNullObject(formData) && !isImageUpdated && isRentalDescSame;

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
    liveUrl: getWebUrl("/rental"),
  };

  // Return the resulting object
  return {
    pointDivProps,
    innerPointProps,

    // Other needed data
    id,
    rentalPage,
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
    galleryField1,
    egalleryField1,
    galleryField2,
    egalleryField2,
    galleryFields,
    // thumbnailImageInputProps,
  };
};
