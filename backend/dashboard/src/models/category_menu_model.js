// Import - default
const { model, Schema } = require("mongoose");

// Import - utils
const { mixedAttr } = require("../utils/constants/model_attributes");

// Global Variables
const MODEL_NAME = "category_menu";

// Model schema in database
const itemSchema = new Schema(
  {
    // title: stringAttr(),
    // categoryIds: refAttr({ ref: "category" }),
    menu_pattern: mixedAttr()
  },
  { timestamps: true }
);

// Model
const itemModel = model(MODEL_NAME, itemSchema);

module.exports = itemModel;
