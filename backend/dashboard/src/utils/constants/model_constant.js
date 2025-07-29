//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Types for category model
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const categoryEnums = {};
const categoryValidationFields = (type, req) => {
  // Variables
  const arr = Object.keys(req.body);
  const isAdd = type === "add";
  const allowedEnums = categoryEnums;
  const allowedMixed = ["description"];
  const allowedRequired = [
    "title",
    "description",
    // "imageCoverPic",
    // "imageThumbnailPic",
  ];

  // Ensure only allowed fields are included by filtereing through the keys
  const filteredEnums = categoryEnums;
  const filteredMixed = arr.filter((field) => allowedMixed.includes(field));
  const filteredRequired = arr.filter((field) =>
    allowedRequired.includes(field)
  );

  // Use the original validation for adding and filtered validation for editing
  const enums = isAdd ? allowedEnums : filteredEnums;
  const mixed = isAdd ? allowedMixed : filteredMixed;
  const required = isAdd ? allowedRequired : filteredRequired;

  return { enums, mixed, required };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Types for subcategory model
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const subcategoryEnums = {
  accommodation: [
    "Hotel",
    "Resort",
    "Camping",
    "Teahouse",
    "Homestay",
    "Glamping",
    "Other",
  ],
  bestSeason: [
    "Winter (Nov/Feb)",
    "Spring (Feb/May)",
    "Summer (May/Jun)",
    "Monsoon (Jul/Sept)",
    "Autumn (Oct/Nov)",
  ],
  excludes: [
    "International Flights",
    "Visa",
    "Personal Insurance",
    "Alcohol",
    "Mountain Bikes",
    "Tipping",
    "Personal Expenses",
    "Other"
  ],
  fitnessLevel: ["Beginner", "Novice", "Intermediate", "Advanced"],
  groupSize: ["Small (5-10)", "Medium (10-15)", "Large (15-20)", "Extra Large (20+)", "Min 2 Pax", "Max 16 Pax", "Private Groups Only"],
  includes: [
    "Meals",
    "Water",
    "First Aid Kit",
    "Repair Kit",
    "Helmet",
    "Protective Gear",
    "EBikes",
    "Accommodation",
    "Domestic Flights",
    "Permits",
    "Entry Fees",
    "Full Suspension Bikes",
    "Hartail Bikes",
    "Gravel Bikes",
    "Transportation",
    "Guides",
    "Porters",
  ],
  meals: ["Included", "Not Included", "Optional"],
  ridingSkill: [
    "Novice",
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
    "Professional",
    "Other",
    "Not Required"
  ],
  tourType: [
    "Multi-Adventure",
    "Cultural",
    "Trekking",
    "Cross-Country",
    "Downhill",
    "Enduro",
    "E-Bike",
    "Bikepacking",
    "Skills Clinic",
    "Gravel Biking",
    "Other",
  ],
  transportation: [
    "Car",
    "Bus",
    "Airplane",
    "Boat",
    "Private Jeep Transfers",
    "Other",
  ],
};
const subcategoryValidationFields = (type, req) => {
  // Variables
  const arr = Object.keys(req.body);
  const isAdd = type === "add";
  // const allowedDates = ["departureFrom"];
  const allowedDates = [""];
  const allowedEnums = subcategoryEnums;
  const allowedMixed = ["description", "overview"];
  const allowedRequired = [
    // "accommodation",
    // "bestSeason",
    "caption",
    "description",
    "destination",
    // "departureFrom",
    // "excludes",
    // "fitnessLevel",
    // "groupSize",
    // "imageCoverPic",
    // "imageExtraPic",
    // "imageGalleryPic",
    // "imageThumbnailPic",
    // "includes",
    "itinerary",
    // "meals",
    "numberOfDays",
    "overview",
    // "priceOffer",
    "priceOriginal",
    // "ridingSkill",
    "title",
    // "tourType",
    // "transportation",
  ];

  // Ensure only allowed fields are included by filtereing through the keys
  const filteredDates = arr.filter((field) => allowedDates.includes(field));
  const filteredEnums = Object.keys(subcategoryEnums)?.filter((item) =>
    arr.includes(item)
  );
  const filteredMixed = arr.filter((field) => allowedMixed.includes(field));
  const filteredRequired = arr.filter((field) =>
    allowedRequired.includes(field)
  );

  // Use the original validation for adding and filtered validation for editing
  const dates = isAdd ? allowedDates : filteredDates;
  const enums = isAdd ? allowedEnums : filteredEnums;
  const mixed = isAdd ? allowedMixed : filteredMixed;
  const required = isAdd ? allowedRequired : filteredRequired;

  return { dates, enums, mixed, required };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Types for user model
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const userEnums = {
  role: ["USER", "ADMIN"],
};
const userValidationFields = (type, req) => {
  // Variables
  const arr = Object.keys(req.body);
  const isAdd = type === "add";
  const allowedEnums = userEnums;
  const allowedRequired = ["fullName", "email", "password"];

  // Ensure only allowed fields are included by filtereing through the keys
  const filteredEnums = Object.keys(userEnums)?.filter((item) =>
    arr.includes(item)
  );
  const filteredRequired = arr.filter((field) =>
    allowedRequired.includes(field)
  );

  // Use the original validation for adding and filtered validation for editing
  const enums = isAdd ? allowedEnums : filteredEnums;
  const required = isAdd ? allowedRequired : filteredRequired;

  return { enums, required };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Types for blog model
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const blogEnums = {};
const blogValidationFields = (type, req) => {
  // Variables
  const arr = Object.keys(req.body);
  const isAdd = type === "add";
  const allowedEnums = blogEnums;
  const allowedMixed = ["content"];
  const allowedRequired = [
    "title",
    "author",
    // "imageCoverPic",
    // "imageThumbnailPic",
  ];

  // Ensure only allowed fields are included by filtereing through the keys
  const filteredEnums = blogEnums;
  const filteredMixed = arr.filter((field) => allowedMixed.includes(field));
  const filteredRequired = arr.filter((field) =>
    allowedRequired.includes(field)
  );

  // Use the original validation for adding and filtered validation for editing
  const enums = isAdd ? allowedEnums : filteredEnums;
  const mixed = isAdd ? allowedMixed : filteredMixed;
  const required = isAdd ? allowedRequired : filteredRequired;

  return { enums, mixed, required };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Types for static_page model
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const staticPageEnums = {};
const staticPageValidationFields = (type, req) => {
  // Variables
  const arr = Object.keys(req.body);
  const isAdd = type === "add";
  const allowedEnums = staticPageEnums;
  const allowedMixed = [];
  const allowedRequired = [
    "contactPage",
    "homePage",
    "hstPokharaPage",
    "ourTeamPage",
    "rentalPage",
    "socialResponsibilityPage",
    "workshopPage",
    "whyUsPage",
  ];

  // Ensure only allowed fields are included by filtereing through the keys
  const filteredEnums = staticPageEnums;
  const filteredMixed = arr.filter((field) => allowedMixed.includes(field));
  const filteredRequired = arr.filter((field) =>
    allowedRequired.includes(field)
  );

  // Use the original validation for adding and filtered validation for editing
  const enums = isAdd ? allowedEnums : filteredEnums;
  const mixed = isAdd ? allowedMixed : filteredMixed;
  const required = isAdd ? allowedRequired : filteredRequired;

  return { enums, mixed, required };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Types for category model
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const categoryMenuEnums = {};
const categoryMenuValidationFields = (type, req) => {
  // Variables
  const arr = Object.keys(req.body);
  const isAdd = type === "add";
  const allowedEnums = categoryEnums;
  const allowedMixed = ["menu_pattern"];
  const allowedRequired = [];

  // Ensure only allowed fields are included by filtereing through the keys
  const filteredEnums = categoryEnums;
  const filteredMixed = arr.filter((field) => allowedMixed.includes(field));
  const filteredRequired = arr.filter((field) =>
    allowedRequired.includes(field)
  );

  // Use the original validation for adding and filtered validation for editing
  const enums = isAdd ? allowedEnums : filteredEnums;
  const mixed = isAdd ? allowedMixed : filteredMixed;
  const required = isAdd ? allowedRequired : filteredRequired;

  return { enums, mixed, required };
};

// Exports
const model_constant = {
  // Category model
  categoryEnums,
  categoryValidationFields,

  // Category menu model
  categoryMenuEnums,
  categoryMenuValidationFields,

  // Subcategory model
  subcategoryEnums,
  subcategoryValidationFields,

  // User model
  userEnums,
  userValidationFields,

  // Blog model
  blogEnums,
  blogValidationFields,

  // Static page model
  staticPageEnums,
  staticPageValidationFields,
};
module.exports = model_constant;
