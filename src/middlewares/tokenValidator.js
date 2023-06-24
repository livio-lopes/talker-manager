const { statusCode, statusMessage } = require('../utils/status.utils');

const tokenValidator = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(statusCode.UNAUTHORIZED).json(statusMessage.UNAUTHORIZED_TOKEN_NOT_FOUND);
  } 
  const typeAuthorization = typeof authorization !== 'string';
  const lengthAuthorization = authorization.length !== 16;
  if (lengthAuthorization || typeAuthorization) {
    return res.status(statusCode.UNAUTHORIZED).json(statusMessage.UNAUTHORIZED_TOKEN_INVALID);
  }
  return next();
};

module.exports = tokenValidator;