// Import - models
const itemModel = require("../models/category_model");
// const subcategoryModel = require("../models/subcategory_model");

// Import - services
const { getImageFilenames } = require("../services/image_service");
const {
  deleteExistingModelImages,
} = require("../services/file_system_service");

// Import - utils
const {
  categoryValidationFields: validateModel,
} = require("../utils/constants/model_constant");
const rm = require("../utils/constants/response_constant");
const { checkSchemaValidity } = require("../utils/methods/mongo_methods");
const {
  addValidProperty,
  isFirstObjSubset,
} = require("../utils/methods/object_methods");
const { toParamCase, toSnakeCase } = require("../utils/methods/string_methods");
const { validateFields } = require("../utils/validators");
const {mergeRetainedImages} = require("../utils/methods/image_methods");

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Global variables
const MODEL_NAME = "category";
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Create
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
const createItem = async (req, res) => {
  try {
    // Validation: Invalid keys
    const invalidKeys = checkSchemaValidity(itemModel, req);
    if (Object.keys(invalidKeys).length > 0)
      return rm.formValidationResponse(res, invalidKeys);

    // Validation: required fields
    const errorsValidation = validateFields({
      req,
      ...validateModel("add", req),
    });

    // If there are missing fields, return an error response
    if (errorsValidation.length > 0) {
      return rm.formValidationResponse(res, errorsValidation);
    }

    // Check for duplicate model
    const { title } = req.body;
    const existingCategory = await itemModel.findOne({ title });
    if (existingCategory)
      return rm.commonAlreadyExistsResponse(res, MODEL_NAME);

    // Get the uploaded image directory & combine with req.body
    const images = getImageFilenames(req, MODEL_NAME);
    Object.assign(req.body, { ...images, slug: toParamCase(title) });

    const item = new itemModel(req.body);
    await item.save();

    return rm.restCreateResponse(res, MODEL_NAME, item);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Fetch all
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
const getAllItems = async (req, res) => {
  try {
    const items = await itemModel.find({});

    // Populate foreign key individually and add slug if it doesn't exist
    for (const item of items) {
      // Add slug if it doesn't exist
      if (!item.slug) {
        item.slug = toParamCase(item.title);
        await item.save(); // Save the updated item with the new slug
      }

      // const subcategories = await subcategoryModel.find({
      //   categoryIds: { $in: item._id },
      // });
      // item.relatedSubcategories = subcategories;
    }

    return rm.restFetchAllResponse(res, MODEL_NAME, items);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Fetch single
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemModel.findById(id);

    // Validation when no model with given id is found
    if (!item) return rm.commonNotFoundResponse(res, MODEL_NAME);

    // // Populate subcategories of model
    // const subcategories = await subcategoryModel.find({
    //   categoryIds: { $in: item._id },
    // });
    // item.relatedSubcategories = subcategories;

    return rm.restFetchSingleResponse(res, MODEL_NAME, item);
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
    const { id } = req.params;
    const updateFields = req.body;

    // Validation : Validate invalid keys
    const invalidKeys = checkSchemaValidity(itemModel, req);
    if (Object.keys(invalidKeys).length > 0) {
      return rm.formValidationResponse(res, invalidKeys);
    }

    // Validation : Required fields
    const errorsValidation = validateFields({
      req,
      ...validateModel("edit", req),
    });

    // If there are missing fields, return an error response
    if (errorsValidation.length > 0) {
      return rm.formValidationResponse(res, errorsValidation);
    }

    // Fetch the current model from populate database
    const item = await itemModel.findById(id);
    const currentItem = item.toObject();
    const title = toSnakeCase(currentItem?.title);
    const newUpdateFields = { ...updateFields, ...(title ? { slug: toParamCase(title) } : {}) };

    // Get the uploaded image directory
    const images = getImageFilenames(req, MODEL_NAME);

    // Process imageCoverPic to separate existing and new images
    let finalImageCoverPic = [];
    let retainedImageCoverPic = [];

    if (updateFields.imageCoverPic && Array.isArray(updateFields.imageCoverPic)) {
      updateFields.imageCoverPic.forEach((item, index) => {
        // If it's a string (existing image path), add to retained
        if (typeof item === 'string') {
          retainedImageCoverPic.push(item);
          finalImageCoverPic.push(item);
        }
        // File objects will be handled by newImages from multer
      });

      // Add newly uploaded images
      if (images.imageCoverPic && images.imageCoverPic.length > 0) {
        finalImageCoverPic = [...finalImageCoverPic, ...images.imageCoverPic];
      }
    }

    const finalImages = {
      ...images,
      ...(finalImageCoverPic.length > 0 && { imageCoverPic: finalImageCoverPic })
    };

    // Validation : Check if the update fields are the same as the current model
    const isEqual = isFirstObjSubset(
      {
        ...newUpdateFields,
        ...finalImages,
      },
      currentItem
    );
    if (isEqual) {
      return rm.commonUpdateSomeValuesResponse(res);
    }

    // Combine the req body with images from above
    ["imageCoverPic", "imageThumbnailPic"].forEach((key) => {
      const value = finalImages[key];
      addValidProperty(newUpdateFields, key, value);
    });

    // Perform the update operation
    const updatedItem = await itemModel.findByIdAndUpdate(id, newUpdateFields, {
      new: true,
    });

    try {
      if (updatedItem) {
        // Delete the previous image files if they get updated
        await deleteExistingModelImages({
          title,
          model: MODEL_NAME,
          ...images,
          retainingFiles: {
            imageCoverPic: retainedImageCoverPic
          },
        });

        return rm.restUpdateResponse(res, MODEL_NAME, updatedItem);
      }
    } catch (error) {
      console.error("Error in deleteFilesWithPrefix:", error);
    }
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Delete
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await itemModel.findByIdAndDelete(id);

    if (!item) return rm.commonNotFoundResponse(res, MODEL_NAME);

    return rm.restDeleteResponse(res, MODEL_NAME, item);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
};
