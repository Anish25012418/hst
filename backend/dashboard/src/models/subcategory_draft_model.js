// Import - default
const { model, Schema } = require("mongoose");

// Import - utils
const {
  dateAttr,
  decimalAttr,
  enumAttr,
  imageAttr,
  mixedAttr,
  numberAttr,
  refAttr,
  stringAttr,
  stringArrayAttr,
} = require("../utils/constants/model_attributes");
const { subcategoryEnums: enums } = require("../utils/constants/model_constant");

// Custom asynchronous validator function to check if priceOffer is not more than priceOriginal
// async function validatePriceOffer(value) {
//   const subcategory = this;
//   if (value > subcategory.priceOriginal) {
//     throw new Error("PriceOffer should not be more than PriceOriginal");
//   }
// }

// Subcategory schema in database
/**
 * @types
 * @String --------------> any variable
 * @[String] -------------> list of variables
 * @Schema.Types.Mixed ---> json variables
 * @enum ------------------> includes a set of predefined lists
 **/
const requiredFalse = { required: false }
const subcategorySchema = new Schema(
  {
    slug: stringAttr({ ...requiredFalse }),
    accommodation: enumAttr({
      type: [String],
      enums: enums.accommodation,
      ...requiredFalse
    }),
    bestSeason: enumAttr({
      type: [String],
      enums: enums.bestSeason,
      ...requiredFalse
    }),
    categoryIds: refAttr({ ref: "category", ...requiredFalse }),
    caption: stringAttr({ maxlength: 100, ...requiredFalse }),
    departureFrom: dateAttr({ ...requiredFalse, isArray: true }),
    description: mixedAttr({ ...requiredFalse }),
    destination: stringAttr({ ...requiredFalse }),
    excludes: enumAttr({
      type: [String],
      enums: enums.excludes,
      ...requiredFalse
    }),
    fitnessLevel: enumAttr({
      enums: enums.fitnessLevel,
      ...requiredFalse
    }),
    groupSize: enumAttr({
      enums: enums.groupSize,
      ...requiredFalse
    }),

    imageCoverPic: imageAttr({ type: [String], ...requiredFalse }),
    imageExtraPic: imageAttr({ ...requiredFalse }),
    imageGalleryPic: imageAttr({ type: [String], ...requiredFalse }),
    imageThumbnailPic: imageAttr({ ...requiredFalse }),
    includes: enumAttr({
      type: [String],
      enums: enums.includes,
      ...requiredFalse
    }),
    itinerary: stringArrayAttr({ ...requiredFalse }),
    meals: enumAttr({
      enums: enums.meals,
      ...requiredFalse
    }),
    numberOfDays: numberAttr({ ...requiredFalse }),
    overview: mixedAttr({ ...requiredFalse }),
    // priceOffer: decimalAttr({
    //   validate: {
    //     validator: validatePriceOffer,
    //     message: "PriceOffer should not be more than PriceOriginal",
    //   },
    // }),
    priceOffer: decimalAttr({ ...requiredFalse }),
    priceOriginal: decimalAttr({ ...requiredFalse }),
    ridingSkill: enumAttr({
      enums: enums.ridingSkill,
      ...requiredFalse
    }),
    // suggestedSubcategories: mixedAttr({ defaultValue: [], ...requiredFalse }),
    title: stringAttr({ unique: true, ...requiredFalse }),
    tourType: enumAttr({
      type: [String],
      enums: enums.tourType,
      ...requiredFalse
    }),
    trekkingGuide: stringAttr({ ...requiredFalse }),
    transportation: enumAttr({
      type: [String],
      enums: enums.transportation,
      ...requiredFalse
    }),
  },
  { timestamps: true }
);

// Pre-save hook to save a slug as per the title & filter out the current subcategory ID from suggestedSubcategories
subcategorySchema.pre("save", async function (next) {
  try {
    // Skip executing the logic inside the pre-save hook if the document being saved is not new
    if (!this.isNew) return next();

    // Generate and set the slug from the title
    // this.slug = sm.toParamCase(this.title);

    // Convert priceOffer and priceOriginal to fixed 2 decimals
    this.priceOffer = parseFloat(this.priceOffer).toFixed(2);
    this.priceOriginal = parseFloat(this.priceOriginal).toFixed(2);

    // Filter out the current subcategory ID from suggestedSubcategories
    // const suggestedSubcategories = await model("subcategory")
    //   .find({ _id: { $ne: this._id } })
    //   .limit(8);
    // this.suggestedSubcategories = suggestedSubcategories;
    next();
  } catch (error) {
    next(error);
  }
});

// User model
const subcategoryDraftModel = model("subcategory_draft", subcategorySchema);

module.exports = subcategoryDraftModel;
