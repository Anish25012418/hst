// Import - models
const parentModel = require("../models/category_model");
const subcategoryModel = require("../models/subcategory_model");
const itemModel = require("../models/subcategory_draft_model");

// Import - services
const { convertMongoDecimalToString } = require("../services/default_service");
const { getImageFilenames } = require("../services/image_service");

// Import - utils
const { ALL_IMAGES } = require("../utils/constants/app_constant");
const { checkSchemaValidity } = require("../utils/methods/mongo_methods");
// const {
//   subcategoryValidationFields: validateModel,
// } = require("../utils/constants/model_constant");
const rm = require("../utils/constants/response_constant");
const {
  addValidProperty,
  // isFirstObjSubset,
} = require("../utils/methods/object_methods");
const { toSnakeCase, toParamCase } = require("../utils/methods/string_methods");
// const { validateFields } = require("../utils/validators");
const {
  deleteExistingModelImages,
} = require("../services/file_system_service");

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Global variables
const MODEL_NAME = "subcategory_draft";
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

// Create
const createItem = async (req, res) => {
  try {
    // Validate invalid keys
    const invalidKeys = checkSchemaValidity(itemModel, req);
    if (Object.keys(invalidKeys).length > 0)
      return rm.formValidationResponse(res, invalidKeys);

    // Validation: Check for  required fields
    // const errorsValidation = validateFields({
    //   req,
    //   ...validateModel("add", req),
    // });

    // If there are missing fields, return an error response
    // if (errorsValidation.length > 0) {
    //   return rm.formValidationResponse(res, errorsValidation);
    // }

    // Check for duplicate category
    const { title, categoryIds } = req?.body ?? {};
    const existingItem = await itemModel.findOne({ title });
    const existingItemInSubCategory = await subcategoryModel.findOne({ title });
    if (existingItem || existingItemInSubCategory) return rm.commonAlreadyExistsResponse(res, MODEL_NAME);

    // Retrieve documents with matching IDs
    const allTheRetrievedCategories = await parentModel.find({
      _id: { $in: categoryIds },
    });

    // Check if the length of retrieved documents matches the length of categoryIds
    if (allTheRetrievedCategories?.length > 0 && allTheRetrievedCategories?.length !== categoryIds?.length) {
      return res.status(400).json({ error: "Invalid categories." });
    }

    // Get the uploaded image directory & combine with req.body
    const images = getImageFilenames(req, "subcategory");
    // const images = getImageFilenames(req, MODEL_NAME);
    Object.assign(req.body, { ...images, slug: toParamCase(title) });

    const item = new itemModel(req.body);
    await item.save();

    return rm.restCreateResponse(res, MODEL_NAME, item);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

// Fetch all
const getAllItems = async (req, res) => {
  try {
    const items = await itemModel.find({}).populate("categoryIds");

    // Transform the price fields for each item and generate slug if it does not exist
    const transformedItems = items.map((model) => {
      const plainItem = model.toObject(); // Convert the Mongoose document to a plain object

      return {
        ...plainItem,
        slug: plainItem.slug || toParamCase(plainItem.title),
        slugs: plainItem.categoryIds?.map(({ title }) =>
          toParamCase(`${plainItem.title}/${title}`)
        ),
        priceOffer: convertMongoDecimalToString(plainItem.priceOffer),
        priceOriginal: convertMongoDecimalToString(plainItem.priceOriginal),
      };
    });

    return rm.restFetchAllResponse(res, MODEL_NAME, transformedItems);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

// Fetch single
const getItemById = async (req, res) => {
  try {
    const item = await itemModel
      .findById(req.params.id)
      .populate("categoryIds");

    if (!item) return rm.commonNotFoundResponse(res, MODEL_NAME);

    return rm.restFetchSingleResponse(res, MODEL_NAME, item);
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

// Update
const updateItem = async (req, res) => {
  try {
    // Varaibles
    const { id } = req.params;
    const updateFields = req?.body ?? {};

    // Validation : Invalid keys
    const invalidKeys = checkSchemaValidity(itemModel, req);
    if (Object.keys(invalidKeys).length > 0)
      return rm.formValidationResponse(res, invalidKeys);

    // Validation : Required fields
    // const errorsValidation = validateFields({
    //   req,
    //   ...validateFields("edit", req),
    // });

    // If there are missing fields, return an error response
    // if (errorsValidation.length > 0) {
    //   return rm.formValidationResponse(res, errorsValidation);
    // }

    // Fetch the current model from populate database
    const item = await itemModel.findById(id);
    const currentItem = item.toObject();
    const title = toSnakeCase(currentItem?.title);
    const newUpdateFields = { ...updateFields, ...(title ? { slug: toParamCase(title) } : {}) };

    // Save images
    // const images = getImageFilenames(req, MODEL_NAME);
    const images = getImageFilenames(req, "subcategory");
    // Check if the update fields are the same as the current model
    // const isEqual = isFirstObjSubset(
    //   { ...newUpdateFields, ...images },
    //   currentItem
    // );
    // if (isEqual) return rm.commonUpdateSomeValuesResponse(res);

    // Combine the req body with images from above
    ALL_IMAGES.forEach((key) => {
      const value = images[key];
      addValidProperty(newUpdateFields, key, value);
    });

    // Save the updated item object
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

// Delete
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await itemModel.findByIdAndDelete(id);

    // Return not found if the id has already been deleted
    if (!deletedItem) return rm.commonNotFoundResponse(res, MODEL_NAME);

    return rm.restDeleteResponse(res, MODEL_NAME, deletedItem);
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
