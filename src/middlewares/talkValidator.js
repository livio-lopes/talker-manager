const { statusCode, statusMessage } = require('../utils/status.utils');

const talkValidator = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_TALK_NOT_FOUND);
  }

  return next();
};

module.exports = talkValidator;