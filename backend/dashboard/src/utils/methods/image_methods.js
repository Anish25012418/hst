// Encapsulates the base path, dynamic path generation, and iteration over page names to create image and folder paths in a reusable function.
const path = require("path");
const generateStaticPagesPaths = (pages, base_path) => {
  const BASE_IMAGE_PATH = base_path || "/images/uploads/static_page";
  const ACTUAL_IMAGE_PATH = (pageName) => `${BASE_IMAGE_PATH}/${pageName}`;

  const imagePaths = {};
  const folderPaths = {};

  pages.forEach((page) => {
    imagePaths[page] = ACTUAL_IMAGE_PATH(page);
    folderPaths[page] = `../../public${imagePaths[page]}`;
  });

  return { imagePaths, folderPaths };
};

const mergeRetainedImages = (currentImages, newImages) => {
  // Normalize current and new image names to just filenames
  const newImageNames = newImages.map((img) =>
    typeof img === "string" ? path.basename(img) : img.name
  );

  return currentImages.filter((currentImg) => {
    const currentImgName = path.basename(currentImg);
    // Keep it if it's not exactly replaced
    return !newImageNames.includes(currentImgName);
  });
};

module.exports = {
  generateStaticPagesPaths, mergeRetainedImages
}