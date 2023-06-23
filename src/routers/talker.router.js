const express = require('express');
const { readTalkers } = require('../utils/talkers.utils');
const { statusCode, statusMessage } = require('../utils/status.utils');

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

module.exports = router;