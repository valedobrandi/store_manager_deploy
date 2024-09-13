const schema = require('./schema');

const validateRegisterProduct = (keysObjectToValidate) => {
  const { error } = schema.registerProduct.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateRegisterSale = (keysObjectToValidate) => {
  for (let index = 0; index < keysObjectToValidate.length; index += 1) {
    const { error } = schema.registerSales.validate(keysObjectToValidate[index]);
    if (error) return { status: 'INVALID_VALUE', message: error.message };
  }
};

const validateUpdaterSale = (keysObjectToValidate) => {
  const { error } = schema.updateQuantity.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateRegisterProduct,
  validateRegisterSale,
  validateUpdaterSale,
};