const route = require('express').Router();
const salesController = require('../controllers/sales.controller');
const middlewares = require('../middlewares/validateSales');

route.get(
  '',
  salesController.findAll,
);

route.get(
  '/:saleId',
  salesController.findById,
);

route.post(
  '',
  middlewares.validateRegisterSalesFields,
  salesController.register,
);

route.delete(
  '/:id',
  salesController.remove,
);

route.put(
  '/:saleId/products/:productId/quantity',
  middlewares.validateUpdateQuantityFields,
  salesController.update,
);

module.exports = route;