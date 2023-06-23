const express = require('express');
const readTalkers = require('./utils/talkerUtils');
const { 
  tokenGenerator, 
  loginValidation, 
  typeValidation,
 } = require('./utils/loginUtils');
const { statusCode, statusMessage } = require('./utils/statusUtils');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(statusCode.OK).send();
});

app.get('/talker', async (req, res) => {
  const dataTalkers = await readTalkers();
  if (!dataTalkers) {
    return res.status(statusCode.OK).json(JSON.parse([]));
  }
  return res.status(statusCode.OK).json(dataTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const dataTalkers = await readTalkers();
  const dataTalkerById = dataTalkers.find((talker) => talker.id === Number(id));
  if (dataTalkerById) {
    return res.status(statusCode.OK).json(dataTalkerById);
  }
  return res.status(statusCode.NOT_FOUND).json(statusMessage.NOT_FOUND_TALKER);
});

app.post('/talker', async (req, res) => {
  const { name, age, talk } = req.body;
  const currDataTalkers = await readTalkers();
  const newTalker = { name, age, id: currDataTalkers.length + 1, talk };
  return res.status(statusCode.CREATED).json([...currDataTalkers, newTalker]);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerator();
  switch (loginValidation(email, password)) {
    case typeValidation.EMAIL_VOID:
      return res.status(statusCode.BAD_REQUEST)
      .json(statusMessage.BAD_REQUEST_EMAIL_VOID);
    case typeValidation.EMAIL_INVALID:
      return res.status(statusCode.BAD_REQUEST)
      .json(statusMessage.BAD_REQUEST_EMAIL_INVALID);
    case typeValidation.PASSWORD_VOID: 
      return res.status(statusCode.BAD_REQUEST)
      .json(statusMessage.BAD_REQUEST_PASSWORD_VOID);
    case typeValidation.PASSWORD_INVALID:
      return res.status(statusCode.BAD_REQUEST)
      .json(statusMessage.BAD_REQUEST_PASSWORD_INVALID);
    default:
      return res.status(statusCode.OK).json({ token });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
