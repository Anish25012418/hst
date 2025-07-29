// Function to fetch and structure the home page data
export const fetchHomePageData = (response?: any) => {
  // Safely extract data with defaults to avoid undefined errors
  const {
    categories = [],
    subcategories = [],
    blogs = [],
    staticPages = [],
    categoryMenu = [],
  } = response?.getAllHomepage?.data ?? {};

  // Return the structured data
  return { categories, subcategories, blogs, staticPages, categoryMenu };
};
