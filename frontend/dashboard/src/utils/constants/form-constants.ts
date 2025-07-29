// Import - utils
import { OptionSchema } from "@/utils/schemas/GlobalSchema";
// import { SELECT_OPTIONS, SELECT_ROLES } from "./auth-constants";

// This is used for popup forms in pages

// Schemas (which will be placed inside schemas folder later)
export type FormInputSchema = {
  control?: any;
  errorMessage?: any;
  name?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  defaultFiles?: string[];

  // Action handlers
  disabled?: boolean;

  // Others - specific
  countryCode?: number;
  options?: OptionSchema[];
  role?: any;
  isMultiSelect?: boolean;
  isCaption?: boolean; // for images
  // selectName?: string;
};

// Email Address
export const email = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    type: TYPE,
    label: LABEL,
    placeholder: PLACEHOLDER,
  } = props;

  // Variables
  const name = NAME ?? "email";
  const label = LABEL ?? "Email Address";
  // const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "john_doe@gmail.com";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = TYPE ?? "text";
  const common = { control, errorMessage, label, name, placeholder, type };
  // if (defaultValue) return { ...common, defaultValue };
  return { ...common };
};

// Role
// export const role = (props: FormInputSchema) => {
//   // Props
//   const {
//     control,errorMessage,
// defaultValue: DEFAULT_VALUE,
//     name: NAME,
//     label: LABEL,
//     placeholder: PLACEHOLDER,
//     options: OPTIONS,
//     role,
//   } = props;

//   // Variables
//   const name = NAME ?? "role";
//   const label = LABEL ?? "Role";
// const defaultValue = DEFAULT_VALUE ?? "";
//   // const options = OPTIONS ?? SELECT_ROLES(role);
//   // const placeholder = PLACEHOLDER ?? "";
//   const placeholder = PLACEHOLDER ?? ""  ;

//   // Return accordingly
//   const common = { control,errorMessage, options, name, label, placeholder };
//   if (defaultValue) return { ...common, defaultValue };
//   else return { ...common };
// };

// Role
export const selectInputOption = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
    options: OPTIONS,
    disabled,
    type: TYPE,
    // isMultiSelect,
  } = props;

  // Variables
  const name = NAME ?? "";
  const label = LABEL ?? "";
  const defaultValue = DEFAULT_VALUE ?? "";
  // const options = isMultiSelect ? OPTIONS : SELECT_OPTIONS(OPTIONS) ?? "";
  const options = OPTIONS ?? "";
  // const placeholder = PLACEHOLDER ?? "";
  const placeholder = PLACEHOLDER ?? "";
  const type = TYPE ?? "react-select";

  // Return accordingly
  const common = {
    disabled,
    control,
    errorMessage,
    options,
    name,
    label,
    placeholder,
    type,
  };
  if (defaultValue) return { ...common, defaultValue };
  else return { ...common };
};

// Password
export const password = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    defaultValue: DEFAULT_VALUE,
    label: LABEL,
    name: NAME,
    placeholder: PLACEHOLDER,
  } = props;

  // Variables
  const name = NAME ?? "password";
  const label = LABEL ?? "Password";
  const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "********";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = "password";
  const common = { control, errorMessage, label, name, placeholder, type };
  if (defaultValue) return { ...common, defaultValue };
  else return { ...common };
};

export const confirmPassword = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
  } = props;

  // Variables
  const name = NAME ?? "confirm_password";
  const label = LABEL ?? "Confirm Password";
  // const defaultValue = DEFAULT_VALUE ?? "";
  const placeholder = PLACEHOLDER ?? "";
  // const placeholder = PLACEHOLDER ?? "********";

  // Return accordingly
  const type = "password";
  const common = { control, errorMessage, label, name, placeholder, type };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};

// Name
export const name = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
    disabled,
  } = props;

  // Variables
  const name = NAME ?? "name";
  const label = LABEL ?? "Name";
  // const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "Type your name here...";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = "text";
  const common = {
    control,
    disabled,
    errorMessage,
    label,
    name,
    placeholder,
    type,
  };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};

// Title
export const title = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    defaultValue: DEFAULT_VALUE,
    name: NAME,
    type: TYPE,
    label: LABEL,
    placeholder: PLACEHOLDER,
    disabled,
  } = props;

  // Variables
  const name = NAME ?? "title";
  const label = LABEL ?? "Title";
  const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "Type your name here...";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = TYPE ?? "text";
  const common = {
    control,
    disabled,
    errorMessage,
    label,
    name,
    placeholder,
    type,
  };
  if (defaultValue) return { ...common, defaultValue };
  else return { ...common };
  // return { ...common };
};

// Title
export const textArea = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
    disabled,
  } = props;

  // Variables
  const name = NAME ?? "textArea";
  const label = LABEL ?? "Textarea";
  const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "Type your name here...";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = "textarea";
  const common = {
    control,
    disabled,
    errorMessage,
    label,
    name,
    placeholder,
    type,
  };
  if (defaultValue) return { ...common, defaultValue };
  else return { ...common };
  // return { ...common };
};

// Date
export const date = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
    disabled,
  } = props;

  // Variables
  const name = NAME ?? "date";
  const label = LABEL ?? "Date";
  const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "Type your name here...";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = "date";
  const common = {
    control,
    disabled,
    errorMessage,
    label,
    name,
    placeholder,
    type,
  };
  if (defaultValue) return { ...common, defaultValue };
  else return { ...common };
  // return { ...common };
};

// Description
export const description = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
    disabled,
  } = props;

  // Variables
  const name = NAME ?? "description";
  const label = LABEL ?? "Description";
  // const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "Type your name here...";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = "textarea";
  const common = {
    control,
    disabled,
    errorMessage,
    label,
    name,
    placeholder,
    type,
  };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};

// Full name
export const fullName = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
  } = props;

  // Variables
  const name = NAME ?? "full_name";
  const label = LABEL ?? "Full Name";
  // const defaultValue = DEFAULT_VALUE ?? "";
  const placeholder = PLACEHOLDER ?? "";
  // const placeholder = PLACEHOLDER ?? "John Doe";

  // Return accordingly
  const type = "text";
  const common = { control, errorMessage, label, name, placeholder, type };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};

// First name
export const firstName = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
  } = props;

  // Variables
  const name = NAME ?? "first_name";
  const label = LABEL ?? "First Name";
  // const defaultValue = DEFAULT_VALUE ?? "";
  const placeholder = PLACEHOLDER ?? "";
  // const placeholder = PLACEHOLDER ?? "John";

  // Return accordingly
  const type = "text";
  const common = { control, errorMessage, label, name, placeholder, type };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};

// Last Name
export const lastName = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
  } = props;

  // Variables
  const name = NAME ?? "last_name";
  const label = LABEL ?? "Last Name";
  // const defaultValue = DEFAULT_VALUE ?? "";
  const placeholder = PLACEHOLDER ?? "";
  // const placeholder = PLACEHOLDER ?? "Doe";

  // Return accordingly
  const type = "text";
  const common = { control, errorMessage, label, name, placeholder, type };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};

// Phone Number
export const phone = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    countryCode: COUNTRY_CODE,
    placeholder: PLACEHOLDER,
  } = props;

  // Variables
  const name = NAME ?? "phone_number";
  const label = LABEL ?? "Phone Number";
  const countryCode = COUNTRY_CODE ?? 195;
  // const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "980XXXXXXX";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = "text";
  const common = {
    control,
    countryCode,
    errorMessage,
    label,
    name,
    placeholder,
    type,
  };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};

// Email Address + Phone Number
export const emailOrPhone = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
  } = props;

  // Variables
  const name = NAME ?? "email_or_phone";
  const label = LABEL ?? "Email / Phone Number";
  // const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "980XXXXXXX / abc@gmail.com";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = "text";
  const common = { control, errorMessage, label, name, placeholder, type };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};

// Radio input
export const radioInput = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
  } = props;

  // Variables
  const name = NAME ?? "radio_input";
  const label = LABEL ?? "";
  // const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = "radio";
  const common = { control, errorMessage, label, name, placeholder, type };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};

// Image input
export const imageInput = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
    disabled,
    isCaption,
    defaultFiles,
  } = props;

  // Variables
  const name = NAME ?? "image";
  const label = LABEL ?? "Image";
  // const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "Type your name here...";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = "image";
  const common = {
    control,
    disabled,
    errorMessage,
    label,
    name,
    placeholder,
    type,
    ...(isCaption && { caption: "This will replace your previous images(s)" }),
    ...(defaultFiles && { defaultFiles }),
  };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};

// Image input
export const draftEditorInput = (props: FormInputSchema) => {
  // Props
  const {
    control,
    errorMessage,
    // defaultValue: DEFAULT_VALUE,
    name: NAME,
    label: LABEL,
    placeholder: PLACEHOLDER,
    disabled,
  } = props;

  // Variables
  const name = NAME ?? "Name";
  const label = LABEL ?? "Name";
  // const defaultValue = DEFAULT_VALUE ?? "";
  // const placeholder = PLACEHOLDER ?? "Type your name here...";
  const placeholder = PLACEHOLDER ?? "";

  // Return accordingly
  const type = "draft-editor";
  const common = {
    control,
    disabled,
    errorMessage,
    label,
    name,
    placeholder,
    type,
  };
  // if (defaultValue) return { ...common, defaultValue };
  // else return { ...common };
  return { ...common };
};
