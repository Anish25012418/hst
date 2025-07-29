// Import - utils
import { SubcategoryEnumSchema } from "@/utils/schemas/OthersSchema";

// Enums used in user model
export const userEnums = {
  role: ["USER", "ADMIN"],
};

// Enums used in subcategory model
export const subcategoryEnums = {
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
// Enums used in multiple inputs of subcategory model
export const subCategoryMultiEnums: Array<SubcategoryEnumSchema> = [
  "accommodation",
  "bestSeason",
  "excludes",
  "includes",
  "tourType",
  "transportation",
  "groupSize",
];
