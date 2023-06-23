const { statusCode, statusMessage } = require('../utils/status.utils');

const emailValidator = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_EMAIL_NOT_FOUND);
  }
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const validEmail = emailRegex.test(email);
  if (!validEmail) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_EMAIL_INVALID);
  }
  return next();
};

module.exports = emailValidator;