const { statusCode, statusMessage } = require('../utils/status.utils');

const emailValidator = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_PASSWORD_NOT_FOUND);
  }
  if (password.length < 6) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_PASSWORD_INVALID);
  }
  return next();
};

module.exports = emailValidator;