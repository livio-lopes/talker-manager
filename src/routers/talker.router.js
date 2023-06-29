const express = require('express');
const { readTalkers, 
  writeTalkers, talkerById, 
  updateTalker, deleteTalker,
   talkerByRateName, updateRateById, validateRate } = require('../utils/talkers.utils');
const { statusCode, statusMessage } = require('../utils/status.utils');
const tokenValidator = require('../middlewares/tokenValidator');
const nameValidator = require('../middlewares/nameValidator');
const ageValidator = require('../middlewares/ageValidator');
const talkValidator = require('../middlewares/talkValidator');
const talkWatcheAtValidator = require('../middlewares/talkWatchedatValidator');
const talkRateValidator = require('../middlewares/talkRateValidator');
const talkerSearchValidator = require('../middlewares/talkerSearch');
const talkerSearchNameNotFound = require('../middlewares/talkerSearchNameNotFound');
const talkerSearchDate = require('../middlewares/talkerSearchDate');
const talkerSearchDateInvalid = require('../middlewares/validateDate');
const connection = require('../db/connection');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const dataTalkers = await readTalkers();
    if (!dataTalkers) {
      return res.status(statusCode.OK).json(JSON.parse([]));
    }
    return res.status(statusCode.OK).json(dataTalkers);
  });

  router.get('/talker/db', async (req, res) => {
    const [dbResult] = await connection.execute('SELECT * FROM TalkerDB.talkers');
    const refactorResult = dbResult.map((talker) => ({
      id: talker.id,
      name: talker.name,
      age: talker.age,
      talk: {
        rate: talker.talk_rate,
        watchedAt: talker.talk_watched_at,
      },
    }));
    return res.status(statusCode.OK).json(refactorResult);
  });

  // update Commit
  router.get('/talker/search', tokenValidator,
    talkerSearchValidator,
    talkerSearchDateInvalid,
    talkerSearchDate, 
    talkerSearchNameNotFound, async (req, res) => {
    const { q, rate } = req.query;
    const listTalkers = await talkerByRateName(rate, q);
    return res.status(statusCode.OK).json(listTalkers);
  });

router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const dataTalkerById = await talkerById(id);
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

router.patch('/talker/rate/:id', tokenValidator, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  if (rate === undefined) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_TALK_RATE_NOT_FOUND);
  }
  if (validateRate(rate)) {
    return res.status(statusCode.BAD_REQUEST).json(statusMessage.BAD_REQUEST_TALK_RATE_INVALID);
  }
  const updatedRate = await updateRateById(rate, id);
  await writeTalkers(JSON.stringify(updatedRate));
  return res.status(statusCode.NO_CONTENT).end();
});

router.put('/talker/:id', tokenValidator,
nameValidator,
ageValidator,
talkValidator,
talkRateValidator,
talkWatcheAtValidator, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const foundTalker = await talkerById(id);
  if (!foundTalker) {
    return res.status(statusCode.NOT_FOUND).json(statusMessage.NOT_FOUND_TALKER);
  }
  const updateInfoTalker = { id: Number(id), name, age, talk };
  const updatedListTalkers = await updateTalker(id, updateInfoTalker);
  await writeTalkers(JSON.stringify(updatedListTalkers));
  return res.status(statusCode.OK).json(updateInfoTalker);
});

router.delete('/talker/:id', tokenValidator, async (req, res) => {
  const { id } = req.params;
  const deletedTalker = await deleteTalker(id);
  await writeTalkers(JSON.stringify(deletedTalker));
  return res.status(statusCode.NO_CONTENT).end();
});

module.exports = router;