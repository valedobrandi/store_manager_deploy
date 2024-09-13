const salesService = require('../services/sales.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res, next) => {
  try {
    const { status, data } = await salesService.searchEverySale();
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { saleId } = req.params;
    const { status, data } = await salesService.searchSaleById(saleId);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { body } = req;
    const { status, data } = await salesService.register(body);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, data } = await salesService.deleteSale(id);
  
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { saleId, productId } = req.params;
    const { body } = req;
    const { status, data } = await salesService.updateProductSaleQuantity(saleId, productId, body);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findById,
  register,
  remove,
  update,
};