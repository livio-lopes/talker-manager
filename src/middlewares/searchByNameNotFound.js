const { statusCode } = require('../utils/status.utils');
const { readTalkers } = require('../utils/talkers.utils');

const searchByNameNotFound = async (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    const listTalkers = await readTalkers();
    return res.status(statusCode.OK).json(listTalkers);
  }
  return next();
};

module.exports = searchByNameNotFound;