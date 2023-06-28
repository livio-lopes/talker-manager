const { statusCode, statusMessage } = require('../utils/status.utils');
const {  
   talkerByRate, hasOnlyRate, hasRateValid } = require('../utils/talkers.utils');

const talkerSearchValidator = async (req, res, next) => {
  const { q, rate } = req.query;
  if (hasRateValid(rate)) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_TALK_RATE_INVALID);
  }
  if (hasOnlyRate(q, rate)) {
    const listTalkers = await talkerByRate(rate);
    return res.status(statusCode.OK).json(listTalkers);
  }
  return next();
};

module.exports = talkerSearchValidator;