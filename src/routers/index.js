const express = require('express');
const loginRouter = require('./login.router');
const talkerRouter = require('./talker.router');

const router = express.Router();

router.use(loginRouter);
router.use(talkerRouter);

module.exports = router;