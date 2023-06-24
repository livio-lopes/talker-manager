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

const updateTalker = async (id, update) => {
  const listTalkers = await readTalkers();
  return listTalkers.map((talker) => (talker.id === Number(id) ? { id, ...update } : talker));
};

module.exports = {
  readTalkers,
  writeTalkers,
  talkerById,
  updateTalker,
};
