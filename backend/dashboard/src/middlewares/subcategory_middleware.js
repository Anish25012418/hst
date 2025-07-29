// Import - models
const model = require("../models/subcategory_model")

// Fetch unique title for the model while updating its image files & so on
const fetchUpdateCustomName = async (req, res, next) => {
  try {
    const item = await model.findById(req.params.id).lean();
    if (!item) {
      const error = new Error(`Item with id ${req.params.id} not found`);
      error.status = 404; // Optionally set a status code
      throw error;
    }
    req.customName = item.title;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchUpdateCustomName,
};
