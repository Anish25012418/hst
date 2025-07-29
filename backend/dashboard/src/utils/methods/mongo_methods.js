
// Returns the schema paths of a Mongoose model excluding '_id' and '__v'
const getSchemaPaths = (model) => Object.keys(model.schema.paths).filter(key => key !== '_id' && key !== '__v');

////////////////////////////////////////
////////////////////////////////////////
// Checks if all keys in req.body exist in the schema paths of the Mongoose model
////////////////////////////////////////
////////////////////////////////////////
const checkSchemaValidity = (model, req = { body: {} }) => {
  const invalidKeys = {};
  const bodyKeys = req.body ? Object.keys(req.body) : [];

  bodyKeys.forEach(key => {
    if (!getSchemaPaths(model).includes(key)) {
      invalidKeys[key] = `${key} is not an accepted field.`;
    }
  });

  return Object.keys(invalidKeys).length ? invalidKeys : {};
};

module.exports = {
  checkSchemaValidity,
  getSchemaPaths
}
