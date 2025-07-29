// Import - services
const { upload, getNameFromEmail } = require("../services/image_service");

// Middleware for uploading a single image
const uploadSingleImageMiddleware =
  ({ fieldName, limit, pathName, isUserModel }) =>
    (req, res, next) => {
      // console.log("limit", limit)
      upload({ limit: limit ?? 1, pathName }).single(fieldName)(
        req,
        res,
        (err) => {
          if (err) {
            console.error("Upload error:", err); // Logging for debugging
            return next(err);
          }
          // Pass in a variable to determine the unique image title
          if (isUserModel) {
            req.customName = getNameFromEmail(req?.body?.email);
          } else {
            req.customName = customName;
          }
          next();
        }
      );
    };

// Middleware for uploading multiple files
const uploadAnyFilesMiddleware = (params) => (req, res, next) => {
  // Params
  const {
    limit,
    pathName: p,
    customName,
    isImageTitle,
    isUserModel,
    isStaticPageModel,
  } = params;

  // In case of static page, the pathname will be different
  const { baseUrl, query } = req;
  const pathName = baseUrl === "/static_page" ? `${p}/${query.q}` : p;

  // New params
  const newParams = {
    limit: limit ?? 1,
    pathName,
    customName,
    isImageTitle,
    isUserModel,
    isStaticPageModel,
  };

  // Upload function
  upload(newParams).any()(req, res, (err) => {
    // Check for error
    if (err) {
      console.error("Upload error:", err); // Logging for debugging
      return next(err);
    }

    // When isImageTitle is true, set customName to the title from the request body
    if (isImageTitle) {
      req.customName = req?.body?.title || "default";

      // When isUserModel is true, set customName to the part of the email before the "@" symbol
    } else if (isUserModel) {
      req.customName = getNameFromEmail(req?.body?.email);

      // When it is a static_page model, set customName to the query parameter from the request body
    } else if (isStaticPageModel) {
      req.customName = req?.query?.q || "default";

      // When neither condition is true, use the provided customName
    } else {
      req.customName = customName;
    }

    next();
  });
};

module.exports = {
  uploadSingleImageMiddleware,
  uploadAnyFilesMiddleware,
};
