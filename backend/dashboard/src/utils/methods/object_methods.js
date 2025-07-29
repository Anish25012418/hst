////////////////////////////////////////
////////////////////////////////////////
// This way, you ensure that the required values are only added to req.body if they meet the specified conditions.
////////////////////////////////////////
////////////////////////////////////////
const addValidProperty = (obj, key, value) => {
  if (value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0)) {
    obj[key] = value;
  }
};

////////////////////////////////////////
////////////////////////////////////////
// Check if two objects have the same values within
////////////////////////////////////////
////////////////////////////////////////
const areSameObjects = (obj1, obj2) => {
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
}

////////////////////////////////////////
////////////////////////////////////////
// Checks if the first object (obj) is a subset of the second object (wholeObj)
////////////////////////////////////////
////////////////////////////////////////
const isFirstObjSubset = (obj, wholeObj) => {
  if (typeof obj !== typeof wholeObj) {
    return false;
  }

  if (typeof obj === 'object' && obj !== null && wholeObj !== null) {
    if (Array.isArray(obj) && Array.isArray(wholeObj)) {
      // Check if arrays are equal
      if (obj.length !== wholeObj.length) {
        return false;
      }
      // Recursively compare each element in the arrays
      for (let i = 0; i < obj.length; i++) {
        if (!isFirstObjSubset(obj[i], wholeObj[i])) {
          return false;
        }
      }
    } else {
      // Check if objects are equal
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          // Recursively compare each property in the objects
          if (!isFirstObjSubset(obj[key], wholeObj[key])) {
            return false;
          }
        }
      }
    }
  } else {
    // Check if primitive values are equal
    if (obj !== wholeObj) {
      return false;
    }
  }

  return true;
};

// Check if any value from one string array exists in another string array
const stringArrayContainsAny = (superset, subset) => {
  if (!Array.isArray(superset) || !Array.isArray(subset)) {
    throw new TypeError('Both arguments should be arrays.');
  }
  return subset.some(value => superset.includes(value));
};

// Sorts an array of filenames based on the numerical order in their names
const sortFilenames = (filenames, prefix = '') => {
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
  const extractNumber = (filename) => {
    for (let word in wordToNumberMap) {
      if (filename.includes(`_${word}_`)) {
        return wordToNumberMap[word];
      }
    }
    return Infinity; // Return a large number if no word is found
  };

  // Use a Set to keep only unique filenames
  const uniqueFilenames = Array.from(new Set(filenames));

  // Sort the unique filenames
  const sortedFilenames = uniqueFilenames.sort((a, b) => extractNumber(a) - extractNumber(b));

  // Add prefix to each filename if provided
  if (prefix) {
    return sortedFilenames.map((filename) => `${prefix}${filename}`);
  }

  return sortedFilenames;
};

module.exports = {
  addValidProperty,
  areSameObjects,
  isFirstObjSubset,
  sortFilenames,
  stringArrayContainsAny,
}