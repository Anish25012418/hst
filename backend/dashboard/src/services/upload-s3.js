const multer = require("multer");
const path = require("path");
const {
  toSnakeCase,
  convertFileNameToSnakeCase,
} = require("../utils/methods/string_methods");
const { putObject, listByPrefix, deleteMany } = require("./s3_service");

// ---------- helpers you already had ----------
const getActualFileName = (customName, fileOriginalName, title) => {
  const uniqueSuffix = toSnakeCase(customName) || `${title || ""}`;
  // Optional: add timestamp to avoid overwrites/cache collisions
  // const stamp = Date.now();
  return `${uniqueSuffix}_${convertFileNameToSnakeCase(fileOriginalName)}`;
};

const getNameFromEmail = (email) => {
  return toSnakeCase(email?.split("@")[0]) ?? "default";
};

// mirrors your field -> folder selection
function folderForField(fieldname) {
  if (fieldname === "imageCoverPic[]" || fieldname?.includes("imageCoverPic")) return "/cover";
  if (fieldname === "imageExtraPic" || fieldname?.includes("imageExtraPic")) return "/extra";
  if (fieldname === "imageGalleryPic[]" || fieldname?.includes("imageGalleryPic")) return "/gallery";
  if (
    ["imageThumbnailPic", "imageProfilePic"].includes(fieldname) ||
    fieldname?.includes("imageProfilePic") ||
    fieldname?.includes("imageThumbnailPic")
  ) return "/thumbnail";
  return "";
}

function s3UrlFromKey(key) {
  const base = process.env.ASSET_BASE_URL?.replace(/\/+$/, "");
  if (!base) {
    // fall back to virtual-hosted–style S3 URL
    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
  return `${base}/${key}`;
}

// Build the same structure your getImageFilenames returned (but with URLs)
function buildStructuredResultFromFiles(files, basePath, uniqueName) {
  const result = {};
  const imageFileName = (name, type, isPrimary) => {
    const pathPart = `${basePath}${type ? `/${type}` : ""}`;
    const finalName = isPrimary
      ? `${!uniqueName.endsWith("_") ? `${uniqueName}_` : uniqueName}${name}`
      : name;
    // Return a *path-like* string for compatibility, but we’ll store URL separately too
    return `/images/uploads/${pathPart}/${convertFileNameToSnakeCase(finalName)}`;
  };

  files.forEach((f) => {
    const { fieldname, originalname, s3Url } = f;
    const formattedName = imageFileName(originalname, null, true);

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

    // Also collect absolute URLs if you prefer to store URLs directly:
    result.urls ??= [];
    result.urls.push({ field: fieldname, url: s3Url });
  });

  return result;
}

// Delete old user images with prefix in S3 (analogue of your handleUserImage)
async function handleUserImageS3({ prefix, excludeKey }) {
  const Bucket = process.env.AWS_S3_BUCKET;
  const objects = await listByPrefix({ Bucket, Prefix: prefix });
  const toDelete = objects
    .map(o => o.Key)
    .filter(k => k !== excludeKey);
  await deleteMany({ Bucket, Keys: toDelete });
  return excludeKey;
}

// ---------- The actual upload middleware ----------
const memoryUpload = ({ limit }) =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: (limit ?? 20) * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(gif|jpg|jpeg|png|webp)$/i)) {
        return cb(new Error("Only image files are allowed!"));
      }
      cb(null, true);
    },
  });

const upload = (params) => memoryUpload(params);

module.exports = {
  getActualFileName,
  getNameFromEmail,
  folderForField,
  s3UrlFromKey,
  buildStructuredResultFromFiles,
  handleUserImageS3,
  upload,
}