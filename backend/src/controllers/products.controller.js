const productsService = require('../services/products.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res, next) => {
  try {
    const { status, data } = await productsService.searchEveryProduct();
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { status, data } = await productsService.searchProductById(productId);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { status, data } = await productsService.registerProduct(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const { status, data } = await productsService.updateProduct(body, id);

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, data } = await productsService.deleteProduct(id);
  
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const searchByName = async (req, res, next) => {
  try {
    const { q } = req.query;
  
    const { status, data } = await productsService.searchProductsByName(q);
  
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findById,
  register,
  update,
  remove,
  searchByName,
};