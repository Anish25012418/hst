// Import - default
import * as yup from "yup";
import dayjs from "dayjs";
import {
  regex_alphabet_with_space_minmax,
  regex_password,
} from "../constants/regex-constants";
import { checkEditorEmpty } from "../methods/editor-methods";
import { RawDraftContentState } from "draft-js";

export const idValidation = yup
  .string()
  .required("Required")
  .min(3, "At least 3 letters")
  .max(10, "At most 10 letters");

export const numberValidation = yup
  .string()
  .matches(/^[0-9]+$/, "Must be only digits")
  .required("Required");

export const phoneValidation = yup
  .string()
  .matches(/^[0-9]+$/, "Must be only digits")
  .matches(/^\d{10}$/, "Must be exactly 10 digits")
  .required("Required");

export const nameValidation = yup
  .string()
  .required("Required")
  .min(3, "At least 3 letters")
  .max(40, "At most 40 letters")
  .matches(regex_alphabet_with_space_minmax(3, 40), "Must be a valid name");

export const passwordValidation = yup
  .string()
  .required("Required")
  // .min(8, "Password must be at least 8 characters long");
  .min(8, "Must be at least 8 characters")
  .max(20, "Must be no more than 20 characters")
  .matches(
    regex_password,
    "Must contain at least 1 lowercase, uppercase, digit, & special char"
  );
// .matches(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//   "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
// );

export const confirmPasswordValidation = yup
  .string()
  .oneOf(
    [yup.ref("reset_password"), yup.ref("password")],
    "Passwords must match"
  )
  .required("Please confirm your password");

export const emailValidation = yup
  .string()
  .email("Must be a valid email")
  .max(255)
  .required("Required");

export const selectValidation = yup
  .mixed()
  .test("is-selected", "Selection is required", (value: any) => {
    if (!value) return false; // Value is empty
    if (Array.isArray(value)) {
      return (
        value.length > 0 &&
        value.every((item) => item && item?.label && item?.value)
      );
    } else {
      return value?.label && value?.value;
    }
  });
export const dateValidation = yup.string().required("Required");
// export const purchaseDateValidation = yup.string().required("Required");
export const purchaseDateValidation = yup
  .date()
  .required("Required")
  .typeError("Required")
  .nullable()
  .test("", "Purchase date is greater than expiry date", (val, props) => {
    const purchase_date = dayjs(val);
    const expiry_date = dayjs(props.parent.expiry_date);
    return purchase_date.isBefore(expiry_date);
  });

export const expiryDateValidation = yup
  .date()
  .required("Required")
  .typeError("Required")
  .nullable()
  .test("", "Expiry date is less than purchase date", (val, props) => {
    const expiry_date = dayjs(val);
    const purchase_date = dayjs(props.parent.purchase_date);
    return expiry_date.isAfter(purchase_date);
  });
// .when(
//   "expiry_date",
//   (expiryDate, Yup) =>
//     expiryDate &&
//     Yup.max(expiryDate, "Purchase date is greater than expiry date")
// );

// Inventory Name Validation
export const inventoryNameValidation = yup
  .string()
  .nullable()
  .required("Required");

// Default validation with only required
export const defaultValidation = yup
  .mixed()
  .test("isStringOrArrayOfStrings", "Please insert a valid value", (value) => {
    if (typeof value === "string") {
      return true; // Value is a string
    }
    if (Array.isArray(value)) {
      return value.every((item) => typeof item === "string"); // Value is an array of strings
    }
    return false; // Invalid type
  });

// Validation for draft editor
export const draftEditorValidation = yup
  .object()
  .test("required", "Required", (value) => {
    // if (!checkEditorEmpty(value as RawDraftContentState)) {
    //   return false;
    // }
    return !checkEditorEmpty(value as RawDraftContentState);
  });

// Image validation
export const imageValidation = (mb: number, count?: number) =>
  yup
    .mixed()
    .test(
      "fileType",
      "Invalid file type. Only JPEG, PNG, WEBP or GIF allowed.",
      (value: any) => {
        if (!value) {
          return true; // Allow empty values, assuming your form allows for optional images
        }

        // Normal string array type
        const isString =
          typeof value === "string" ||
          (!!value?.length && typeof value[0] === "string");

        // File validation part
        const file = value as any;
        const validTypesRegex = /^image\/(gif|jpeg|png|webp)$/;
        const type = file[0]?.type;

        return validTypesRegex.test(type) || isString;
      }
    )
    .test(
      "fileSize",
      `File size must be less than or equal to ${mb ?? 1} MB.`,
      (value: any) => {
        if (!value) {
          return true; // Allow empty values, assuming your form allows for optional images
        }

        // Normal string array type
        const isString =
          typeof value === "string" ||
          (!!value?.length && typeof value[0] === "string");

        // File validation part
        const file = value as any;
        const maxSize = (mb ?? 1) * 1024 * 1024; // number of MB in bytes
        const size = file[0]?.size;

        return size <= maxSize || isString;
      }
    )
    .test(
      "fileCount",
      `You can upload up to ${count ?? 10} image files.`,
      (value: any) => {
        if (!value) {
          return true; // Allow empty values, assuming your form allows for optional images
        }

        // Normal string array type
        const isString =
          typeof value === "string" ||
          (!!value?.length && typeof value[0] === "string");

        // File count validation part
        const files = value as any[];

        return files.length <= (count ?? 10) || isString;
      }
    )
    .required("Image is required");
