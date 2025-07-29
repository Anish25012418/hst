/* eslint-disable @typescript-eslint/no-explicit-any */
// Non-package imports
import { UserSchema } from "../schemas/AuthSchema";

// Display functions
const displayError = (error: string) => ({ error });
const displayDetailedError = (msg: string, error: any) => ({
  error: `${msg}: ${error.msg}`,
});
const displayMessage = (message: string) => ({ message });
const displayMessageWithUser = (message: string, user: any) => ({
  message,
  user,
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Messages start
//////////////////////////////////////////////////
//////////////////////////////////////////////////
export const REGISTERED_USER_MSG = (user: UserSchema) =>
  displayMessageWithUser("Registered user successfully.", user);

export const LOGIN_USER_MSG = (user: any) =>
  displayMessageWithUser("Logged in user successfully.", user);
export const GENERATED_COOKIE = displayMessage(
  "Generated token and set it as cookie successfully."
);

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Messages end
//////////////////////////////////////////////////
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Errors start
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// File errors
export const FILE_UPLOAD_ERROR = (error: any) =>
  displayDetailedError("File upload error", error);

// Authentication errors
export const INVALID_AUTH_CREDENTIALS = displayError(
  "Invalid username or password"
);
export const EMAIL_ALREADY_EXISTS = displayError("Email already exists");

// Server errors
export const SERVER_ERROR = displayError("Internal server error");
//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Errors end
//////////////////////////////////////////////////
//////////////////////////////////////////////////
