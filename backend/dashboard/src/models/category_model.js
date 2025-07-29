// Import - default
const { model, Schema } = require("mongoose");

// Import - utils
const {
  imageAttr,
  mixedAttr,
  stringAttr,
} = require("../utils/constants/model_attributes");

// Category schema in database
const categorySchema = new Schema(
  {
    title: stringAttr(),
    slug: stringAttr({ required: false }),
    description: mixedAttr(),
    imageCoverPic: imageAttr({ type: [String] }),
    imageThumbnailPic: imageAttr(),
    // relatedSubcategories: refAttr({ ref: "subcategory" }),
  },
  { timestamps: true }
);

// // Pre-save hook to save a slug as per the title
// categorySchema.pre("save", async function (next) {
//   try {
//     // Skip executing the logic inside the pre-save hook if the document being saved is not new
//     if (!this.isNew) return next();

//     // Generate and set the slug from the title
//     this.slug = toParamCase(this.title);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Category model
const categoryModel = model("category", categorySchema);

module.exports = categoryModel;
