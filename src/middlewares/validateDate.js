const { statusCode, statusMessage } = require('../utils/status.utils');

const talkerSearchDateInvalid = (req, res, next) => {
    const { date } = req.query;
    const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const dateValidate = regexDate.test(date);

    if (date && !dateValidate) {
        return res.status(statusCode.BAD_REQUEST)
        .json(statusMessage.BAD_REQUEST_TALKER_SEARCH_DATE_INVALID);
    }
    next();
};

module.exports = talkerSearchDateInvalid;