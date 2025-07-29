// Import - utils
import * as t from "@/utils/constants/toast-constants";

// Check if image is in proper format
export const checkImageFormat = (fileImg?: File | null) => {
  const acceptedImageTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    // "image/svg+xml",
    "image/webp",
  ];
  if (!fileImg) {
    return t.NULL_UNDEFINED_FILE_ERROR.msg;
  }
  if (fileImg.type && acceptedImageTypes.includes(fileImg.type)) {
    return "TRUE";
  } else {
    return t.NOT_ACCEPTED_IMAGE_ERROR.msg;
  }
};

// Function to check a single image or image URL
const checkSingleImage = (image: File | string) => {
  if (typeof image === "string") {
    return "FALSE";
  } else {
    return checkImageFormat(image);
  }
};

// Function to check an array of images or image URLs
export const checkImagesArray = (images: (File | string)[]) => {
  for (let image of images) {
    const result = checkSingleImage(image);
    if (result !== "TRUE") {
      return result;
    }
  }
  return "TRUE";
};

// Function to check all images in the parameters
// export const checkAllImages = (params: any) => {
//   // Destructure params
//   const {
//     imageCoverPicTemp,
//     imageThumbnailPicTemp,
//     // imageGalleryPicTemp,
//     // imageExtraPicTemp,
//   } = params;

//   if (imageCoverPicTemp) {
//     const coverPicResult = checkImagesArray(imageCoverPicTemp);
//     if (coverPicResult !== "TRUE") {
//       if (imageThumbnailPicTemp) {
//         console.log("imageThumbnailPicTemp", imageThumbnailPicTemp);
//         const thumbnailPicResult = checkSingleImage(imageThumbnailPicTemp);
//         if (thumbnailPicResult !== "TRUE") {
//           return thumbnailPicResult;
//         }
//       }
//     }
//   }

//   // if (imageExtraPicTemp) {
//   //   const extraPicResult = checkSingleImage(imageExtraPicTemp);
//   //   if (extraPicResult !== "TRUE") {
//   //     return extraPicResult;
//   //   }
//   // }

//   // if (imageGalleryPicTemp) {
//   //   const galleryPicResult = checkImagesArray(imageGalleryPicTemp);
//   //   if (galleryPicResult !== "TRUE") {
//   //     return galleryPicResult;
//   //   }
//   // }

//   return "TRUE";
// };

// Get image src
export const getImageSrc = (path?: string, param?: string) => {
  // Clean the path by replacing multiple underscores with a single underscore
  const cleanPath = path ? path.replace(/_+/g, "_") : "";

  // Construct the full image source URL
  return `${import.meta.env.VITE_IMAGE_HOST_URL}${
    param ? `/${param}` : ""
  }${cleanPath}`;
};

// Pass in any number you want to append to the filename
export const appendFirstToFileName = (
  filename: string | null | undefined,
  addon?: string | number
): string => {
  if (!filename) {
    return "Invalid filename";
  }

  const fileParts = filename.split(".");
  if (fileParts.length < 2) {
    return "Invalid filename format";
  }

  const extension = fileParts.pop();
  const baseName = fileParts.join(".");

  return `${addon ? `${addon}_` : ""}${baseName}.${extension}`;
};

// export const changeFileNameForImage = (
//   imageArr: File[],
//   selectedImage?: string,
//   addon?: string | number
// ): File[] | string => {
//   if (imageArr && Array.isArray(imageArr) && imageArr.length > 0) {
//     const modifiedFile = {
//       ...imageArr[0],
//       name: appendFirstToFileName(imageArr[0].name, addon),
//     };
//     return [modifiedFile] as File[];
//   }
//   return selectedImage ?? "default_image";
// };

// To update the names of files within an array of file objects
export const changeFileNameForImage = (
  imageArr: File[],
  selectedImage: string,
  addon?: string | number
): File[] | string => {
  // console.log(
  //   "imageArr && Array.isArray(imageArr)",
  //   imageArr && Array.isArray(imageArr)
  // );
  if (imageArr && Array.isArray(imageArr)) {
    const modifiedFiles: File[] = [];
    imageArr.forEach((file: File) => {
      const filename = appendFirstToFileName(file.name, addon);
      modifiedFiles.push(
        new File([file], filename, {
          type: file.type,
          lastModified: file.lastModified,
        })
      );
    });
    return modifiedFiles.length > 0 ? modifiedFiles : selectedImage;
  }
  return selectedImage ?? "";
};
