// Import - default
const path = require("path");

// Import - models
const itemModel = require("../models/static_page_model");

// Import - services
const {
  deleteExistingModelImages,
  getFolderFilesAndPatterns,
  deleteFilesWithPrefix, getCleanedSortedFiles,
} = require("../services/file_system_service");
const {getImageFilenames} = require("../services/image_service");

// Import - utils
const {ALL_IMAGES} = require("../utils/constants/app_constant");
const {
  staticPageValidationFields: validateModel,
} = require("../utils/constants/model_constant");
const rm = require("../utils/constants/response_constant");
const {checkSchemaValidity} = require("../utils/methods/mongo_methods");
const {
  sortFilenames,
  addValidProperty, isFirstObjSubset,
} = require("../utils/methods/object_methods");
const {generateStaticPagesPaths} = require("../utils/methods/image_methods");
const {
  toSnakeCase,
  toTitleCase,
  snakeToCamelCase,
  toParamCase
} = require("../utils/methods/string_methods");
const {validateFields} = require("../utils/validators");
const {updateHomePaths} = require("../utils/methods/app_methods");

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Global variables
const MODEL_NAME = "static_page";
const allPages = [
  "whyUsPage",
  "contactPage",
  "homePage",
  "socialResponsibilityPage",
  "ourTeamPage",
  "hstPokharaPage",
  "workshopPage",
]; // List of all static pages
const all_pages = [
  "our_team",
  "social_responsibility",
  "rental",
  "workshop",
  "hst_pokhara",
];
const {imagePaths, folderPaths} = generateStaticPagesPaths(all_pages);

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Fetch all
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
const getAllItems = async (req, res) => {
  try {
    // Get all the items in the model
    let items = await itemModel.find({});

    // If no items found, create an empty item
    if (items.length === 0) {
      const emptyItem = new itemModel({
        /* specify the default properties for an empty item here */
      });
      await emptyItem.save();

      // Fetch the items again to include the newly created empty item
      items = await itemModel.find({});
    }

    // Modify the items to obtain a clean data
    const resultItems = items?.map((item) => {
      const itemKeys = Object.keys(item.toObject());
      const newItem = {...item.toObject()};

      const updatedItem = allPages.reduce((acc, singlePage) => {
        if (!itemKeys.includes(singlePage)) {
          acc[singlePage] = "";
        }
        return acc;
      }, newItem);

      return updatedItem;
    });

    return rm.restFetchAllResponse(res, MODEL_NAME, resultItems);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Update
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
const updateItem = async (req, res) => {
  try {
    // Variables
    const {body, params, query} = req;
    const {q} = query;
    const {id} = params;
    const pageName = `${snakeToCamelCase(q)}Page`;
    const deleteModel = `${MODEL_NAME}/${q}`;
    const deleteCustomTitle = `${q}`;

    // Validation: Check for invalid keys
    const invalidKeys = checkSchemaValidity(itemModel, req);
    if (Object.keys(invalidKeys).length > 0)
      return rm.formValidationResponse(res, invalidKeys);

    // Validation : Check for required fields
    const errorsValidation = validateFields({
      req,
      ...validateModel("edit", req),
    });

    // If there are missing fields, return an error response
    if (errorsValidation.length > 0) {
      return rm.formValidationResponse(res, errorsValidation);
    }

    // Fetch the current item from populate database
    const item = await itemModel.findById(id);
    const currentItem = item.toObject();
    const title = toSnakeCase(currentItem?.title);

    const updateFields = {...body, ...(title ? {slug: toParamCase(title)} : {})};
    // Get the uploaded image directory
    const images = getImageFilenames(req, `${MODEL_NAME}/${q}`);

    let finalImageCoverPic = [];
    let retainedImageCoverPic = [];

    // Check if the body is the same as the current item
    // const isEqual = isFirstObjSubset({ ...body, ...images }, currentItem);
    // if (isEqual) return rm.commonUpdateSomeValuesResponse(res);

    // Combine the req body with images from above
    if (Object.keys(images) !== 0) {
      ALL_IMAGES.forEach((key) => addValidProperty(body, key, images[key]));
    }
    if (pageName === "socialResponsibilityPage") {
      ////////////////////////////////////////
      ////////////////////////////////////////
      // Social Responsibility Page
      ////////////////////////////////////////
      ////////////////////////////////////////
      const folder = path.resolve(__dirname, folderPaths[q]);
      const prefix = `${imagePaths[q]}/`;
      const {sortedFolderFiles} = await getFolderFilesAndPatterns(
        folder,
        prefix,
        images?.restImages,
        q
      );

      // console.log("folderFiles", folderFiles)
      // console.log("sortedFolderFiles", sortedFolderFiles)
      // const sortedImages = sortFilenames(
      //   folderFiles,
      //   SOCIAL_RESPONSIBILITY_IMAGE_PATH
      // );

      // Loop through the sections and assign the sorted images
      // ["s1", "s2", "s3", "s4", "s5", "s6"].forEach((section, index) => {
      //   body[pageName] &&
      //     body[pageName][section] &&
      //     (body[pageName][section]["image"] = sortedFolderFiles[index]);
      // });

      const cleanedSortedFiles = sortedFolderFiles.map(filePath => {
        if (typeof filePath === 'string') {
          const pathParts = filePath.split('/');
          const filename = pathParts[pathParts.length - 1];

          // Remove duplicate prefix from filename
          const duplicatePrefix = `${q}_${q}_`;
          const singlePrefix = `${q}_`;

          let cleanedFilename = filename;
          if (filename.startsWith(duplicatePrefix)) {
            cleanedFilename = filename.replace(duplicatePrefix, singlePrefix);
          }

          // Rebuild the path with cleaned filename
          pathParts[pathParts.length - 1] = cleanedFilename;
          return pathParts.join('/');
        }
        return filePath;
      });

      if (body[pageName]) {
        const sections = Object.keys(body[pageName]).filter(key => key.match(/^s\d+$/));

        // Sort sections to ensure proper order (s1, s2, s3, etc.)
        sections.sort((a, b) => {
          const numA = parseInt(a.substring(1));
          const numB = parseInt(b.substring(1));
          return numA - numB;
        });

        // Assign cleaned images to sections
        sections.forEach((section, index) => {
          if (body[pageName][section] && cleanedSortedFiles[index]) {
            body[pageName][section]["image"] = cleanedSortedFiles[index];
          }
        });
      }

      ////////////////////////////////////////
      ////////////////////////////////////////
      // Our Team Page
      ////////////////////////////////////////
      ////////////////////////////////////////
    } else if (pageName === "ourTeamPage") {
      const folder = path.resolve(__dirname, folderPaths[q]);
      const prefix = `${imagePaths[q]}/`;

      const {sortedFolderFiles} = await getFolderFilesAndPatterns(
        folder,
        prefix,
        images?.restImages,
        q
      );
      const sortedImages = sortFilenames(sortedFolderFiles);

      // Parse page body
      let parsedBody;
      if (typeof body[pageName] === "string") {
        parsedBody = JSON.parse(body[pageName]);
      } else {
        parsedBody = body[pageName];
      }

      // Initialize arrays if they don't exist
      if (!parsedBody.teamFounders) parsedBody.teamFounders = [];
      if (!parsedBody.teamMembers) parsedBody.teamMembers = [];

      const replaceImagePlaceholders = (arr = []) =>
        arr.forEach((person) => {
          const imageKey = person.image;
          if (typeof imageKey === "string" && images[imageKey]) {
            person.image = images[imageKey];
          }
        });

      replaceImagePlaceholders(parsedBody.teamFounders);
      replaceImagePlaceholders(parsedBody.teamMembers);

      // Optional fallback: if you want to assign from sortedImages based on array position
      const foundersCount = parsedBody.teamFounders.length;
      parsedBody.teamFounders.forEach((founder, idx) => {
        if (!founder.image && idx < sortedImages.length) {
          founder.image = sortedImages[idx];
        }
      });

      const membersCount = parsedBody.teamMembers.length;
      const membersStartIndex = foundersCount; // Start after founders images
      parsedBody.teamMembers.forEach((member, idx) => {
        const imageIndex = membersStartIndex + idx;
        if (!member.image && imageIndex < sortedImages.length) {
          member.image = sortedImages[imageIndex];
        }
      });

      // Final assignment back to body
      body[pageName] = {...parsedBody};

      // Array.from(
      //   { length: 2 },
      //   (_, idx) => (parsedBody.teamFounders[idx].image = sortedImages[idx])
      // );
      // Array.from(
      //   { length: 8 },
      //   (_, idx) => (parsedBody.teamMembers[idx].image = sortedImages[idx + 2])
      // );


      ////////////////////////////////////////
      ////////////////////////////////////////
      // Rental Page
      ////////////////////////////////////////
      ////////////////////////////////////////
    } else if (pageName === "rentalPage") {
      const folder = path.resolve(__dirname, folderPaths[q]);
      const prefix = `${imagePaths[q]}/`;
      const {sortedFolderFiles} = await getFolderFilesAndPatterns(
        folder,
        prefix,
        images?.restImages,
        q
      );

      const cleanedSortedFiles = sortedFolderFiles.map(filePath => {
        if (typeof filePath === 'string') {
          const pathParts = filePath.split('/');
          const filename = pathParts[pathParts.length - 1];

          // Remove duplicate prefix from filename
          const duplicatePrefix = `${q}_${q}_`;
          const singlePrefix = `${q}_`;

          let cleanedFilename = filename;
          if (filename.startsWith(duplicatePrefix)) {
            cleanedFilename = filename.replace(duplicatePrefix, singlePrefix);
          }

          // Rebuild the path with cleaned filename
          pathParts[pathParts.length - 1] = cleanedFilename;
          return pathParts.join('/');
        }
        return filePath;
      });

      // const cleanedSortedFiles = getCleanedSortedFiles(sortedFolderFiles, q);

      const sortedImages = sortFilenames(cleanedSortedFiles);

      const excludedFiles = sortedImages?.map((item) =>
        path.basename(item)
      );

      // Start the delete operation, excluding the updated image paths
      await deleteFilesWithPrefix(
        folder,
        deleteCustomTitle ?? title,
        excludedFiles
      );

      // Check if body[pageName] is a string, then parse it
      let parsedBody;
      if (typeof body[pageName] === "string") {
        parsedBody = JSON.parse(body[pageName]);
      } else {
        parsedBody = body[pageName];
      }

      parsedBody["rental_image"] = sortedImages[0];
      parsedBody?.bike_gallery?.forEach((_, idx) => {
        parsedBody.bike_gallery[idx].image = sortedImages[idx + 1];
      });
      parsedBody?.ebike_gallery?.forEach((_, idx) => {
        parsedBody.ebike_gallery[idx].image = sortedImages[idx + 3];
      });

      // Safely assign the modified parsedBody back to body[pageName]
      body[pageName] = {...parsedBody};

      ////////////////////////////////////////
      ////////////////////////////////////////
      // HST Pokhara Page
      ////////////////////////////////////////
      ////////////////////////////////////////
    } else if (pageName === "hstPokharaPage") {
      const folder = path.resolve(__dirname, folderPaths[q]);

      // Check if body[pageName] is a string, then parse it
      let parsedBody;
      if (typeof body[pageName] === "string") {
        parsedBody = JSON.parse(body[pageName]);
      } else {
        parsedBody = body[pageName];
      }


      // Start the delete operation, excluding the updated image paths
      if (images?.restImages !== undefined) {
        // Update image paths by inserting 'cover' after 'home' and prepending a custom name or title
        const updatedImagePaths = updateHomePaths(
          images?.restImages || [],
          req.customName || body.title || ""
        );

        // Extract the base file names from the updated image paths
        const excludedFiles = updatedImagePaths?.map((item) =>
          path.basename(item)
        );

        await deleteFilesWithPrefix(folder, "hst_pokhara", excludedFiles);
        parsedBody["gallery"] = updatedImagePaths;
      }

      body[pageName] = {...parsedBody};

      ////////////////////////////////////////
      ////////////////////////////////////////
      // Workshop Page
      ////////////////////////////////////////
      ////////////////////////////////////////
    } else if (pageName === "workshopPage") {
      const folder = path.resolve(__dirname, folderPaths[q]);
      const prefix = `${imagePaths[q]}/`;
      const {sortedFolderFiles} = await getFolderFilesAndPatterns(
        folder,
        prefix,
        images?.restImages,
        q
      );

      const cleanedSortedFiles = sortedFolderFiles.map(filePath => {
        if (typeof filePath === 'string') {
          const pathParts = filePath.split('/');
          const filename = pathParts[pathParts.length - 1];

          // Remove duplicate prefix from filename
          const duplicatePrefix = `${q}_${q}_`;
          const singlePrefix = `${q}_`;

          let cleanedFilename = filename;
          if (filename.startsWith(duplicatePrefix)) {
            cleanedFilename = filename.replace(duplicatePrefix, singlePrefix);
          }

          // Rebuild the path with cleaned filename
          pathParts[pathParts.length - 1] = cleanedFilename;
          return pathParts.join('/');
        }
        return filePath;
      });

      const sortedImages = sortFilenames(cleanedSortedFiles);

      const excludedFiles = sortedImages?.map((item) =>
        path.basename(item)
      );

      // Start the delete operation, excluding the updated image paths
      await deleteFilesWithPrefix(
        folder,
        deleteCustomTitle ?? title,
        excludedFiles
      );

      // Check if body[pageName] is a string, then parse it
      let parsedBody;
      if (typeof body[pageName] === "string") {
        parsedBody = JSON.parse(body[pageName]);
      } else {
        parsedBody = body[pageName];
      }

      // Update the body with the new images
      Array.from(
        {length: 6},
        (_, idx) => (parsedBody.list[idx].image = sortedImages[idx])
      );
      parsedBody.workshopThumbnailPic = sortedImages.at(6);
      parsedBody.brand_gallery = sortedImages.slice(7, 10);
      body[pageName] = {...parsedBody};
      ////////////////////////////////////////
      ////////////////////////////////////////
      // Home Page
    } else if (pageName === "homePage") {
      if (Array.isArray(body.imageCoverPic)) {
        body.imageCoverPic.forEach((item, index) => {
          if (typeof item === "string" && item.trim() !== "") {
            retainedImageCoverPic.push(item);
            finalImageCoverPic.push(item);
          }
        });
      } else if (typeof body.imageCoverPic === "string") {
        try {
          const parsedImages = JSON.parse(body.imageCoverPic);
          if (Array.isArray(parsedImages)) {
            parsedImages.forEach((item, index) => {
              if (typeof item === "string" && item.trim() !== "") {
                retainedImageCoverPic.push(item);
                finalImageCoverPic.push(item);
              }
            });
          }
        } catch (e) {
          if (body.imageCoverPic.trim() !== "") {
            retainedImageCoverPic.push(body.imageCoverPic);
            finalImageCoverPic.push(body.imageCoverPic);
          }
        }
      }

      // Check if imageCoverPic is inside homePage object
      if (Array.isArray(body[pageName]?.imageCoverPic)) {
        body[pageName].imageCoverPic.forEach((item, index) => {
          if (typeof item === "string" && item.trim() !== "" && !finalImageCoverPic.includes(item)) {
            retainedImageCoverPic.push(item);
            finalImageCoverPic.push(item);
          }
        });
      }

      // Check if this is a text-only update or intentional image deletion
      const hasImageRelatedFields = 'imageCoverPic' in req.body ||
        (req.files && Object.keys(req.files).length > 0) ||
        (images && Object.keys(images).length > 0);

      // IMPROVED LOGIC: Better detection of text-only vs image operations
      if (retainedImageCoverPic.length === 0 &&
        currentItem.imageCoverPic &&
        currentItem.imageCoverPic.length > 0) {

        if (!hasImageRelatedFields) {
          // This is a text-only update, preserve existing images
          currentItem.imageCoverPic.forEach(item => {
            if (typeof item === "string" && item.trim() !== "") {
              retainedImageCoverPic.push(item);
              finalImageCoverPic.push(item);
            }
          });
        }
      }

      // Process new images if they exist
      if (images?.restImages?.length) {
        const updatedImagePaths = updateHomePaths(
          images?.restImages,
          req.customName || body.title || ""
        );

        // Clean duplicate prefixes
        const cleanedImagePaths = updatedImagePaths.map(filePath => {
          if (typeof filePath === 'string') {
            const pathParts = filePath.split('/');
            const filename = pathParts[pathParts.length - 1];

            const duplicatePrefix = `${q}_${q}_`;
            const singlePrefix = `${q}_`;

            let cleanedFilename = filename;
            if (filename.startsWith(duplicatePrefix)) {
              cleanedFilename = filename.replace(duplicatePrefix, singlePrefix);
            }

            pathParts[pathParts.length - 1] = cleanedFilename;
            return pathParts.join('/');
          }
          return filePath;
        });

        finalImageCoverPic = [...finalImageCoverPic, ...cleanedImagePaths];
      }

      const finalImages = {
        ...images,
        ...(finalImageCoverPic.length >= 0 && { imageCoverPic: finalImageCoverPic }), // Changed > 0 to >= 0
      };

      const isEqual = isFirstObjSubset(
        {
          ...updateFields,
          ...finalImages,
        },
        currentItem
      );

      if (isEqual) {
        return rm.commonUpdateSomeValuesResponse(res);
      }

      // Set imageCoverPic at the root level
      body.imageCoverPic = finalImageCoverPic;
    }

// Don't override updateFields with body[pageName] for homePage
    if (pageName !== "homePage") {
      updateFields[pageName] = body[pageName];
    }

// For homePage, include imageCoverPic in updateFields
    if (pageName === "homePage") {
      updateFields.imageCoverPic = body.imageCoverPic || [];

      if (body[pageName]) {
        updateFields[pageName] = body[pageName];
      }
    }

// CRITICAL FIX: Store old images BEFORE database update
    const oldImages = currentItem.imageCoverPic ? [...currentItem.imageCoverPic] : [];

// Perform the update operation
    const updatedItem = await itemModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    try {
      if (updatedItem) {
        if (pageName === "homePage") {

          // IMPROVED CLEANUP LOGIC
          const folder = path.resolve(__dirname, `../../public/images/uploads/${deleteModel}/cover`);

          // Calculate which files should be deleted (old files - new files)
          const filesToDelete = [];
          const newImageFilenames = finalImageCoverPic.map(dbPath => path.basename(dbPath));

          oldImages.forEach(oldImagePath => {
            const oldFilename = path.basename(oldImagePath);
            if (!newImageFilenames.includes(oldFilename)) {
              filesToDelete.push(oldFilename);
            }
          });

          if (filesToDelete.length > 0) {

            // DELETE SPECIFIC FILES instead of using deleteFilesWithPrefix
            const fs = require('fs').promises;

            for (const filename of filesToDelete) {
              try {
                const filePath = path.join(folder, filename);
                await fs.unlink(filePath);
              } catch (error) {
                console.log(`Failed to delete ${filename}:`, error.message);
              }
            }
          }

        } else {
          // Regular cleanup for other pages
          const shouldRunCleanup = retainedImageCoverPic.length > 0 || finalImageCoverPic.length === 0;

          if (shouldRunCleanup) {
            await deleteExistingModelImages({
              title,
              model: deleteModel,
              customTitle: deleteCustomTitle,
              ...images,
              retainingFiles: undefined,
            });
          }
        }

        return rm.restUpdateResponse(
          res,
          `${toTitleCase(MODEL_NAME)} - ${toTitleCase(q)}`,
          updatedItem
        );
      }
    } catch (error) {
      console.error("Error in cleanup:", error);
    }
  } catch (error) {
    console.error("Error in updateItem:", error);
  }
};

module.exports = {
  getAllItems,
  updateItem,
};
