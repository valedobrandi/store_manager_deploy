const controllerValidation = require('../controllers/validations/validationInputValues');

const validateRegisterProductFields = (req, res, next) => {
  try {
    const { body } = req;
    const error = controllerValidation.validateRegisterProduct(body);
    if (error) return res.status(400).json({ message: error.message });
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateRegisterProductFields, 
};