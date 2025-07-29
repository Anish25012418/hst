////////////////////////////////////////
////////////////////////////////////////
// Validates the fields in an object based on: 
// required fields, 
// mixed type fields, 
// date fields 
// and enum fields
////////////////////////////////////////
////////////////////////////////////////
const validateFields = (params) => {
  // Params
  const { dates = [], enums = {}, mixed = [], req, required = [] } = params;

  // Global variables
  const fields = req?.body ?? {};
  const errors = {};

  // Validation functions
  const addError = (field, message) => {
    if (!errors[field]) {
      errors[field] = [];
    }
    errors[field].push(message);
  };

  // Validation functions - Required
  const checkRequired = (field) => {
    if (!fields[field]) {
      addError(field, `${field} is a required field.`);
    }
  };

  // Validation functions - Date
  const checkValidDate = (field) => {
    const value = fields[field];
    // Check if the field is provided and is not null or undefined
    if (value !== undefined && value !== null) {
      // Validate that the value is a valid date
      if (isNaN(Date.parse(value))) {
        addError(field, `${field} must be a valid date.`);
      }
    }
  };

  // Validation functions - Non empty object
  const checkNonEmptyObject = (field) => {
    if (
      typeof fields[field] !== "object" ||
      fields[field] === null ||
      Object.keys(fields[field]).length === 0
    ) {
      addError(field, `${field} must be a non-empty object.`);
    }
  };

  // Validation functions - Enum
  const checkEnumValues = (field, validValues) => {
    if (fields[field] !== undefined) {
      if (Array.isArray(fields[field])) {
        fields[field].forEach((value) => {
          if (!validValues.includes(value)) {
            addError(field, `Invalid value "${value}" provided for ${field}.`);
          }
        });
      } else if (!validValues.includes(fields[field])) {
        addError(
          field,
          `Invalid value "${fields[field]}" provided for ${field}.`
        );
      }
    }
  };

  // Perform validations
  required.forEach(checkRequired);
  dates.forEach(checkValidDate);
  mixed.forEach(checkNonEmptyObject);
  Object.entries(enums).forEach(([field, validValues]) => {
    checkEnumValues(field, validValues);
  });

  // Combine errors for each field into a single message
  const combinedErrors = Object.entries(errors).map(([field, messages]) => {
    return { [field]: messages.join(" ") };
  });

  return combinedErrors;
};

module.exports = {
  validateFields,
};
