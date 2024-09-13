const Joi = require('joi');

const registerProduct = Joi.object({
  name: Joi.required(),
});

const registerSales = Joi.object({
  productId: Joi.required(),
  quantity: Joi.required(),
});

const updateQuantity = Joi.object({
  quantity: Joi.required(),
});
module.exports = {
  registerProduct,
  registerSales,
  updateQuantity,
};