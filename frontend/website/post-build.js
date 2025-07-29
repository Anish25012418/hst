// Default
const fs = require('fs');
const path = require('path');

// Variables
const directoryPath = path.join(__dirname, 'out');

// Function to recursively rename files
function renameFiles(dir) {
  try {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(file => {
      const filePath = path.join(dir, file.name);

      // Skip the _next folder
      if ((file.isDirectory() && file.name === '_next') || file.name === '404.html') {
        return;
      }

      if (file.isDirectory()) {
        renameFiles(filePath); // Recursively handle subdirectories
      } else if (file.isFile()) {
        const fileNameWithoutExt = path.parse(file.name).name;
        const fileExt = path.extname(file.name);

        // Skip index.html and index.txt files
        if ((fileNameWithoutExt === 'index' && fileExt === '.html') || (fileNameWithoutExt === 'index' && fileExt === '.txt')) {
          return;
        }

        // Convert files named 'index' without any extension to 'index.html'
        if (fileNameWithoutExt === 'index' && !fileExt) {
          const newFilePath = path.join(dir, 'index.html');
          try {
            fs.renameSync(filePath, newFilePath);
            console.log(`Renamed: ${filePath} -> ${newFilePath}`);
          } catch (err) {
            // Do nothing, just skip logging
          }
          return;
        }

        const dirWithSameName = path.join(dir, fileNameWithoutExt);

        if (fs.existsSync(dirWithSameName) && fs.lstatSync(dirWithSameName).isDirectory()) {
          const newFilePath = path.join(dirWithSameName, `index${fileExt}`);

          try {
            fs.renameSync(filePath, newFilePath);
            console.log(`Moved and renamed: ${filePath} -> ${newFilePath}`);
          } catch (err) {
            // Do nothing, just skip logging
          }
        } else if (!fs.existsSync(dirWithSameName)) {
          // Create a new directory if it does not exist
          try {
            if (!fs.existsSync(dirWithSameName)) {
              fs.mkdirSync(dirWithSameName);
            }
            const newFilePath = path.join(dirWithSameName, `index${fileExt}`);
            fs.renameSync(filePath, newFilePath);
            console.log(`Created directory and moved: ${filePath} -> ${newFilePath}`);
          } catch (err) {
            // Do nothing, just skip logging
          }
        }
      }
    });
  } catch (err) {
    console.error(`Unable to scan directory: ${err}`);
  }
}

// Start renaming process for the entire directory path
renameFiles(directoryPath);