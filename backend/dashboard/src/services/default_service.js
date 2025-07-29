const convertMongoDecimalToString = (mongoDecimal) => {
  if (mongoDecimal && mongoDecimal._bsontype === 'Decimal128') {
    return mongoDecimal.toString();
  }
  return mongoDecimal;
};

module.exports = {
  convertMongoDecimalToString,
}