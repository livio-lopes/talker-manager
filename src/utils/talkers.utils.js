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

const talkerByDate = async (date) => {
  const listTalkers = await readTalkers();
  return listTalkers.filter((talker) => talker.talk.watchedAt === date);
};
const talkerByRateName = async (rate, name) => {
  if (name) {
    const listTalkers = await talkerByName(name);
    return rate ? listTalkers.filter((talker) => talker.talk.rate === Number(rate)) : listTalkers;
  }
  const listTalkers = await talkerByRate(rate);
  return listTalkers;
};

const talkerByDateName = async (date, name) => {
  const listTalkers = await talkerByName(name);
  return listTalkers.filter((talker) => talker.talk.watchedAt === date);
};

const talkerSearchComplete = async (name, rate, date) => {
  const listByName = await talkerByName(name);
  const listByRate = listByName.filter((talker) => talker.talk.rate === Number(rate));
  const listByDate = listByRate.filter((talker) => talker.talk.watchedAt === date);
  return listByDate;
};
const updateTalker = async (id, update) => {
  const listTalkers = await readTalkers();
  return listTalkers.map((talker) => (talker.id === Number(id) ? { id, ...update } : talker));
};

const deleteTalker = async (id) => {
  const listTalkers = await readTalkers();
  return listTalkers.filter((talker) => talker.id !== Number(id));
};

const updateRateById = async (rate, id) => {
  const listTalkers = await readTalkers();
  return listTalkers.map((talker) => {
    if (talker.id === Number(id)) {
      return {
        ...talker,
        talk: {
          rate,
          watchedAt: talker.talk.watchedAt,
        },
      };
    }
    return talker;
  });
};

const validateRate = (rate) => {
  const nRate = Number(rate);
  return nRate < 1 || nRate > 5 || !Number.isInteger(nRate);
};

const validadeDate = (date) => {
  const dateRegex = /(0[1-9]|1\d|2\d|3[0-1])(\/|-|\.|)(0[1-9]|1[0-2])\2\d{4}/;
  return dateRegex.test(date);
};

const hasOnlyRate = (name, rate) => !name && rate;
const hasOnlyDate = (name, rate, date) => !name && !rate && date;
const hasDateName = (name, rate, date) => !rate && name && date;
const searchComplete = (name, rate, date) => name && rate && date;
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
  hasOnlyDate,
  talkerByDate,
  validadeDate,
  hasDateName,
  talkerByDateName,
  searchComplete,
  talkerSearchComplete,
  updateRateById,
};
