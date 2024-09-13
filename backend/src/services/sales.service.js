const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');
const serviceValidate = require('./validations/validationInputValues');

const searchEverySale = async () => {
  const sales = await salesModel.searchEverySale();

  return { status: 'SUCCESSFUL', data: sales };
};

const searchSaleById = async (saleId) => {
  const sale = await salesModel.searchSaleById(saleId);

  if (sale.length < 1) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  
  return { status: 'SUCCESSFUL', data: sale };
};

async function processProductIds(arrayOfProductIds) {
  let validateProductId = true;
  const result = arrayOfProductIds.map(({ productId }) => {
    if (validateProductId === undefined) return undefined;
    validateProductId = productsModel.searchProductById(productId); 
    return validateProductId;
  });
 
  return Promise.all(result);
}

const register = async (newSale) => {
  const error = serviceValidate.validateRegisterSales(newSale);

  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const validateProductId = await processProductIds(newSale);

  if (validateProductId.some((value) => !value)) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  const registerNewSale = await salesModel.registerSales(newSale);

  return { status: 'CREATED', data: registerNewSale }; 
};

const deleteSale = async (saleId) => {
  const removeProduct = await salesModel.deleteSale(saleId);
  if (removeProduct === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'DELETE', data: { removeProduct } };
}; 

const updateProductSaleQuantity = async (saleId, productId, body) => {
  const error = serviceValidate.validateUpdateSalesProducts(body);

  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const sale = await salesModel.searchSaleById(saleId);
  if (sale.length < 1) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  
  const product = await productsModel.searchProductById(productId);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }
  
  await salesModel.updateSaleQuantity(saleId, productId, body.quantity);

  const [{ date }] = sale;

  return {
    status: 'SUCCESSFUL', 
    data: { date, saleId: +saleId, productId: +productId, quantity: +body.quantity }, 
  };
};

module.exports = {
  searchEverySale,
  searchSaleById,
  register,
  deleteSale,
  updateProductSaleQuantity,
};