const { statusCode, statusMessage } = require('../utils/status.utils');
const { validadeDate } = require('../utils/talkers.utils');

const talkWatcheAtValidator = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt) {
    return res.status(statusCode.BAD_REQUEST)
    .json(statusMessage.BAD_REQUEST_TALK_WATCHEDAT_NOT_FOUND);
  }
  if (!validadeDate(watchedAt)) {
    return res.status(statusCode.BAD_REQUEST)
    .json(statusMessage.BAD_REQUEST_TALK_WATCHEDAT_INVALID);
  }
  return next();
};

module.exports = talkWatcheAtValidator;