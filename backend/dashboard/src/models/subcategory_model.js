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
const subcategorySchema = new Schema(
  {
    slug: stringAttr({ required: false }),
    accommodation: enumAttr({
      type: [String],
      enums: enums.accommodation,
    }),
    bestSeason: enumAttr({
      type: [String],
      enums: enums.bestSeason,
    }),
    categoryIds: refAttr({ ref: "category" }),
    caption: stringAttr({ maxlength: 100 }),
    departureFrom: dateAttr({ isArray: true, required: false }),
    description: mixedAttr(),
    destination: stringAttr(),
    excludes: enumAttr({
      type: [String],
      enums: enums.excludes,
    }),
    fitnessLevel: enumAttr({
      enums: enums.fitnessLevel,
      required: false
    }),
    groupSize: enumAttr({
      type: [String],
      enums: enums.groupSize,
    }),
    imageCoverPic: imageAttr({ type: [String] }),
    imageExtraPic: imageAttr(),
    imageGalleryPic: imageAttr({ type: [String] }),
    imageThumbnailPic: imageAttr(),
    includes: enumAttr({
      type: [String],
      enums: enums.includes,
    }),
    itinerary: stringArrayAttr(),
    meals: enumAttr({
      enums: enums.meals,
    }),
    numberOfDays: numberAttr(),
    overview: mixedAttr(),
    // priceOffer: decimalAttr({
    //   validate: {
    //     validator: validatePriceOffer,
    //     message: "PriceOffer should not be more than PriceOriginal",
    //   },
    // }),
    priceOffer: decimalAttr({ required: false }),
    priceOriginal: decimalAttr(),
    ridingSkill: enumAttr({
      enums: enums.ridingSkill,
      required: false
    }),
    // suggestedSubcategories: mixedAttr({ defaultValue: [] }),
    title: stringAttr({ unique: true }),
    tourType: enumAttr({
      type: [String],
      enums: enums.tourType,
    }),
    // trekkingGuide: stringAttr({ required: false }),
    transportation: enumAttr({
      type: [String],
      enums: enums.transportation,
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
const subcategoryModel = model("subcategory", subcategorySchema);

module.exports = subcategoryModel;
