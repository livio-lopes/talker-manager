const { statusCode, statusMessage } = require('../utils/status.utils');

const ageValidator = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_AGE_NOT_FOUND);
  }
  if (!Number.isInteger(age) || age < 18) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_AGE_INVALID);
  }
  return next();
};

module.exports = ageValidator;