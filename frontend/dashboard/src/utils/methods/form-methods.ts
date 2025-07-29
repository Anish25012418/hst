// Import - utils
import { isArraySubsetOf } from "./object-methods";

// Returns an error message in string format for react-hook-form errors
export const getInputErr = (errors: any, key: string) => ({
  errorMessage: errors[key]?.message ?? "",
});

export const transformToFormData = (data: any, enumKeys: any) => {
  return {
    ...data,

    // Images
    ...(data.imageThumbnailPic && {
      imageThumbnailPic: data.imageThumbnailPic[0],
    }),
    ...(data.imageExtraPic && {
      imageExtraPic: data.imageExtraPic[0],
    }),

    // Price
    ...(data?.priceOriginal && { priceOffer: data?.priceOriginal }), // Since the client does not need discount offer, we are gonna put it same as the original price

    // Enum values
    // ...(data.imageTestPic && { imageTyPic: data.imageTestPic[0] }),
    // ...(data.categoryIds && { categoryIds: Object.values(data.categoryIds) }),
    ...Object.keys(data).reduce((acc: any, key: any) => {
      if (enumKeys.includes(key) || key === "categoryIds") {
        const value = data[key];
        // Check if the value is an array of objects with `label` and `value` properties
        if (Array.isArray(value)) {
          acc[key] = value.map((item) => item.value);
        } else if (
          value &&
          typeof value === "object" &&
          "label" in value &&
          "value" in value
        ) {
          // Single object with `label` and `value` properties
          acc[key] = value.value;
        } else {
          // Preserve original value if it doesn't match the expected structure
          acc[key] = value;
        }
      }
      return acc;
    }, {}),
  };
};

// Transform the data sent in formdata with the already existing item if the formdata remains unchanged
export const transformUpdateFormData = (
  fields: any,
  data: any,
  selectedItem: any
): any => {
  {
    // Get the updated form data
    const result = fields.reduce((acc: any, field: any) => {
      acc[field] = data[field] ?? selectedItem?.[field];
      return acc;
    }, {} as any);

    // Image checks
    if (
      data.imageCoverPic &&
      !isArraySubsetOf(data.imageCoverPic, selectedItem?.imageCoverPic)
    ) {
      result.imageCoverPic = data.imageCoverPic;
    } else if (
      data.imageGalleryPic &&
      !isArraySubsetOf(data.imageGalleryPic, selectedItem?.imageGalleryPic)
    ) {
      result.imageGalleryPic = data.imageGalleryPic;
    }

    return result;
  }
};

// Reset react hook form values
export const resetReactHookFormValues = (
  fields: string[],
  setValue: any,
  item: any,
  imageKeys?: string[],
  apiData?: any
) => {
  // Action to set the multiple inputBranches values'
  fields.forEach((field: string) => setValue(field, item?.[field]));

  // Default image types
  if (imageKeys?.length) {
    // Image types
    const imageFields = [
      "imageThumbnailPic",
      "imageGalleryPic",
      "imageCoverPic",
      "imageExtraPic",
    ];
    if (imageFields.length > 0 && imageKeys?.length > 0) {
      imageFields.forEach((field) => {
        if (imageKeys.includes(field)) {
          setValue(field, apiData?.data?.[0]?.[field]);
        }
      });
    }
  }
};
