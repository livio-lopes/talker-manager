const express = require('express');
const readTalkers = require('./utils/readTalkers');
const tokenGenerator = require('./utils/tokenGenerator');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
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
  return res.status(NOT_FOUND).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerator();
  if (email && password) {
    return res.status(200).json({ token });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
