const route = require('express').Router();

const productsController = require('../controllers/products.controller');
const middlewares = require('../middlewares/validateProducts');

route.get(
  '/search',
  productsController.searchByName,
);

route.get(
  '',
  productsController.findAll,
);

route.get(
  '/:productId',
  productsController.findById,
);

route.post(
  '',
  middlewares.validateRegisterProductFields,
  productsController.register,
);

route.put(
  '/:id',
  middlewares.validateRegisterProductFields,
  productsController.update,
);

route.delete(
  '/:id',
  productsController.remove,
);

module.exports = route;
