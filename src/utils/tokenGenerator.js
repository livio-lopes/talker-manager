const tokenGenerator = () => {
  const LENGTH = 16;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const listCaracters = [];
  for (let i = 0; i < LENGTH; i += 1) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const drawnCharacter = alphabet.charAt(randomIndex);
    listCaracters.push(drawnCharacter);
  }
  return listCaracters.join('');
};

module.exports = tokenGenerator;
