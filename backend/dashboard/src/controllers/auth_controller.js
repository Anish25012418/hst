// Import - models
const path = require("path");
const userModel = require("../models/user_model");

// Import - services
const { generateToken, verifyToken } = require("../services/auth_service");
const {
  deleteExistingModelImages,
  deleteFilesWithPrefix,
  getFolderFilesAndPatterns,
} = require("../services/file_system_service");
const {
  getImageFilenames,
  getNameFromEmail,
  handleUserImage,
} = require("../services/image_service");

// Import - utils
const { userValidationFields } = require("../utils/constants/model_constant");
const rm = require("../utils/constants/response_constant");
const { setCookie } = require("../utils/methods/browser_methods");
const { checkSchemaValidity } = require("../utils/methods/mongo_methods");
const {
  convertFileNameToSnakeCase,
} = require("../utils/methods/string_methods");
const { validateFields } = require("../utils/validators");

////////////////////////////////////////
////////////////////////////////////////
// Global variables
const MODEL_NAME = "user";
////////////////////////////////////////
////////////////////////////////////////

// Login
async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const encoded = await userModel.matchPasswordAndGenerateToken(
      email,
      password
    );
    const decoded = verifyToken(encoded);
    setCookie(res, "HST_TOKEN", encoded);
    return rm.userLoginResponse(res, decoded);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
}

// Logout
async function handleUserLogout(req, res) {
  try {
    const token = req.cookies["HST_TOKEN"];

    // Already logged out user
    if (!token) return rm.noUserToLogoutResponse(res);

    res.clearCookie("HST_TOKEN");
    return rm.userLogoutResponse(res);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
}

// Register
async function handleUserRegister(req, res) {
  try {
    // Validation: Check for  required fields
    const errorsValidation = validateFields({
      req,
      ...userValidationFields("add", req),
    });

    // If there are missing fields, return an error response
    if (errorsValidation.length > 0) {
      return rm.formValidationResponse(res, errorsValidation);
    }

    // Check if the email is already registered
    const { fullName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return rm.commonAlreadyExistsResponse(res, "Email");
    }

    // Get the uploaded image directory
    // const name = `${req?.file?.filename ?? "people-512x512.png"}`;
    // const imageProfilePic = getImageFilePath({ name, path: MODEL_NAME });
    // Get the uploaded image directory & combine with req.body
    const images = getImageFilenames(req, MODEL_NAME);

    // Create the user
    const user = await userModel.create({
      email,
      fullName,
      imageProfilePic: images?.imageThumbnailPic,
      password,
    });
    return rm.userRegisterResponse(res, user);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
}

// Regenerate token for authentication purpose
async function regenTokenForAuth(req, res) {
  try {
    const token = req.cookies["HST_TOKEN"];
    const decoded = verifyToken(token);

    // Return no token error response
    if (!token) return rm.userTokenNoRegenResponse(res);

    // Generate a new token and set is as cookie
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return rm.userNotFoundResponse(res);
    }
    const { encoded, payload } = generateToken(user);
    setCookie(res, "HST_TOKEN", encoded);

    return rm.userTokenRegenResponse(res, payload);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
}

// Update profile details
async function updateUserProfile(req, res) {
  try {
    // Variables
    const userId = req.query.id;
    const updateFields = req.body;
    const { fullName, password } = updateFields;

    // Validation : Invalid keys
    const invalidKeys = checkSchemaValidity(userModel, req);
    if (Object.keys(invalidKeys).length > 0)
      return rm.formValidationResponse(res, invalidKeys);

    // Find the user with that id
    const user = await userModel.findById(userId);

    // Validation in case no user is found
    if (!user) {
      return rm.userNotFoundResponse(res);
    }

    // Email
    // if (email && email !== user.email) {
    //   const existingUser = await userModel.findOne({ email });
    //   if (existingUser) {
    //     return rm.commonAlreadyExistsResponse(res, "Email");
    //   }
    //   user.email = email;
    // }

    // Full name
    if (fullName) {
      user.fullName = fullName;
    }

    // Password
    if (password) {
      // // Check the length of the new password before assigning
      // if (password.length > 128) {
      //   return rm.commonUpdateFailureResponse(res, "Password exceeds the maximum allowed length.");
      // }
      user.password = password; // Assign the new password
    }

    // Handle profile picture update
    const images = getImageFilenames(req, "user") ?? {};
    const uploadedImage = images?.restImages?.[0];

    // Variables for new image case
    let newNamePrefix, newImageName, newImageLocation;

    if (uploadedImage) {
      // New image details
      newNamePrefix = getNameFromEmail(user?.email);
      newImageName = `${newNamePrefix}_${convertFileNameToSnakeCase(
        uploadedImage?.split("/")?.pop()
      )}`;
      newImageLocation = `/images/uploads/user/thumbnail/${newImageName}`;

      // Set the profile image
      user.imageProfilePic = newImageLocation;
    }

    // Perform the update operation
    await user.save();

    if (uploadedImage) {
      // Delete the previous image files if they get updated
      // await deleteFilesWithPrefix({
      //   title: getNameFromEmail(user.toObject()?.email),
      //   model: "user",
      //   ...images,
      // });
      const folder = path.resolve(
        __dirname,
        "../../public/images/uploads/user/thumbnail"
      );
      await handleUserImage(newNamePrefix, folder, newImageName);
    }

    // Prettify only certain data to return as response
    const modifiedUser = {
      _id: user?._id,
      fullName: user?.fullName,
      email: user?.email,
      imageProfilePic: user?.imageProfilePic,
      role: user?.role,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };

    return rm.restUpdateResponse(res, "user", modifiedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return rm.serverErrorResponse(res, error);
  }
}

module.exports = {
  handleUserLogin,
  handleUserLogout,
  handleUserRegister,
  updateUserProfile,
  regenTokenForAuth,
};
