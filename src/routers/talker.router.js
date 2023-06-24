const express = require('express');
const { readTalkers, writeTalkers } = require('../utils/talkers.utils');
const { statusCode, statusMessage } = require('../utils/status.utils');
const tokenValidator = require('../middlewares/tokenValidator');
const nameValidator = require('../middlewares/nameValidator');
const ageValidator = require('../middlewares/ageValidator');
const talkValidator = require('../middlewares/talkValidator');
const talkWatcheAtValidator = require('../middlewares/talkWatchedatValidator');
const talkRateValidator = require('../middlewares/talkRateValidator');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const dataTalkers = await readTalkers();
    if (!dataTalkers) {
      return res.status(statusCode.OK).json(JSON.parse([]));
    }
    return res.status(statusCode.OK).json(dataTalkers);
  });
  
router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const dataTalkers = await readTalkers();
    const dataTalkerById = dataTalkers.find((talker) => talker.id === Number(id));
    if (dataTalkerById) {
      return res.status(statusCode.OK).json(dataTalkerById);
    }
    return res.status(statusCode.NOT_FOUND).json(statusMessage.NOT_FOUND_TALKER);
  });

router.post('/talker', tokenValidator,
 nameValidator,
 ageValidator,
 talkValidator,
 talkWatcheAtValidator,
 talkRateValidator, async (req, res) => {
  const listTalkers = await readTalkers();
  const newTalker = { id: listTalkers.length + 1, ...req.body };
  const addTalker = JSON.stringify([...listTalkers, newTalker]);
  await writeTalkers(addTalker);
  return res.status(statusCode.CREATED).json(newTalker);
});

module.exports = router;