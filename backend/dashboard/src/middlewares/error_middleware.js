// Import - default
const multer = require("multer");

// Import - utils
const rm = require("../utils/constants/response_constant");

// File upload error middleware
const fileUploadErrorMiddleware = (error, req, res, next) => {
  try {
    // Handle Multer file upload errors
    if (error instanceof multer.MulterError) {
      return rm.fileUploadErrorResponse(res);
    }
  } catch (error) {
    return rm.serverInternalResponse(res, error);
  }
};

module.exports = { fileUploadErrorMiddleware };
