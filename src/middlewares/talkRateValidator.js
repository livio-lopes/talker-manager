const { statusCode, statusMessage } = require('../utils/status.utils');
const { validateRate } = require('../utils/talkers.utils');

const talkRateValidator = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate === undefined) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_TALK_RATE_NOT_FOUND);
  }
  if (validateRate(rate)) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_TALK_RATE_INVALID);
  }
  return next();
};

module.exports = talkRateValidator;
