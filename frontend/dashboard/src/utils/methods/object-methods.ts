// Import - utils
import * as t from "@/utils/constants/toast-constants";
import { ObjectSchema } from "@/utils/schemas/GlobalSchema";
import { regex_integer } from "../constants/regex-constants";

// To check if a variable is an array of strings (string[])
export const isStringArray = (arr: any) =>
  Array.isArray(arr) && arr.every((item) => typeof item === "string");

// Get the required option value for select input mostly
export const getLabelValuePair = (value: any, label?: any) => ({
  label: label ?? value,
  value,
});

export const isNullObject = (obj: ObjectSchema) =>
  Object.keys(obj ?? {})?.length === 0;

export const checkInvalidArr = (arr: any) => {
  let temp: any = arr;

  if (typeof temp === "undefined") {
    return true;
  }

  if (typeof temp === "object") {
    temp = Object.values(arr);
  }

  return temp?.some((value: any) => !!value === false); // Check for invalid values in arr
};

// Convert image file to json
export const convertImageToData = (files: any) =>
  files?.map((file: any) => ({
    name: file?.name,
    size: file?.size,
    type: file?.type,
    lastModified: file?.lastModified,
    lastModifiedDate: file?.lastModifiedDate,
    webkitRelativePath: file?.webkitRelativePath,
    // Add more properties as needed
  }));

// Check if image is in proper format
export const checkImageFormat = (fileImg?: File | null) => {
  const acceptedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    // "image/svg+xml",
    "image/webp",
  ];
  if (!fileImg) {
    return t.NULL_UNDEFINED_FILE_ERROR.msg;
  }
  if (fileImg.type && acceptedImageTypes.includes(fileImg.type)) {
    return "TRUE";
  } else {
    return t.NOT_ACCEPTED_IMAGE_ERROR.msg;
  }
};

export const convertObjValuesToJson = (
  obj: Record<string, any>
): Record<string, any> => {
  const jsonObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value === null || value === undefined) {
        jsonObj[key] = value;
      } else {
        // JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        jsonObj[key] = JSON.stringify(value);
      }
    }
  }

  return jsonObj;
};

export const deepEqual = (obj1: any, obj2: any): boolean => {
  // Check if both objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // If both objects are primitive types or null, compare their values directly
  if (typeof obj1 !== "object" || obj1 === null) {
    return obj1 === obj2;
  }

  // If both objects are arrays, compare their lengths and elements recursively
  if (Array.isArray(obj1)) {
    if (!Array.isArray(obj2) || obj1.length !== obj2.length) {
      return false;
    }

    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) {
        return false;
      }
    }

    return true;
  }

  // If both objects are objects, compare their keys and values recursively
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

// In this version, childObj represents the object that you want to check if it's a subset of parentObj. The function checks if all key-value pairs in childObj exist in parentObj recursively.
export const isObjectSubsetOf = (childObj: any, parentObj: any): boolean => {
  // Check if both objects are of the same type
  if (typeof childObj !== typeof parentObj) {
    return false;
  }

  // If both objects are primitive types or null, compare their values directly
  if (typeof childObj !== "object" || childObj === null) {
    return childObj === parentObj;
  }

  // If childObj is an object and parentObj is null or not an object, childObj cannot be a subset of parentObj
  if (typeof parentObj !== "object" || parentObj === null) {
    return false;
  }

  // Check if all key-value pairs in childObj exist in parentObj
  for (const key of Object.keys(childObj)) {
    if (
      !parentObj.hasOwnProperty(key) ||
      !isObjectSubsetOf(childObj[key], parentObj[key])
    ) {
      return false;
    }
  }

  return true;
};

// In this version, isArraySubsetOf specifically checks if every element in childArray exists in parentArray. If yes, it returns true; otherwise, it returns false.
export const isArraySubsetOf = (
  childArray: string[],
  parentArray: string[]
): boolean => {
  // Check if both inputs are arrays
  if (!Array.isArray(childArray) || !Array.isArray(parentArray)) {
    return false;
  }

  // Check if every element in childArray exists in parentArray
  for (const item of childArray) {
    if (!parentArray.includes(item)) {
      return false;
    }
  }

  return true;
};

// Converting a valid string array to the desired label-value pair format.
export const toLabelValue = (obj: string[]) => {
  if (isStringArray(obj)) {
    const result = obj.map((str) => ({ label: str, value: str }));
    return [{ label: "Select an option", value: "" }, ...result];
  }
};

export const validateImages = (props: any) => {
  const {
    imageCoverPicTemp,
    imageExtraPicTemp,
    imageGalleryPicTemp,
    imageThumbnailPicTemp,
  } = props;

  // Variables
  let imageValidity = "TRUE";

  // Single image validation
  const validateSingleImage = (image: any) => {
    if (image && typeof image !== "string") {
      return checkImageFormat(image);
    }
    return "TRUE";
  };

  // Multiple images validation
  const validateMultipleImages = (images: any) => {
    if (images && images.length > 0 && typeof images[0] !== "string") {
      const allImages = images.map((image: any) => checkImageFormat(image));
      return allImages.every((item: any) => item === "TRUE") ? "TRUE" : "FALSE";
    }
    return "TRUE";
  };

  imageValidity =
    validateMultipleImages(imageCoverPicTemp) === "FALSE"
      ? "FALSE"
      : imageValidity;

  imageValidity =
    validateSingleImage(imageExtraPicTemp) === "FALSE"
      ? "FALSE"
      : imageValidity;

  imageValidity =
    validateMultipleImages(imageGalleryPicTemp) === "FALSE"
      ? "FALSE"
      : imageValidity;

  // Validate each image type
  imageValidity =
    validateSingleImage(imageThumbnailPicTemp) === "FALSE"
      ? "FALSE"
      : imageValidity;

  return imageValidity;
};

// Get the items containing keys from array
export const filterByKeyPrefix = (key: string, value: any, arr: any[]) => {
  const filteredDataInKey = arr?.filter((item: any) => {
    // Fetch the actual data of the filtered item
    const actual = item[key];

    // Change to lowercase for alphabets
    const actualLower = regex_integer.test(actual)
      ? actual
      : actual?.toLowerCase();
    const valueLower = regex_integer.test(value) ? value : value?.toLowerCase();
    return valueLower === actualLower?.slice(0, value?.length);
  });
  const result =
    filteredDataInKey?.length > 0
      ? filteredDataInKey
      : arr?.filter((item: any) => item[key]);
  return result;
};

// To handle the case where contactPage might not be a valid JSON string or might be undefined/null, you can use a try-catch block to safely parse the JSON
export const safeParseJSON = (jsonData: any, defaultValue: any = {}): any => {
  if (typeof jsonData === "string") {
    try {
      return JSON.parse(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return defaultValue;
    }
  } else {
    return jsonData || defaultValue;
  }
};

export const filterValidKeys = (data: Record<string, any>) => {
  return Object.entries(data)
    .filter(
      ([_, value]) => value !== "" && value !== undefined && value !== null
    )
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};
