// Import - default
const { Schema } = require("mongoose");

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Date attribute
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const dateAttr = (params = {}) => {
  const { defaultValue, required = true, isArray = false } = params;

  return {
    ...(defaultValue !== undefined && { default: defaultValue }), // Add default value if provided
    required,
    type: isArray ? [{ type: Date, default: undefined }] : Date, // Allow array of Dates or single Date
    validate: {
      validator: function (value) {
        if (isArray) {
          // If it's supposed to be an array, ensure all elements are Date or allow empty
          return value === undefined || value === null || value.every(item => item instanceof Date);
        } else {
          // For non-array, allow null or valid Date
          return value === undefined || value === null || value instanceof Date;
        }
      },
      message: props => `${props.value} is not a valid date!`,
    },
  };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Decimal attribute
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const decimalAttr = (params = {}) => {
  const { defaultValue, required = true, validate } = params;
  return {
    ...(defaultValue && { default: defaultValue }),
    ...(validate && { validate }),
    required,
    type: Schema.Types.Decimal128,
  };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Enum attribute
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const enumAttr = (params = {}) => {
  const { defaultValue, enums, required = true, type = String } = params;
  return {
    ...(defaultValue && { default: defaultValue }),
    enum: enums,
    required,
    type,
  };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// String attribute
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const imageAttr = (params = {}) => {
  const { defaultValue, maxlength, minlength, required, type, unique } = params;
  return {
    ...(defaultValue && { default: defaultValue }),
    maxlength: maxlength ?? 255,
    minlength: minlength ?? 2,
    minlength: required ?? false,
    type: type ?? String,
    unique: unique ?? false,
  };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Mixed attribute
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const mixedAttr = (params = {}) => {
  const { defaultValue, required = true } = params;
  return {
    ...(defaultValue && { default: defaultValue }),
    required,
    type: Schema.Types.Mixed,
  };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Number attribute
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const numberAttr = (params = {}) => {
  const { defaultValue, required = true, unique = false } = params;
  return {
    ...(defaultValue && { default: defaultValue }),
    required,
    type: Number,
    unique,
  };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// Ref attribute
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const refAttr = (params = {}) => {
  const { defaultValue, required = true, ref } = params;
  return {
    ...(defaultValue && { default: defaultValue }),
    required,
    type: [{ type: Schema.Types.ObjectId, ref }],
  };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// String attribute
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const stringAttr = (params = {}) => {
  const { defaultValue, maxlength, minlength, required = true, unique = false } = params;
  return {
    ...(defaultValue && { default: defaultValue }),
    maxlength: maxlength ?? 50,
    minlength: minlength ?? 2,
    required,
    type: String,
    unique,
  };
};

//////////////////////////////////////////////////
//////////////////////////////////////////////////
// String attribute
//////////////////////////////////////////////////
//////////////////////////////////////////////////
const stringArrayAttr = (params = {}) => {
  const { defaultValue, required = true, unique = false } = params;
  return {
    ...(defaultValue && { default: defaultValue }),
    // maxlength: maxlength ?? 50,
    // minlength: minlength ?? 2,
    required,
    type: [String],
    unique,
  };
};

const model_attributes = {
  dateAttr,
  decimalAttr,
  enumAttr,
  imageAttr,
  mixedAttr,
  numberAttr,
  refAttr,
  stringArrayAttr,
  stringAttr,
};
module.exports = model_attributes;
