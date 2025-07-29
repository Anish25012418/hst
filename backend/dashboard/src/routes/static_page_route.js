// Imports - default
const { Router } = require("express");

// Import - controllers
const {
  // createItem,
  getAllItems,
  // getItemById,
  updateItem,
  // deleteItem,
} = require("../controllers/static_page_controller");

// Import - middlewares
const { fetchUpdateCustomName } = require("../middlewares/static_page_middleware");
const { uploadAnyFilesMiddleware } = require("../middlewares/upload_middleware");

// Initialize router
const router = Router();

////////////////////////////////////////
////////////////////////////////////////
// Global variables
const MODEL_NAME = "static_page";
////////////////////////////////////////
////////////////////////////////////////

// Basic routes
router
  .route("/")
  .get(getAllItems);
// .post(
//   uploadAnyFilesMiddleware({
//     limit: 15,
//     pathName: MODEL_NAME,
//     isStaticPageModel: true,
//   }),
//   createItem
// );
router
  .route("/:id")
  // .get(getItemById)
  .put(
    fetchUpdateCustomName,
    (req, res, next) =>
      uploadAnyFilesMiddleware({
        limit: 15,
        pathName: MODEL_NAME,
        // customName: req.customName,
        isStaticPageModel: true,
      })(req, res, next),
    updateItem
  );
// .delete(deleteItem);

module.exports = router;
