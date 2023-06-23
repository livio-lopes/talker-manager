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

const typeValidation = {
  EMAIL_VOID: 'EMAIL_VOID',
  EMAIL_INVALID: 'EMAIL_INVALID',
  PASSWORD_VOID: 'PASSWORD_VOID',
  PASSWORD_INVALID: 'PASSWORD_INVALID',
  LOGIN_VALID: 'LOGIN_VALID',
};

const loginValidation = (email, password) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const validEmail = emailRegex.test(email);
  if (!email) {
    return typeValidation.EMAIL_VOID;
  }
  if (!password) {
    return typeValidation.PASSWORD_VOID;
  }
  if (password.length < 6) {
    return typeValidation.PASSWORD_INVALID;
  }
  if (!validEmail) {
    return typeValidation.EMAIL_INVALID;
  }
  return typeValidation.LOGIN_VALID;
};

module.exports = {
  tokenGenerator,
  loginValidation,
  typeValidation,
};
