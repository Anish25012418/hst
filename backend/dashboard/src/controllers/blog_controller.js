// Import - models
const itemModel = require("../models/blog_model");

// Import - services
const {deleteExistingModelImages} = require("../services/file_system_service");
const {getImageFilenames} = require("../services/image_service");

// Import - utils
const {
  blogValidationFields: validateModel,
} = require("../utils/constants/model_constant");
const rm = require("../utils/constants/response_constant");
const {checkSchemaValidity} = require("../utils/methods/mongo_methods");
const {
  addValidProperty,
  isFirstObjSubset,
} = require("../utils/methods/object_methods");
const {toParamCase, toSnakeCase} = require("../utils/methods/string_methods");
const {validateFields} = require("../utils/validators");

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Global variables
const MODEL_NAME = "blog";
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
    // Operation - Validation logic

    // Validate invalid keys
    const invalidKeys = checkSchemaValidity(itemModel, req);
    if (Object.keys(invalidKeys).length > 0)
      return rm.formValidationResponse(res, invalidKeys);

    // Validation: Check for  required fields
    const errorsValidation = validateFields({
      req,
      ...validateModel("add", req),
    });

    // If there are missing fields, return an error response
    if (errorsValidation.length > 0) {
      return rm.formValidationResponse(res, errorsValidation);
    }

    // Check for duplicate item
    const {title} = req.body;
    const existingItem = await itemModel.findOne({title});
    if (existingItem) return rm.commonAlreadyExistsResponse(res, MODEL_NAME);

    // Get the uploaded image directory & combine with req.body
    const images = getImageFilenames(req, MODEL_NAME);
    Object.assign(req.body, {...images, slug: toParamCase(title)});

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
    const {id} = req.params;
    const item = await itemModel.findById(id);

    // Validation when no item with given id is found
    if (!item) return rm.commonNotFoundResponse(res, MODEL_NAME);

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
    const {id} = req.params;
    const updateFields = req.body;

    //  Operation - Validation logic

    // Validate invalid keys
    const invalidKeys = checkSchemaValidity(itemModel, req);
    if (Object.keys(invalidKeys).length > 0)
      return rm.formValidationResponse(res, invalidKeys);

    //  Validation : Required fields
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
    const newUpdateFields = {...updateFields, ...(title ? {slug: toParamCase(title)} : {})};

    // Get the uploaded image directory
    const images = getImageFilenames(req, MODEL_NAME);

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
      ...(finalImageCoverPic.length > 0 && {imageCoverPic: finalImageCoverPic})
    };

    // Check if the update fields are the same as the current item
    const isEqual = isFirstObjSubset(
      {...newUpdateFields, ...finalImages},
      currentItem
    );
    if (isEqual) return rm.commonUpdateSomeValuesResponse(res);

    // Combine the req body with images from above
    ["imageCoverPic", "imageThumbnailPic"].forEach((key) => {
      const value = finalImages[key];
      addValidProperty(updateFields, key, value);
    });

    // Perform the update operation
    const updatedItem = await itemModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    try {
      if (updatedItem) {
        // Delete the previous image files if they get updated
        await deleteExistingModelImages({
          title, model: MODEL_NAME, ...images, retainingFiles: {
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
    const {id} = req.params;
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
