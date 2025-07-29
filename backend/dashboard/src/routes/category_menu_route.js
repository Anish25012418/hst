// Imports - default
const { Router } = require("express");

// Import - controllers
const {
  getAllItems,
  updateItem,
} = require("../controllers/category_menu_controller");

// Initialize router
const router = Router();

////////////////////////////////////////
////////////////////////////////////////
// Global variables
// const MODEL_NAME = "category_menu";
////////////////////////////////////////
////////////////////////////////////////

// Basic routes
router.route("/").get(getAllItems);
router.route("/:id").put(updateItem);

module.exports = router;
