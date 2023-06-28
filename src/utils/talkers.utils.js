const fs = require('fs').promises;
const path = require('path');

const PATH_TALKERS = path.resolve(__dirname, '../talker.json');

const readTalkers = async () => {
  try {
    const data = await fs.readFile(PATH_TALKERS);
    return JSON.parse(data);
  } catch (error) {
    console.error('Could not read the file');
  }
};

const writeTalkers = async (talkers) => {
  try {
    await fs.writeFile(PATH_TALKERS, talkers);
  } catch (erro) {
    console.error('Could not write the file');
  }
};

const talkerById = async (id) => {
  const listTalkers = await readTalkers();
  return listTalkers.find((talker) => talker.id === Number(id));
};

const talkerByName = async (name) => {
  const listTalkers = await readTalkers();
  return listTalkers.filter((talker) => talker.name.includes(name));
};

const talkerByRate = async (rate) => {
  const listTalkers = await readTalkers();
  return listTalkers.filter((talker) => Number(talker.talk.rate) === Number(rate));
};

const talkerByRateName = async (rate, name) => {
  if (name) {
    const listTalkers = await talkerByName(name);
    return rate ? listTalkers.filter((talker) => talker.talk.rate === Number(rate)) : listTalkers;
  }
  const listTalkers = await talkerByRate(rate);
  return listTalkers;
};
const updateTalker = async (id, update) => {
  const listTalkers = await readTalkers();
  return listTalkers.map((talker) => (talker.id === Number(id) ? { id, ...update } : talker));
};

const deleteTalker = async (id) => {
  const listTalkers = await readTalkers();
  return listTalkers.filter((talker) => talker.id !== Number(id));
};

const validateRate = (rate) => {
  const nRate = Number(rate);
  return nRate < 1 || nRate > 5 || !Number.isInteger(nRate);
};

const hasOnlyRate = (name, rate) => !name && rate;
const hasRateValid = (rate) => rate && validateRate(rate);

module.exports = {
  readTalkers,
  writeTalkers,
  talkerById,
  updateTalker,
  deleteTalker,
  talkerByName,
  talkerByRate,
  validateRate,
  talkerByRateName,
  hasOnlyRate,
  hasRateValid,
};
