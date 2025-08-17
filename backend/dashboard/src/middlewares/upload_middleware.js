// Import - services
// const { upload, getNameFromEmail } = require("../services/image_service");
const {
  toSnakeCase,
  convertFileNameToSnakeCase,
} = require("../utils/methods/string_methods");
// Middleware for uploading a single image
const {upload, s3UrlFromKey, buildStructuredResultFromFiles, getActualFileName, getNameFromEmail, folderForField} = require("../services/upload-s3");
const {putObject} = require("../services/s3_service");
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
// const uploadAnyFilesMiddleware = (params) => (req, res, next) => {
//   // Params
//   const {
//     limit,
//     pathName: p,
//     customName,
//     isImageTitle,
//     isUserModel,
//     isStaticPageModel,
//   } = params;
//
//   // In case of static page, the pathname will be different
//   const { baseUrl, query } = req;
//   const pathName = baseUrl === "/static_page" ? `${p}/${query.q}` : p;
//
//   // New params
//   const newParams = {
//     limit: limit ?? 1,
//     pathName,
//     customName,
//     isImageTitle,
//     isUserModel,
//     isStaticPageModel,
//   };
//
//   // Upload function
//   upload(newParams).any()(req, res, (err) => {
//     // Check for error
//     if (err) {
//       console.error("Upload error:", err); // Logging for debugging
//       return next(err);
//     }
//
//     // When isImageTitle is true, set customName to the title from the request body
//     if (isImageTitle) {
//       req.customName = req?.body?.title || "default";
//
//       // When isUserModel is true, set customName to the part of the email before the "@" symbol
//     } else if (isUserModel) {
//       req.customName = getNameFromEmail(req?.body?.email);
//
//       // When it is a static_page model, set customName to the query parameter from the request body
//     } else if (isStaticPageModel) {
//       req.customName = req?.query?.q || "default";
//
//       // When neither condition is true, use the provided customName
//     } else {
//       req.customName = customName;
//     }
//
//     next();
//   });
// };

const uploadAnyFilesMiddleware = (params) => (req, res, next) => {
  const {
    limit,
    pathName: p,
    customName,
    isImageTitle,
    isUserModel,
    isStaticPageModel,
  } = params;

  const { baseUrl, query } = req;
  const pathName = baseUrl === "/static_page" ? `${p}/${query.q}` : p;

  const newParams = {
    limit: limit ?? 1,
    pathName,
    customName,
    isImageTitle,
    isUserModel,
    isStaticPageModel,
  };

  upload(newParams).any()(req, res, async (err) => {
    if (err) return next(err);

    // ----- compute req.customName same as before -----
    if (isImageTitle) {
      req.customName = req?.body?.title || "default";
    } else if (isUserModel) {
      req.customName = getNameFromEmail(req?.body?.email);
    } else if (isStaticPageModel) {
      req.customName = req?.query?.q || "default";
    } else {
      req.customName = customName;
    }

    try {
      const Bucket = process.env.AWS_S3_BUCKET;
      const region = process.env.AWS_REGION;

      const newPath = pathName === "subcategory_draft" ? "subcategory" : pathName;

      // upload each file buffer to S3
      await Promise.all(
        (req.files || []).map(async (file) => {
          const folder = folderForField(file.fieldname); // e.g. "/cover"
          const currentTitle =
            isImageTitle
              ? toSnakeCase(req?.body?.title)
              : isUserModel
                ? getNameFromEmail(req?.body?.email)
                : isStaticPageModel
                  ? toSnakeCase(req?.query?.q)
                  : "default";

          const fileName = getActualFileName(req.customName, file.originalname, currentTitle);

          // Build S3 key that mirrors your old local structure:
          // images/uploads/${newPath}${folder}/${fileName}
          const Key = `images/uploads/${newPath}${folder}/${convertFileNameToSnakeCase(fileName)}`;

          // Cache-Control: choose based on whether you overwrite keys
          const CacheControl = "public, max-age=31536000, immutable"; // safe if keys are unique

          await putObject({
            Bucket,
            Key,
            Body: file.buffer,
            ContentType: file.mimetype,
            CacheControl,
          });

          // attach S3 info to each file
          file.s3Key = Key;
          file.s3Url = s3UrlFromKey(Key);
        })
      );

      // Optional: build a structured result similar to getImageFilenames
      const uniqueName = req.customName || req?.body?.title || "";
      req.uploadedImages = buildStructuredResultFromFiles(req.files || [], newPath, uniqueName);

      // If you previously deleted siblings with same prefix, call handleUserImageS3 here:
      // await handleUserImageS3({ prefix: `images/uploads/${newPath}/thumbnail/${toSnakeCase(uniqueName)}`, excludeKey: someKey });

      next();
    } catch (e) {
      console.error("S3 upload error:", e);
      next(e);
    }
  });
};

module.exports = {
  uploadSingleImageMiddleware,
  uploadAnyFilesMiddleware,
};
