const { statusCode, statusMessage } = require('../utils/status.utils');

const nameValidator = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_NAME_NOT_FOUND);
  }
  if (name.length < 3) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_NAME_INVALID);
  }
  return next();
};

module.exports = nameValidator;