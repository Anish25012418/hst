// Convert an array of file paths into an array of filenames without their extensions
const extractFileNames = (filePaths) => {
  return filePaths.map(filePath => {
    const fileNameWithExtension = filePath.split('/').pop();
    return fileNameWithExtension.split('.').slice(0, -1).join('.');
  });
}

// Extracts the word-number from a filename.
const extractWordNumber = (filename) => {
  const wordToNumberMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };

  for (const word in wordToNumberMap) {
    if (filename.includes(word)) {
      return word;
    }
  }
  return null;
};

const processPatterns = (imagesPattern, tempExcludedFiles) => {
  const excludedFilesPattern = [...imagesPattern];

  tempExcludedFiles.forEach(pattern => {
    if (!imagesPattern.includes(pattern)) {
      excludedFilesPattern.push(pattern);
    }
  });

  const filesToDelete = tempExcludedFiles.filter(pattern => {
    return !imagesPattern.includes(pattern) && !excludedFilesPattern.includes(pattern);
  });

  const sortByPattern = (a, b) => {
    const getOrder = str => {
      const match = str.match(/_(\d+)_/);
      return match ? parseInt(match[1], 10) : 0;
    };
    return getOrder(a) - getOrder(b);
  };

  excludedFilesPattern.sort(sortByPattern);
  filesToDelete.sort(sortByPattern);

  return {
    excludedFilesPattern,
    filesToDelete
  };
}

// This function splits the file path by / to get the file name, then splits the file name by _ to reformat it as workshop_order_rest_of_filename.
const convertImagePaths = (images, prefix) => {
  return images.map(image => {
    const parts = image.split('/');
    const fileName = parts[parts.length - 1]; // Get the file name
    const [order, ...rest] = fileName.split('_'); // Split by underscore
    return `${prefix}_${order}_${rest.join('_')}`;
  });
}

module.exports = {
  convertImagePaths,
  extractFileNames,
  extractWordNumber,
  processPatterns
}