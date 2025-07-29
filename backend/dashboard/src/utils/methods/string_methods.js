////////////////////////////////////////
////////////////////////////////////////
// Convert file name to snake case
////////////////////////////////////////
////////////////////////////////////////
const convertFileNameToSnakeCase = (fileName) => {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return toSnakeCase(fileName); // No extension found
  }
  const name = fileName.substring(0, lastDotIndex);
  const extension = fileName.substring(lastDotIndex + 1);
  return `${toSnakeCase(name)}.${extension}`;
};

////////////////////////////////////////
////////////////////////////////////////
// Convert string to camel case
////////////////////////////////////////
////////////////////////////////////////
const toCamelCase = (title) => {
  if (typeof title !== "string" || !title.trim()) {
    return "";
  }
  return title
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
};

////////////////////////////////////////
////////////////////////////////////////
// Convert string to param case
////////////////////////////////////////
////////////////////////////////////////
const toParamCase = (title) => {
  if (typeof title !== "string" || !title.trim()) {
    return "";
  }

  // Replace underscores and spaces with dashes, remove consecutive dashes, and convert to lowercase
  let result = title
    .trim()
    .replace(/[_\s]+/g, "-")  // Replace underscores and spaces with dashes
    .replace(/-+/g, "-")      // Remove consecutive dashes
    .toLowerCase();

  // Remove any leading or trailing dashes
  result = result.replace(/^-|-$/g, "");

  return result;
};


////////////////////////////////////////
////////////////////////////////////////
// Convert string to snake case
////////////////////////////////////////
////////////////////////////////////////
const toSnakeCase = (title) => {
  if (typeof title !== "string" || !title.trim()) {
    return "";
  }
  // Replace spaces and dashes with underscores, and convert to lowercase
  return title
    .trim()
    .replace(/[\s-]+/g, "_")     // Replace spaces and dashes with underscores
    .replace(/[^\w_]/g, "")      // Remove all non-word characters except underscores
    .replace(/_+/g, "_")         // Convert multiple underscores to a single underscore
    .toLowerCase();
};

////////////////////////////////////////
////////////////////////////////////////
// Convert string to title case
////////////////////////////////////////
////////////////////////////////////////
const toTitleCase = (input) => {
  if (typeof input !== 'string') {
    return ''; // Return an empty string for undefined, null, or non-string input
  }

  // Replace camelCase with spaces
  const camelCaseToSpaces = input.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Replace snake_case and other non-alphanumeric characters with spaces
  const cleanedString = camelCaseToSpaces.replace(/[_\-]/g, " ");

  // Convert to title case
  const titleCased = cleanedString.replace(/\w\S*/g, (word) => {
    return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
  });

  return titleCased;
};

////////////////////////////////////////
////////////////////////////////////////
// Convert snake to camel case
////////////////////////////////////////
////////////////////////////////////////
const snakeToCamelCase = (snakeStr) => {
  if (typeof snakeStr !== "string" || !snakeStr.trim()) {
    return "";
  }
  return snakeStr
    .toLowerCase()
    .split("_")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
};

// To handle the case where contactPage might not be a valid JSON string or might be undefined/null, you can use a try-catch block to safely parse the JSON
const safeParseJSON = (jsonData, defaultValue) => {
  if (typeof jsonData === "string") {
    try {
      return JSON.parse(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return defaultValue;
    }
  } else {
    return jsonData || defaultValue || {};
  }
};

const stringMethods = {
  convertFileNameToSnakeCase,
  safeParseJSON,
  snakeToCamelCase,
  toCamelCase,
  toParamCase,
  toSnakeCase,
  toTitleCase,
};

module.exports = stringMethods;
