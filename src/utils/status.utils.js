const statusCode = {
  OK: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
};

const statusMessage = {
  NOT_FOUND_TALKER: {
    message: 'Pessoa palestrante não encontrada',
  },
  BAD_REQUEST_EMAIL_NOT_FOUND: {
    message: 'O campo "email" é obrigatório',
  },
  BAD_REQUEST_EMAIL_INVALID: {
    message: 'O "email" deve ter o formato "email@email.com"',
  },
  BAD_REQUEST_PASSWORD_NOT_FOUND: {
    message: 'O campo "password" é obrigatório',
  },
  BAD_REQUEST_PASSWORD_INVALID: {
    message: 'O "password" deve ter pelo menos 6 caracteres',
  },
};

module.exports = {
  statusCode,
  statusMessage,
};