// Import - models
const itemModel = require("../models/category_menu_model");
// const categoryModel = require("../models/category_model");
const {
  fetchAllCategoryIds,
  getNewMenuPattern,
} = require("../services/category_service");

// Import - utils
const {
  categoryMenuValidationFields: validateModel,
} = require("../utils/constants/model_constant");
const rm = require("../utils/constants/response_constant");
const { checkSchemaValidity } = require("../utils/methods/mongo_methods");
const { isFirstObjSubset } = require("../utils/methods/object_methods");
const { validateFields } = require("../utils/validators");

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// Global variables
const MODEL_NAME = "category_menu";
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

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
    if (items?.length === 0) {
      const emptyItem = new itemModel({
        /* specify the default properties for an empty item here */
        // menu_pattern: categoryMenuJson,
        menu_pattern: [],
      });
      await emptyItem.save();

      // Fetch the items again to include the newly created empty item
      items = await itemModel.find({});
    }

    // // Modify the items to obtain a clean data
    // const resultItems = items?.map((item) => {
    //   const itemKeys = Object.keys(item.toObject());
    //   const newItem = { ...item.toObject() };

    //   const updatedItem = allPages.reduce((acc, singlePage) => {
    //     if (!itemKeys.includes(singlePage)) {
    //       acc[singlePage] = "";
    //     }
    //     return acc;
    //   }, newItem);

    //   return updatedItem;
    // });

    return rm.restFetchAllResponse(res, "(Category Menu)", items);
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
    const { menu_pattern } = req.body;

    // Validate invalid keys
    const invalidKeys = checkSchemaValidity(itemModel, req);
    if (Object.keys(invalidKeys).length > 0)
      return rm.formValidationResponse(res, invalidKeys);

    // Validation: Required fields
    const errorsValidation = validateFields({
      req,
      ...validateModel("edit", req),
    });

    // If there are missing fields, return an error response
    if (errorsValidation.length > 0) {
      return rm.formValidationResponse(res, errorsValidation);
    }

    // Check for default categoryIds in the database model
    const categoryIds = await fetchAllCategoryIds();

    // Fetch all the current ids from the request
    const currentIds = [
      ...new Set(menu_pattern?.flatMap((item) => item.categoryIds)),
    ];

    // console.log("currentIds", currentIds)
    // Check if the current Ids exist inside categoryIds
    const allIdsExist = currentIds?.every((id) => categoryIds.includes(id));
    if (!allIdsExist) return rm.commonInvalidItemsResponse(res, "categories");

    // Get the new menu pattern
    const newMenuPattern = await getNewMenuPattern(menu_pattern);

    // Check if the update fields are the same as the current item
    const currentItem = await itemModel.findById(id);
    const isEqual = isFirstObjSubset(newMenuPattern, currentItem.toObject());
    if (isEqual) return rm.commonUpdateSomeValuesResponse(res);

    // Perform the update operation
    const updatedItem = await itemModel.findByIdAndUpdate(
      id,
      { menu_pattern: newMenuPattern },
      {
        new: true,
      }
    );

    if (updatedItem) {
      return rm.restUpdateResponse(res, MODEL_NAME, updatedItem);
    } else {
      return rm.commonNotFoundResponse(res, MODEL_NAME);
    }
  } catch (error) {
    return rm.serverErrorResponse(res, error);
  }
};

module.exports = {
  getAllItems,
  updateItem,
};
