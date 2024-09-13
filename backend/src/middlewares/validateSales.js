const controllerValidation = require('../controllers/validations/validationInputValues');

const validateRegisterSalesFields = (req, res, next) => {
  try {
    const { body } = req;
    const error = controllerValidation.validateRegisterSale(body);
    if (error) return res.status(400).json({ message: error.message });
    return next();
  } catch (error) {
    next(error);
  }
};

const validateUpdateQuantityFields = (req, res, next) => {
  try {
    const { body } = req;
    const error = controllerValidation.validateUpdaterSale(body);
    if (error) return res.status(400).json({ message: error.message });
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateRegisterSalesFields,
  validateUpdateQuantityFields, 
};