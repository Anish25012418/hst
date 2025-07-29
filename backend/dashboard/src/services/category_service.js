// Import - models
const model = require("../models/category_model");

// Get all the category ids from the database
const fetchAllCategoryIds = async () => {
  try {
    const categories = await model.find({}, "_id");
    const categoryIds = categories.map((category) => category._id.toString());
    return categoryIds;
  } catch (error) {
    console.error("Error fetching category IDs:", error);
    throw error;
  }
};

const fetchCategoriesByIds = async (ids) => {
  try {
    const categories = await model.find(
      { _id: { $in: ids } },
      "title slug _id"
    );
    return categories;
  } catch (error) {
    console.error("Error fetching categories by IDs:", error);
    throw error;
  }
};

const getNewMenuPattern = async (menu_pattern) => {
  try {
    // Get all unique category IDs from menu_pattern
    const uniqueCategoryIds = [
      ...new Set(menu_pattern.flatMap((item) => item.categoryIds)),
    ];

    // Fetch categories from the database
    const categories = await fetchCategoriesByIds(uniqueCategoryIds);

    // Create a map for quick lookup by ID
    const categoryMap = new Map();
    categories.forEach((category) => {
      categoryMap.set(category._id.toString(), {
        id: category._id.toString(),
        title: category.title,
        slug: category.slug,
      });
    });

    // Replace categoryIds with the corresponding title, slug, and id
    const newMenuPattern = menu_pattern.map((item) => {
      return {
        title: item?.title,
        // slug: toParamCase(item?.title),
        categories: item.categoryIds
          .map((id) => categoryMap.get(id))
          .filter(Boolean), // Filter out any unmatched IDs
      };
    });

    return newMenuPattern;
  } catch (error) {
    console.error("Error creating new menu pattern:", error);
    throw error;
  }
};


module.exports = {
  fetchAllCategoryIds,
  fetchCategoriesByIds,
  getNewMenuPattern,
};

// // Import - models
// const model = require("../models/category_model");

// // Get all the category ids from the database
// const fetchAllCategoryIds = async () => {
//   try {
//     const categories = await model.find({}, "_id");
//     const categoryIds = categories.map((category) => category._id.toString());
//     return categoryIds;
//   } catch (error) {
//     console.error("Error fetching category IDs:", error);
//     throw error;
//   }
// };

// const fetchCategoriesByIds = async (ids) => {
//   try {
//     const categories = await model.find(
//       { _id: { $in: ids } },
//       "title slug _id"
//     );
//     return categories;
//   } catch (error) {
//     console.error("Error fetching categories by IDs:", error);
//     throw error;
//   }
// };

// const getNewMenuPattern = async (menuPattern) => {
//   try {
//     // Extract unique category IDs from the menu pattern
//     const uniqueCategoryIds = Array.from(
//       new Set(menuPattern.flatMap((item) => item.categoryIds))
//     );

//     // Fetch categories from the database using unique IDs
//     const categories = await fetchCategoriesByIds(uniqueCategoryIds);

//     // Create a map of categories for quick lookup by ID
//     const categoryMap = new Map(
//       categories.map((category) => [
//         category._id.toString(),
//         {
//           id: category._id.toString(),
//           title: category.title,
//           slug: category.slug,
//         },
//       ])
//     );

//     // Map over menuPattern to replace category IDs with category details
//     return menuPattern.map((item) => ({
//       title: item?.title?.name?.trim(),
//       // slug: toParamCase(item?.title?.trim()),
//       categories: item.categoryIds
//         .map((id) => categoryMap.get(id))
//         .filter((category) => category !== undefined), // Filter out any unmatched IDs
//     }));
//   } catch (error) {
//     console.error("Error creating new menu pattern:", error.message || error);
//     throw new Error("Failed to create new menu pattern. Please try again.");
//   }
// };

// module.exports = {
//   fetchAllCategoryIds,
//   fetchCategoriesByIds,
//   getNewMenuPattern,
// };
