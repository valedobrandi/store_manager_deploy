const schema = require('./schema');

const validateRegisterProduct = (keysObjectToValidate) => {
  const { error } = schema.registerProduct.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateUpdateProduct = (keysObjectToValidate) => {
  const { error } = schema.updateProduct.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateRegisterSales = (keysObjectToValidate) => {
  for (let index = 0; index < keysObjectToValidate.length; index += 1) {
    const { error } = schema.registerSale.validate(keysObjectToValidate[index]);
    if (error) return { status: 'INVALID_VALUE', message: error.message };
  }
};

const validateUpdateSalesProducts = (keysObjectToValidate) => {
  const { error } = schema.updateQuantitySaleProduct.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateRegisterProduct,
  validateRegisterSales,
  validateUpdateSalesProducts,
  validateUpdateProduct,
};