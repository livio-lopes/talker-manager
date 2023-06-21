const express = require('express');
const readTalkers = require('./utils/readTalkers')

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req,res) =>{
  const dataTalkers = JSON.parse(await readTalkers())
  if(!dataTalkers){
    res.status(HTTP_OK_STATUS).json(JSON.parse([]))
  }
  res.status(HTTP_OK_STATUS).json(dataTalkers)
})

app.listen(PORT, () => {
  console.log('Online');
});
