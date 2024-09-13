const productsModel = require('../models/products.model');
const serviceValidate = require('./validations/validationInputValues');

const searchEveryProduct = async () => {
  const products = await productsModel.searchEveryProduct();

  return { status: 'SUCCESSFUL', data: products };
};

const searchProductById = async (productId) => {
  const product = await productsModel.searchProductById(productId);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  
  return { status: 'SUCCESSFUL', data: product };
};

const registerProduct = async (newProduct) => {
  const error = serviceValidate.validateRegisterProduct(newProduct);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }

  const register = await productsModel.registerProduct(newProduct);
  return { status: 'CREATED', data: register };
};

const updateProduct = async (update, productId) => {
  const error = serviceValidate.validateUpdateProduct(update);
  if (error) {
    return { status: error.status, data: { message: error.message } };
  }
  
  const productUpdate = await productsModel.updateProduct(update, productId);

  if (productUpdate === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: { id: Number(productId), name: update.name } };
};

const deleteProduct = async (productId) => {
  const removeProduct = await productsModel.deleteProduct(productId);
  if (removeProduct === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'DELETE', data: { removeProduct } };
}; 

const searchProductsByName = async (query) => {
  if (!query) {
    const allProducts = await productsModel.searchEveryProduct();
    return { status: 'SUCCESSFUL', data: allProducts };
  }
  
  const products = await productsModel.searchProductName(query);

  if (products.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: products };
}; 

module.exports = {
  searchEveryProduct,
  searchProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchProductsByName,
};