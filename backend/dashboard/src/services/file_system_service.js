// Import - default
const path = require("path");
const fs = require("fs");
const { sortFilenames } = require("../utils/methods/object_methods");
const {
  convertFileNameToSnakeCase,
} = require("../utils/methods/string_methods");
const { extractWordNumber } = require("../utils/methods/file-methods");

// Function to delete files with the specified prefix, excluding certain files
const deleteFilesWithPrefix = async (folder, prefix, excludedFiles) => {
  try {
    // Check if the directory exists
    await fs.promises.access(folder, fs.promises.constants.F_OK);
    const files = await fs.promises.readdir(folder);

    for (const file of files) {
      if (file.startsWith(prefix) && !excludedFiles.includes(file)) {
        const filePath = path.join(folder, file);
        try {
          await fs.promises.unlink(filePath);
          console.log("Deleted file:", filePath);
        } catch (err) {
          console.error("Error deleting file:", err);
        }
      }
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("Directory does not exist:", folder);
    } else {
      console.error("Error reading directory:", err);
    }
  }
};

// Function to delete files with the specified prefix, excluding certain files
const replaceFilesWithPrefix = async (folder, prefix, excludedFiles = []) => {
  try {
    // Read all files in the folder
    const files = await fs.promises.readdir(folder);

    // Convert prefix to array if it's a string
    const prefixes = Array.isArray(prefix) ? prefix : [prefix];

    // Iterate through each prefix
    for (let prefix of prefixes) {
      // Filter files that start with the current prefix and are not in excludedFiles
      const filesToDelete = files.filter(
        (file) => file.startsWith(prefix) && !excludedFiles.includes(file)
      );

      // Iterate through files to delete
      for (let fileToDelete of filesToDelete) {
        // Construct full path for the file to delete
        const filePathToDelete = path.join(folder, fileToDelete);

        // Check if file exists before deleting
        try {
          const stats = await fs.promises.stat(filePathToDelete);
          if (stats.isFile()) {
            await fs.promises.unlink(filePathToDelete);
            console.log(`Deleted file: ${fileToDelete}`);
          }
        } catch (deleteErr) {
          console.error(`Error deleting file ${fileToDelete}: ${deleteErr}`);
        }
      }
    }

    // Iterate through each file again to rename
    for (let file of files) {
      // Check if the file starts with any of the given prefixes and is not in excludedFiles
      const matchedPrefix = prefixes.find(
        (p) => file.startsWith(p) && !excludedFiles.includes(file)
      );
      if (matchedPrefix) {
        // Determine the new filename (remove prefix)
        const newFileName = file.substring(matchedPrefix.length);

        // Construct full paths for old and new filenames
        const oldFilePath = path.join(folder, file);
        const newFilePath = path.join(folder, newFileName);

        // Rename the file
        await fs.promises.rename(oldFilePath, newFilePath);
        console.log(`File ${file} renamed to ${newFileName}`);
      }
    }
  } catch (err) {
    console.error(`Error processing files in folder ${folder}: ${err}`);
  }
};

const getUniqueImageElements = (imageFiles, allFolderFiles) => {
  const wordToImageMap = new Map();

  // Add images from imageFiles to the map, they have priority
  imageFiles?.forEach((file) => {
    const word = extractWordNumber(file);
    if (word) {
      wordToImageMap.set(word, file);
    }
  });

  // Add files from allFolderFiles to the map if they are not already present
  allFolderFiles.forEach((file) => {
    const word = extractWordNumber(file);
    if (word && !wordToImageMap.has(word)) {
      wordToImageMap.set(word, file);
    }
  });

  // Return the values from the map
  return Array.from(wordToImageMap.values());
};

// const getUniqueImageElements = (imageFiles, allFolderFiles) => {
//   // Initialize the result array and the set to track unique elements
//   const result = [];
//   const uniqueSet = new Set();

//   // Start index to iterate from
//   let startIndex = 0;

//   // If imageFiles is provided and has elements, start from the first element of imageFiles
//   if (imageFiles && imageFiles.length > 0) {
//     startIndex = allFolderFiles.indexOf(imageFiles[0]);
//     if (startIndex !== -1) {
//       result.push(allFolderFiles[startIndex]);
//       uniqueSet.add(allFolderFiles[startIndex]);
//     } else {
//       startIndex = 0; // reset startIndex if the element is not found
//     }
//   }

//   // Iterate through allFolderFiles starting from startIndex
//   for (let i = startIndex; i < allFolderFiles.length; i++) {
//     if (!uniqueSet.has(allFolderFiles[i])) {
//       result.push(allFolderFiles[i]);
//       uniqueSet.add(allFolderFiles[i]);
//     }
//   }

//   return result;
// }

// Get the files and patterns inside the given folder
const getFolderFilesAndPatterns = async (folder, prefix, images, query) => {
  const imageFiles = images?.map(
    (item) => `${query}_${convertFileNameToSnakeCase(item?.split("/").pop())}`
  );

  try {
    const allFolderFiles = await fs.promises.readdir(folder);
    const folderFiles = getUniqueImageElements(imageFiles, allFolderFiles);
    const excludedFilesPattern = Array.from(
      new Set(
        folderFiles.map((item) => {
          const arr = item.split("_");
          if (query) {
            const queryParts = query.split("_").length || 0;
            // Ensure we don't exceed the length of arr
            const resultParts = arr.slice(0, queryParts + 1);
            return resultParts.join("_");
          }
        })
      )
    );
    const sortedFolderFiles = sortFilenames(folderFiles, prefix);
    return { excludedFilesPattern, folderFiles, sortedFolderFiles };
  } catch (err) {
    console.error("Error reading directory:", err);
    return { folderFiles: [], excludedFilesPattern: [], sortedFolderFiles: [] };
  }
};

const getCleanedSortedFiles = async (sortedFolderFiles, query) => {
  return sortedFolderFiles.map(filePath => {
    if (typeof filePath === 'string') {
      const pathParts = filePath.split('/');
      const filename = pathParts[pathParts.length - 1];

      // Remove duplicate prefix from filename
      const duplicatePrefix = `${query}_${query}_`;
      const singlePrefix = `${query}_`;

      let cleanedFilename = filename;
      if (filename.startsWith(duplicatePrefix)) {
        cleanedFilename = filename.replace(duplicatePrefix, singlePrefix);
      }

      // Rebuild the path with cleaned filename
      pathParts[pathParts.length - 1] = cleanedFilename;
      return pathParts.join('/');
    }
    return filePath;
  });
}

// Delete previous or existing images of a model item before/after updating that particular item
const deleteExistingModelImages = async (params) => {
  // Params
  const {
    customTitle,
    title: t,
    model,
    imageExtraPic,
    imageCoverPic,
    imageGalleryPic,
    imageThumbnailPic,
    restImages,
    retainingFiles,
  } = params;

  // Variables
  const title = customTitle ?? t;
  const splitTitle = title?.split("_");
  const commonFolderPath = `../../public/images/uploads/${model}`;
  let folder = path.resolve(__dirname, commonFolderPath);
  let excludedFiles = [];

  try {
    // Delete files from cover folder
    if (imageCoverPic?.length > 0) {
      folder = path.resolve(__dirname, `${commonFolderPath}/cover`);
      const currentUpdateFiles = imageCoverPic.map((item) => path.basename(item));
      const retainedFiles = retainingFiles?.imageCoverPic?.map((item) => path.basename(item)) ?? [];
      excludedFiles = [...new Set([...currentUpdateFiles, ...retainedFiles])];
      await deleteFilesWithPrefix(folder, title, excludedFiles);
    }

    // Delete files from extra folder
    if (imageExtraPic) {
      folder = path.resolve(__dirname, `${commonFolderPath}/extra`);
      excludedFiles = [imageExtraPic]?.map((item) => path.basename(item));
      await deleteFilesWithPrefix(folder, title, excludedFiles);
    }

    // Delete files from gallery folder
    if (imageGalleryPic?.length > 0) {
      folder = path.resolve(__dirname, `${commonFolderPath}/gallery`);
      const currentUpdateFiles = imageGalleryPic.map((item) => path.basename(item));
      const retainedFiles = retainingFiles?.imageGalleryPic?.map((item) => path.basename(item)) ?? [];
      excludedFiles = [...new Set([...currentUpdateFiles, ...retainedFiles])];
      await deleteFilesWithPrefix(folder, title, excludedFiles);
    }

    // Delete files from thumbnail folder
    if (imageThumbnailPic) {
      folder = path.resolve(__dirname, `${commonFolderPath}/thumbnail`);
      excludedFiles = [imageThumbnailPic]?.map((item) => path.basename(item));
      await deleteFilesWithPrefix(folder, title, excludedFiles);
    }

    // Delete files from the base folder
    // const { excludedFilesPattern } = await getFolderFilesAndPatterns(folder);
    excludedFiles =
      restImages?.length > 0
        ? restImages?.map((item) => `${title}_${path.basename(item)}`)
        : [];

    const excludedFilesPattern = Array.from(
      new Set(
        excludedFiles.map((item) => {
          // const arr = item.split("_");
          // if (splitTitle?.length === 1) {
          //   return `${arr[0]}_${arr[1]}`;
          // } else if (splitTitle?.length === 2) {
          //   return `${arr[0]}_${arr[1]}_${arr[2]}`;
          // } else if (splitTitle?.length === 3) {
          //   return `${arr[0]}_${arr[1]}_${arr[2]}_${arr[3]}`;
          // }
          // return `${arr[0]}_${arr[1]}_${arr[2]}`;
          const arr = item.split("_");
          // Ensure splitTitle is defined and within the bounds of the array length
          const lengthToUse = Math.min(splitTitle?.length || 0, arr.length);
          const resultParts = arr.slice(0, lengthToUse + 1);
          return resultParts.join("_");
        })
      )
    );
    await replaceFilesWithPrefix(folder, excludedFilesPattern, excludedFiles);
  } catch (error) {
    console.error("Error deleting category images:", error);
  }
};

module.exports = {
  deleteFilesWithPrefix,
  deleteExistingModelImages,
  getFolderFilesAndPatterns,
  replaceFilesWithPrefix,
  getCleanedSortedFiles
};
