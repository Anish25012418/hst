// Imports - default
const { Router } = require("express");

// Import - controllers
const {
  getAllStaticPage,
  getAllCategories,
  getAllCategoryMenu,
  getAllBlogs,
  getAllSubcategories,
  getHomepageData,
  postSendEmail,
} = require("../controllers/public_controller");
const { emailRateLimiter } = require("../middlewares/public_middleware");

// Import - router
const router = Router();

// Basic routes
router.get("/blog", getAllBlogs);
router.get("/category", getAllCategories);
router.get("/category_menu", getAllCategoryMenu);
router.get("/subcategory", getAllSubcategories);
router.get("/static_page", getAllStaticPage);
router.get("/homepage", getHomepageData);
router.post("/send-email", emailRateLimiter, postSendEmail);

module.exports = router;
