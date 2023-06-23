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

// const EMAIL_VOID = 'EMAIL_VOID';
// const EMAIL_INVALID = 'EMAIL_INVALID';
// const PASSWORD_VOID = 'PASSWORD_VOID';
// const PASSWORD_INVALID = 'PASSWORD_INVALID';

// const loginValidation = (email, password) => {
  
//   if (!email) {
//     return EMAIL_VOID;
//   }
//   if (!password) {
//     return PASSWORD_VOID;
//   }
//   if (password.length < 6) {
//     return PASSWORD_INVALID;
//   }
//   if (!validEmail) {
//     return EMAIL_INVALID;
//   }
//   return 'LOGIN_VALIDO';
// };

module.exports = {
  tokenGenerator,
};
