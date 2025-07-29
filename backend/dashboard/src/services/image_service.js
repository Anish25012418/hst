// Package imports
const fs = require("fs");
const multer = require("multer");
const path = require("path");

// Import - utils
const {
  toSnakeCase,
  convertFileNameToSnakeCase,
} = require("../utils/methods/string_methods");

// Counter to keep track of file uploads
// let fileCounter = 0;

// Get actual file name
const getActualFileName = (customName, fileOriginalName, title) => {
  const uniqueSuffix = toSnakeCase(customName) || `${title || ""}`;
  const fileName = `${uniqueSuffix}_${convertFileNameToSnakeCase(
    fileOriginalName
  )}`;
  return fileName;
};

// Get image upload file path
const getImageFilePath = ({ name, path }) =>
  `/images/uploads/${path ?? ""}/${convertFileNameToSnakeCase(name)}`;

// Storage section
// Storage section
const storage = ({
  pathName,
  customName,
  isImageTitle,
  isUserModel,
  isStaticPageModel,
}) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      // Variables
      let folder = "";
      let fieldName = file?.fieldname;
      const newPath = pathName === "subcategory_draft" ? "subcategory" : pathName;

      switch (true) {
        case fieldName === "imageCoverPic[]" ||
          fieldName?.includes("imageCoverPic"):
          folder = "/cover";
          break;
        case fieldName === "imageExtraPic" ||
          fieldName?.includes("imageExtraPic"):
          folder = "/extra";
          break;
        case fieldName === "imageGalleryPic[]" ||
          fieldName?.includes("imageGalleryPic"):
          folder = "/gallery";
          break;
        case ["imageProfilePic", "imageThumbnailPic"].includes(fieldName) ||
          fieldName?.includes("imageProfilePic") ||
          fieldName?.includes("imageThumbnailPic"):
          folder = "/thumbnail";
          break;
      }

      // Resolve the full path
      const fullPath = path.resolve(
        __dirname,
        `../../public/images/uploads/${newPath}${folder}`
      );

      // Check if the directory exists, if not create it
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }

      // Finally save the file inside the designated folder
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      let currentTitle = "default";

      if (isImageTitle) {
        currentTitle = toSnakeCase(req?.body?.title);
      } else if (isUserModel) {
        currentTitle = getNameFromEmail(req?.body?.email);;
      } else if (isStaticPageModel) {
        currentTitle = toSnakeCase(req?.query?.q);
      }

      cb(null, getActualFileName(customName, file.originalname, currentTitle));
    },
  });
// const storage = ({
//   pathName,
//   customName,
//   isImageTitle,
//   isUserModel,
//   isStaticPageModel,
// }) =>
//   multer.diskStorage({
//     destination: (req, file, cb) => {
//       // Variables
//       let folder = "";
//       let fieldName = file?.fieldname;
//       // let filename = `/${getActualFileName(customName, file.originalname)}`;

//       // Pick which folder to choose from
//       // if (fieldName === "imageCoverPic[]") folder = "/cover";
//       // if (fieldName === "imageExtraPic") folder = "/extra";
//       // if (fieldName === "imageGalleryPic[]") folder = "/gallery";
//       // if (["imageProfilePic", "imageThumbnailPic"]?.includes(fieldName))
//       //   folder = "/thumbnail";

//       switch (true) {
//         case fieldName === "imageCoverPic[]" ||
//           fieldName?.includes("imageCoverPic"):
//           folder = "/cover";
//           break;
//         case fieldName === "imageExtraPic" ||
//           fieldName?.includes("imageExtraPic"):
//           folder = "/extra";
//           break;
//         case fieldName === "imageGalleryPic[]" ||
//           fieldName?.includes("imageGalleryPic"):
//           folder = "/gallery";
//           break;
//         case ["imageProfilePic", "imageThumbnailPic"].includes(fieldName) ||
//           fieldName?.includes("imageProfilePic") ||
//           fieldName?.includes("imageThumbnailPic"):
//           folder = "/thumbnail";
//           break;
//       }

//       // Finally save the file inside the designated folder
//       cb(
//         null,
//         path.resolve(
//           __dirname,
//           `../../public/images/uploads/${pathName}${folder}`
//         )
//       );
//     },
//     filename: (req, file, cb) => {
//       // const { title } = req.body;
//       // const uniqueSuffix = `${customName ? `${toSnakeCase(customName)}-` : ""}${Date.now()}-${fileCounter++}`;
//       // const uniqueSuffix = `${customName ? `${toSnakeCase(customName)}` : ""}`;
//       // const fileName = `${uniqueSuffix}-${file.originalname}`;

//       // If it is a new file, we will need to save it differently
//       let currentTitle = "default";

//       if (isImageTitle) {
//         currentTitle = toSnakeCase(req?.body?.title);
//       } else if (isUserModel) {
//         currentTitle = toSnakeCase(req?.body?.email.split("@")[0]);
//       } else if (isStaticPageModel) {
//         currentTitle = toSnakeCase(req?.query?.q);
//       }

//       cb(null, getActualFileName(customName, file.originalname, currentTitle));
//     },
//   });

// Create Multer middleware with the configured storage, file size limit, and file filter
// total params = {limit, pathName, customName, isImageTitle, isUserModel }
const upload = ({ limit, ...rest }) =>
  multer({
    storage: storage({ ...rest }),
    limits: { fileSize: (limit ?? 1) * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      // Check if the file type is an image and also check for JPG, PNG, and such files
      if (!file.originalname.match(/\.(gif|jpg|jpeg|png|webp)$/i)) {
        return cb(new Error("Only image files are allowed!"));
      }
      console.log("Image modified successfully!");
      cb(null, true);
    },
  });

// Get filenames of the uploaded files
// const getImageFilenames = (req, path) => {
//   // Destructure request
//   const { files, customName, body } = req ?? {};
//
//   // Variables
//   const uniqueName = customName || body?.title || "";
//   const allImages = [
//     "imageCoverPic[]",
//     "imageExtraPic",
//     "imageGalleryPic[]",
//     "imageThumbnailPic",
//     "imageProfilePic",
//   ];
//
//   // Helper function to get the image file name
//   // isPrimary denotes if it is a cover, extra, gallery or thumbnail pic
//   const imageFileName = (name, type, isPrimary) =>
//     getImageFilePath({
//       name: isPrimary
//         ? `${!uniqueName.endsWith("_") ? `${uniqueName}_` : uniqueName}${name}`
//         : name,
//       path: `${path}${type ? `/${type}` : ""}`,
//     });
//
//   // Get cover images
//   // const imageCoverPic = files?.filter((item) => item?.fieldname === "imageCoverPic[]")?.map((item) => imageFileName(item?.filename), path);
//   const imageCoverPic = files
//     ?.filter(({ fieldname }) => fieldname === "imageCoverPic[]")
//     ?.map(({ originalname }) => imageFileName(originalname, "cover", true));
//
//   // Get single extra image
//   const imageExtraPic = files
//     ?.filter(({ fieldname }) => fieldname === "imageExtraPic")
//     ?.map(({ originalname }) => imageFileName(originalname, "extra", true))[0];
//
//   // Get gallery images
//   const imageGalleryPic = files
//     ?.filter(({ fieldname }) => fieldname === "imageGalleryPic[]")
//     ?.map(({ originalname }) => imageFileName(originalname, "gallery", true));
//
//   // Get single thumbnail image
//   const imageThumbnailPic = files
//     ?.filter(({ fieldname }) =>
//       ["imageThumbnailPic", "imageProfilePic"]?.includes(fieldname)
//     )
//     ?.map(({ originalname }) =>
//       imageFileName(originalname, "thumbnail", true)
//     )[0];
//
//   // All the remaining images except the above ones
//   const restImages = files
//     ?.filter(({ fieldname }) => !allImages?.includes(fieldname))
//     ?.map(({ originalname }) => imageFileName(originalname));
//
//   const result = {
//     ...(imageCoverPic?.length > 0 && { imageCoverPic }),
//     ...(imageExtraPic && { imageExtraPic }),
//     ...(imageGalleryPic?.length > 0 && { imageGalleryPic }),
//     ...(imageThumbnailPic && { imageThumbnailPic }),
//     ...(restImages?.length > 0 && { restImages }),
//   };
//
//   return result;
// };

const getImageFilenames = (req, path) => {
  const { files, customName, body } = req ?? {};

  const uniqueName = customName || body?.title || "";
  const allImages = [
    "imageCoverPic[]",
    "imageExtraPic",
    "imageGalleryPic[]",
    "imageThumbnailPic",
    "imageProfilePic",
  ];

  const imageFileName = (name, type, isPrimary) =>
    getImageFilePath({
      name: isPrimary
        ? `${!uniqueName.endsWith("_") ? `${uniqueName}_` : uniqueName}${name}`
        : name,
      path: `${path}${type ? `/${type}` : ""}`,
    });

  const result = {};

  files?.forEach(({ fieldname, originalname }) => {
    const formattedName =  imageFileName(originalname, null, true);

    // Preserve existing keys
    if (fieldname === "imageCoverPic[]") {
      result.imageCoverPic ??= [];
      result.imageCoverPic.push(imageFileName(originalname, "cover", true));
    } else if (fieldname === "imageExtraPic") {
      result.imageExtraPic = imageFileName(originalname, "extra", true);
    } else if (fieldname === "imageGalleryPic[]") {
      result.imageGalleryPic ??= [];
      result.imageGalleryPic.push(imageFileName(originalname, "gallery", true));
    } else if (["imageThumbnailPic", "imageProfilePic"].includes(fieldname)) {
      result.imageThumbnailPic = imageFileName(originalname, "thumbnail", true);
    } else {
      result[fieldname] = formattedName;
      result.restImages ??= [];
      result.restImages.push(formattedName);
    }
  });

  return result;
};


// Get unique name for email
const getNameFromEmail = (email) => {
  const result = toSnakeCase(email?.split("@")[0]) ?? "default"
  return result;
}

async function handleUserImage(prefix, folderPath, excludeFileName) {
  try {
    // Read the contents of the folder
    const files = fs.readdirSync(folderPath);

    // Filter files that match the given prefix and are not the exclude file
    const filesWithPrefix = files.filter(file =>
      file.startsWith(prefix) && file !== excludeFileName
    );

    // Delete all files with the given prefix except the exclude file
    for (const file of filesWithPrefix) {
      fs.unlinkSync(path.join(folderPath, file));
    }

    console.log(`Deleted old images with prefix ${prefix} except ${excludeFileName}`);
    return excludeFileName;
  } catch (error) {
    console.error("Error handling user image:", error);
    throw error;
  }
}

module.exports = {
  getImageFilenames,
  getImageFilePath,
  getNameFromEmail,
  handleUserImage,
  upload,
};
