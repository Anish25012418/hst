// Import - default
const { model, Schema } = require("mongoose");

// Import - utils
const {
  mixedAttr,
  imageAttr,
  stringAttr,
} = require("../utils/constants/model_attributes");

// Global Variables
const MODEL_NAME = "static_page";

// Blog schema in database
const itemSchema = new Schema(
  {
    title: stringAttr({ defaultValue: "Title for single static page" }),

    // About page
    ourTeamPage: mixedAttr({ defaultValue: {} }),
    socialResponsibilityPage: mixedAttr({ defaultValue: {} }),
    whyUsPage: mixedAttr({ defaultValue: {} }),

    // Other static pages
    contactPage: mixedAttr({ defaultValue: {} }),
    homePage: mixedAttr({ defaultValue: {} }),
    hstPokharaPage: mixedAttr({ defaultValue: {} }),
    workshopPage: mixedAttr({ defaultValue: {} }),
    rentalPage: mixedAttr({ defaultValue: {} }),

    // Extra images section
    imageExtraPic: imageAttr(),
    imageGalleryPic: imageAttr({ type: [String] }),
    imageCoverPic: imageAttr({ type: [String] }),
    imageThumbnailPic: imageAttr(),
  },
  { timestamps: true }
);

// Blog model
const itemModel = model(MODEL_NAME, itemSchema);

module.exports = itemModel;
