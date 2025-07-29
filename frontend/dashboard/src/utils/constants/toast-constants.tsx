//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// error
export const TOAST_ERROR = (msg: string) => ({
  msg,
  status: "error",
});
// warning
export const TOAST_WARNING = (msg: string) => ({
  msg,
  status: "warning",
});
// success
export const TOAST_SUCCESS = (msg: string) => ({
  msg,
  status: "success",
});
// info
export const TOAST_INFO = (msg: string) => ({
  msg,
  status: "info",
});
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Api errors
export const REQUEST_TIMED_OUT_ERROR = {
  msg: "The request timed out. Please try again.",
  status: "error",
};
export const DATABASE_CONNECTION_ERROR = {
  msg: "Could not connect to the database.",
  status: "error",
};
export const NO_INTERNET_ERROR = {
  msg: "Could not connect to the internet.",
  status: "error",
};
export const RESPONSE_TIME_EXCEEDED_ERROR = {
  msg: "Response time exceeded. Please try again.",
  status: "error",
};
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// Data erros
export const EMPTY_FORM_FIELD = {
  msg: "Empty input field(s).",
  status: "error",
};

export const EMPTY_EXPORT_DATA_ERROR = {
  msg: "No data to export.",
  status: "error",
};

// Input errors
export const CHANGE_VALUES_TO_EDIT_ERROR = {
  msg: "Please change some values to update.",
  status: "error",
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Image errors
export const NO_IMAGE_ERROR = {
  msg: "Please upload an image.",
  status: "error",
};

export const NULL_UNDEFINED_FILE_ERROR = {
  msg: "File is null or undefined.",
  status: "error",
};

export const NOT_ACCEPTED_IMAGE_ERROR = {
  msg: "File is not an accepted image type.",
  status: "error",
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Booking Page error
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
export const EMPTY_DATES_ERROR = {
  msg: "Dates can't be empty.",
  status: "error",
};

export const MAKE_APPOINTMENT_SUCCESS = {
  msg: "Created a booking appointment. Please check the client's email.",
  status: "success",
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Form validation errors
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
export const PLEASE_FILL_INFO = {
  msg: "Please fill up the remaining details.",
  status: "info",
  duration: 5000,
};

export const SELECT_CATEGORY_WARNING = {
  msg: "Please select a category.",
  status: "warning",
};

export const EMPTY_FIELD_WARNING = (item: string) => ({
  msg: `Please insert value for ${item}.`,
  status: "warning",
  duration: 5000,
});

export const SELECT_BOOKING_DATE_WARNING = {
  msg: "Please select a booking date.",
  status: "warning",
};

export const SELECT_SERVICE_WARNING = {
  msg: "Please select a service.",
  status: "warning",
};

export const INVALID_EMAIL_PHONE_FORMAT_WARNING = {
  msg: "Invalid email/phone number format.",
  status: "warning",
};

export const INVALID_EMAIL_FORMAT_WARNING = {
  msg: "Invalid email format.",
  status: "warning",
};

export const INVALID_NAME_FORMAT_WARNING = (name?: string) => ({
  msg: `Invalid ${name ?? "name"}.`,
  status: "warning",
});

export const INVALID_PHONE_WARNING = {
  msg: "Phone should be 10 digits.",
  status: "warning",
};

export const PASSWORDS_MISMATCH_WARNING = {
  msg: "Passwords do not match.",
  status: "warning",
};

export const INVAID_PROMOTION_PRICE_WARNING = {
  msg: "Promotion price cannot be greater than actual price.",
  status: "warning",
};

export const INVALID_DISCOUNTED_PRICE_WARNING = {
  msg: "Discount must be (less than / equal to) 20%",
  status: "warning",
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Item registration
export const ADDED_SUCCESS = {
  msg: "Added item successfully.",
  status: "success",
};

export const ADDED_SUCCESS_NAME = (name: string) => ({
  msg: `Added ${name} successfully.`,
  status: "success",
});

export const EDITED_SUCCESS = {
  msg: "Updated item successfully.",
  status: "success",
};

export const EDITED_SUCCESS_NAME = (name: string) => ({
  msg: `Updated ${name} successfully.`,
  status: "success",
});

export const DELETED_SUCCESS = {
  msg: "Deleted item successfully.",
  status: "success",
};

export const DELETED_SUCCESS_NAME = (name: string) => ({
  msg: `Deleted ${name} successfully.`,
  status: "success",
});

// User registration
export const WELCOME_USER_SUCCESS = (name: string) => ({
  msg: `Welcome, ${name}. You have successfully signed in. Please wait for your turn. Thankyou for your patience.`,
  status: "success",
  isPopup: true,
});

export const TEST_POPUP_SUCCESS = () => ({
  msg: `Welcome, ${"Udip Rai"}. You have successfully signed in. Please wait for your turn. Thankyou for your patience.`,
  status: "success",
  isPopup: true,
});

export const REGISTER_SUCCESS = (name: string) => ({
  msg: `Registered ${name} successfully.`,
  status: "success",
});

export const UPDATE_USER_SUCCESS = (name: string) => ({
  msg: `Updated User: ${name} successfully.`,
  status: "success",
});
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Store errors
export const NO_STORE_FOUND = {
  msg: "No such store found.",
  status: "error",
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Client
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
export const SEARCHED_CLIENT_FOUND = {
  msg: "Client found.",
  status: "success",
};

export const COMPLETE_CANCEL_SERVICE_STATUS_WARNING = {
  msg: "Please update the status of all services to completed/cancel first.",
  status: "warning",
};
