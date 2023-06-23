const express = require('express');
const { statusCode } = require('../utils/status.utils');
const { tokenGenerator } = require('../utils/login.utils');
const emailValidator = require('../middlewares/emailValidator');
const passwordValidator = require('../middlewares/passwordValidator');

const router = express.Router();

router.post('/login', emailValidator, passwordValidator, (req, res) => {
    const token = tokenGenerator();
    return res.status(statusCode.OK).json({ token });
  });
module.exports = router;