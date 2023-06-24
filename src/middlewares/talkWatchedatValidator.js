const { statusCode, statusMessage } = require('../utils/status.utils');

const talkWatcheAtValidator = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /(0[1-9]|1\d|2\d|3[0-1])(\/|-|\.|)(0[1-9]|1[0-2])\2\d{4}/;
  const validDate = dateRegex.test(watchedAt);
  if (!watchedAt) {
    return res.status(statusCode.BAD_REQUEST)
    .json(statusMessage.BAD_REQUEST_TALK_WATCHEDAT_NOT_FOUND);
  }
  if (!validDate) {
    return res.status(statusCode.BAD_REQUEST)
    .json(statusMessage.BAD_REQUEST_TALK_WATCHEDAT_INVALID);
  }
  return next();
};

module.exports = talkWatcheAtValidator;