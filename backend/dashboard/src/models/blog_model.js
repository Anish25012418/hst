// Import - default
const {model, Schema} = require("mongoose");

// Import - utils
const {imageAttr, mixedAttr, stringAttr} = require("../utils/constants/model_attributes");

// Global Variables
const MODEL_NAME = "blog";

// Blog schema in database
const itemSchema = new Schema(
  {
    title: {type: String, required: true},
    slug: stringAttr({required: false}),
    content: mixedAttr(),
    author: {type: String, required: true},
    imageCoverPic: imageAttr({type: [String]}),
    imageThumbnailPic: imageAttr(),
  },
  {timestamps: true}
);

// Blog model
const itemModel = model(MODEL_NAME, itemSchema);

module.exports = itemModel;
