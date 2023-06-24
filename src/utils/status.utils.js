const statusCode = {
  OK: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  CREATED: 201,
  UNAUTHORIZED: 401,
  NO_CONTENT: 204,
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
  UNAUTHORIZED_TOKEN_NOT_FOUND: {
    message: 'Token não encontrado',
  },
  UNAUTHORIZED_TOKEN_INVALID: {
    message: 'Token inválido',
  },
  BAD_REQUEST_NAME_NOT_FOUND: {
    message: 'O campo "name" é obrigatório',
  },
  BAD_REQUEST_NAME_INVALID: {
    message: 'O "name" deve ter pelo menos 3 caracteres',
  },
  BAD_REQUEST_AGE_NOT_FOUND: {
    message: 'O campo "age" é obrigatório',
  },
  BAD_REQUEST_AGE_INVALID: {
    message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
  },
  BAD_REQUEST_TALK_NOT_FOUND: {
    message: 'O campo "talk" é obrigatório',
  },
  BAD_REQUEST_TALK_WATCHEDAT_NOT_FOUND: {
    message: 'O campo "watchedAt" é obrigatório',
  },
  BAD_REQUEST_TALK_WATCHEDAT_INVALID: {
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  },
  BAD_REQUEST_TALK_RATE_NOT_FOUND: {
    message: 'O campo "rate" é obrigatório',
  },
  BAD_REQUEST_TALK_RATE_INVALID: {
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  },
};

module.exports = {
  statusCode,
  statusMessage,
};