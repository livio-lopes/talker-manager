const { statusCode } = require('../utils/status.utils');
const { hasOnlyDate, 
  talkerByDate, 
  hasDateName, 
  talkerByDateName, 
  searchComplete, 
  talkerSearchComplete, 
   } = require('../utils/talkers.utils');

const talkerSearchDate = async (req, res, next) => {
  const { q, rate, date } = req.query;
  if (searchComplete(q, rate, date)) {
    const listTalkers = await talkerSearchComplete(q, rate, date);
    return res.status(statusCode.OK).json(listTalkers);
  }
  if (hasDateName(q, rate, date)) {
    const listTalkers = await talkerByDateName(date, q);
    return res.status(statusCode.OK).json(listTalkers);
  }
  if (hasOnlyDate(q, rate, date)) {
    const listTalkers = await talkerByDate(date);
    return res.status(statusCode.OK).json(listTalkers);
  }
  return next();
};

module.exports = talkerSearchDate;