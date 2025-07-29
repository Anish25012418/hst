// Import - default
const { model, Schema } = require("mongoose");

// Import - utils
const { mixedAttr } = require("../utils/constants/model_attributes");

// Category schema in database
const draftSubcategorySchema = new Schema(
  {
    draftSubcategory: mixedAttr({ defaultValue: {} }),
  },
  { timestamps: true }
);

// // Pre-save hook to save a slug as per the title
// draftSubcategorySchema.pre("save", async function (next) {
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
const subcategoryDraftModel = model("subcategory_draft", draftSubcategorySchema);

module.exports = subcategoryDraftModel;
