const fs =  require('fs').promises
const path = require('path');

const PATH_TALKERS = path.resolve(__dirname, '../talker.json')

const readTalkers = async () => {
    try {
        const data = await fs.readFile(PATH_TALKERS)
        return data
    } catch (error) {
        console.error('Could not read the file')
    }
}

module.exports = readTalkers