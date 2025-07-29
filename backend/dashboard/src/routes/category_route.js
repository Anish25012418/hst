// Imports - default
const { Router } = require("express");

// Import - controllers
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/category_controller");

// Import - middlewares
const { fetchUpdateCustomName } = require("../middlewares/category_middleware");
const { uploadAnyFilesMiddleware } = require("../middlewares/upload_middleware");

// Initialize router
const router = Router();

////////////////////////////////////////
////////////////////////////////////////
// Global variables
const MODEL_NAME = "category";
////////////////////////////////////////
////////////////////////////////////////

// Basic routes
router
  .route("/")
  .get(getAllItems)
  .post(
    uploadAnyFilesMiddleware({
      limit: 15,
      pathName: MODEL_NAME,
      isImageTitle: true,
    }),
    createItem
  );
router
  .route("/:id")
  .get(getItemById)
  .put(
    fetchUpdateCustomName,
    (req, res, next) =>
      uploadAnyFilesMiddleware({
        limit: 15,
        pathName: MODEL_NAME,
        customName: req.customName,
      })(req, res, next),
    updateItem
  )
  .delete(deleteItem);

module.exports = router;
