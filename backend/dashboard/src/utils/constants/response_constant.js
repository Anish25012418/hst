// Imports
const { toTitleCase } = require("../methods/string_methods")

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Display functions, contains all the functions to display the response at then end
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const displayError = (error) => ({ error });
const displayMessage = (message) => ({ message });
const displayActionMessage = (action, item, data) =>
  displayMessageObject(`${action} ${item} successfully.`, data);
const displayErrorArray = (error) => ({ error });
const displayErrorObject = (msg, error) => ({
  error: `${msg}: ${error?.message}`,
});
const displayMessageObject = (message, data) => ({
  message,
  data,
});
const sendResponse = (res, statusCode, message) => {
  return res.status(statusCode).json(message);
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Common
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const commonAlreadyExistsResponse = (res, item) => {
  const message = displayError(`${toTitleCase(item)} already exists.`);
  return sendResponse(res, 400, message);
};
const commonInvalidItemsResponse = (res, items) => {
  const message = displayError(`Invalid ${items}.`);
  return sendResponse(res, 400, message);
};
const commonNotFoundResponse = (res, item) => {
  const message = displayError(`${toTitleCase(item)} not found.`);
  return sendResponse(res, 404, message);
};
const commonUpdateSomeValuesResponse = (res) => {
  const message = displayError("Please update some values.");
  return sendResponse(res, 400, message);
};
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// File
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const fileUploadErrorResponse = (res) => {
  const message = displayErrorObject("File upload error.");
  return sendResponse(res, 400, message);
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Form
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const formInvalidEnumsResponse = (res, errors) => {
  const message = displayErrorArray(errors);
  return sendResponse(res, 400, message);
};
const formInvalidInputsResponse = (res) => {
  const message = displayError(
    "Invalid inputs. Please fill in the required fields."
  );
  return sendResponse(res, 400, message);
};
const formValidationResponse = (res, errors) => {
  const message = displayErrorArray(errors);
  return sendResponse(res, 400, message);
};

//////////////////////////////////////////////////
// Rest
//////////////////////////////////////////////////
const restCreateResponse = (res, modelName, data) => {
  const message = displayActionMessage("Created", modelName, data);
  return sendResponse(res, 201, message);
};
const restDeleteResponse = (res, modelName) => {
  const message = displayActionMessage("Deleted", modelName);
  return sendResponse(res, 200, message);
};
const restFetchAllResponse = (res, modelName, data) => {
  const message = displayActionMessage("Fetched all of the items in", modelName, data);
  return sendResponse(res, 200, message);
};
const restFetchSingleResponse = (res, modelName, data) => {
  const message = displayActionMessage("Fetched", modelName, data);
  return sendResponse(res, 200, message);
};
const restUpdateResponse = (res, modelName, data) => {
  const message = displayActionMessage("Updated", modelName, data);
  return sendResponse(res, 200, message);
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Server
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const serverErrorResponse = (res, error) => {
  const message = displayError(error.message);
  return sendResponse(res, 500, message);
};
const serverInternalResponse = (res) => {
  const message = displayError("Internal server error");
  return sendResponse(res, 500, message);
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// User
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const noUserToLogoutResponse = (res) => {
  const message = displayError("There is no user to logout.");
  return sendResponse(res, 400, message);
};
const userCookieGeneratedResponse = (res) => {
  const message = displayMessage(
    "Generated token and set it as cookie successfully."
  );
  return sendResponse(res, 200, message);
};
const userForbiddenResponse = (res) => {
  const message = displayError("Forbidden access. Not allowed.");
  return sendResponse(res, 403, message);
};
const userInvalidCredentialsResponse = (res) => {
  const message = displayError("Invalid username or password.");
  return sendResponse(res, 400, message);
};
const userLoginResponse = (res, user) => {
  const message = displayMessageObject("Logged in user successfully.", user);
  return sendResponse(res, 200, message);
};
const userLoggedoutAlreadyResponse = (res) => {
  const message = displayError("User has already been logged out.");
  return sendResponse(res, 400, message);
};
const userLogoutResponse = (res) => {
  const message = displayMessage("User logged out successfully.");
  return sendResponse(res, 200, message);
};
const userNotFoundResponse = (res) => {
  const message = displayError("User not found.");
  return sendResponse(res, 400, message);
};
const userRegisterResponse = (res, user) => {
  const message = displayMessageObject("Registered user successfully. You can login anytime.", user);
  return sendResponse(res, 200, message);
};
const userTokenNoRegenResponse = (res, user) => {
  const message = displayError("No token available to generate user.");
  return sendResponse(res, 400, message);
};
const userTokenRegenResponse = (res, user) => {
  const message = displayMessageObject("Token generated successfully.", user);
  return sendResponse(res, 200, message);
};
const userTokenVerifyErrorResponse = (res) => {
  const message = displayError("Token verification error.");
  return sendResponse(res, 400, message);
};
const userUnauthorizedResponse = (res) => {
  const message = displayError("Unauthorized access. Please sign in.");
  return sendResponse(res, 401, message);
};

module.exports = {
  // Common
  commonAlreadyExistsResponse,
  commonInvalidItemsResponse,
  commonNotFoundResponse,
  commonUpdateSomeValuesResponse,

  // File
  fileUploadErrorResponse,

  // Form
  formInvalidEnumsResponse,
  formInvalidInputsResponse,
  formValidationResponse,

  // Rest
  restCreateResponse,
  restDeleteResponse,
  restFetchAllResponse,
  restFetchSingleResponse,
  restUpdateResponse,

  // Server
  serverErrorResponse,
  serverInternalResponse,

  // User
  noUserToLogoutResponse,
  userCookieGeneratedResponse,
  userForbiddenResponse,
  userInvalidCredentialsResponse,
  userLoginResponse,
  userLoggedoutAlreadyResponse,
  userLogoutResponse,
  userNotFoundResponse,
  userRegisterResponse,
  userTokenNoRegenResponse,
  userTokenRegenResponse,
  userTokenVerifyErrorResponse,
  userUnauthorizedResponse
};
