// Import - default
const express = require("express");

// Import - controllers
const auth_controllers = require("../controllers/auth_controller");

// Import - middlewares
const {
  uploadAnyFilesMiddleware,
} = require("../middlewares/upload_middleware");
const { fetchUpdateCustomName } = require("../middlewares/auth_middleware");

// Global variables
const { Router } = express;
const {
  handleUserLogin,
  handleUserLogout,
  handleUserRegister,
  regenTokenForAuth,
  updateUserProfile,
} = auth_controllers;

// Initialize router
const router = Router();

////////////////////////////////////////
////////////////////////////////////////
// Global variables
const MODEL_NAME = "user";
////////////////////////////////////////
////////////////////////////////////////

// Login user
router.post("/login", handleUserLogin);

// Logout user
router.post("/logout", handleUserLogout);

// Regen token for user
router.post("/regen-auth-token", regenTokenForAuth);

// Register user
router.post(
  "/register",
  uploadAnyFilesMiddleware({
    limit: 1,
    pathName: MODEL_NAME,
    isUserModel: true,
  }),
  // uploadSingleImageMiddleware({
  // limit: 1,
  // fieldName: "imageProfilePic",
  // pathName: "user/profile",
  // }),
  handleUserRegister
);

// Update profile details
router.route("/update-profile").put(
  fetchUpdateCustomName,
  (req, res, next) =>
    uploadAnyFilesMiddleware({
      limit: 1,
      pathName: MODEL_NAME,
      customName: req.customName,
    })(req, res, next),
  updateUserProfile
);

module.exports = router;
