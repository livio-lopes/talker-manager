const express = require('express');
const readTalkers = require('./utils/readTalkers');
const { 
  tokenGenerator, 
  loginValidation, 
  EMAIL_VOID,
  EMAIL_INVALID, 
  PASSWORD_VOID,
  PASSWORD_INVALID } = require('./utils/loginUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const NOT_FOUND_TALKER = {
  message: 'Pessoa palestrante não encontrada',
};
const BAD_REQUEST = 400;
const BAD_REQUEST_EMAIL_VOID = {
  message: 'O campo "email" é obrigatório',
};

const BAD_REQUEST_EMAIL_INVALID = {
  message: 'O "email" deve ter o formato "email@email.com"',
};

const BAD_REQUEST_PASSWORD_VOID = {
  message: 'O campo "password" é obrigatório',
};

const BAD_REQUEST_PASSWORD_INVALID = {
  message: 'O "password" deve ter pelo menos 6 caracteres',
};

const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const dataTalkers = await readTalkers();
  if (!dataTalkers) {
    return res.status(HTTP_OK_STATUS).json(JSON.parse([]));
  }
  return res.status(HTTP_OK_STATUS).json(dataTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const dataTalkers = await readTalkers();
  const dataTalkerById = dataTalkers.find((talker) => talker.id === Number(id));
  if (dataTalkerById) {
    return res.status(HTTP_OK_STATUS).json(dataTalkerById);
  }
  return res.status(NOT_FOUND).json(NOT_FOUND_TALKER);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerator();
  switch (loginValidation(email, password)) {
    case EMAIL_VOID:
      return res.status(BAD_REQUEST).json(BAD_REQUEST_EMAIL_VOID);
    case EMAIL_INVALID:
      return res.status(BAD_REQUEST).json(BAD_REQUEST_EMAIL_INVALID);
    case PASSWORD_VOID: 
      return res.status(BAD_REQUEST).json(BAD_REQUEST_PASSWORD_VOID);
    case PASSWORD_INVALID:
      return res.status(BAD_REQUEST).json(BAD_REQUEST_PASSWORD_INVALID);
    default:
      return res.status(200).json({ token });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
