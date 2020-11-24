const validEmail = (email) => {
  let parts = email.split('@');
  if (parts.length === 1) {
    return false;
  } else if (username(parts[0]) && domain(parts[1])) {
    return true;
  }
  return false;
};

const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

const username = (username) => {
  if (!username.length) {
    return false;
  }
  let ascii = characters + numbers;
  for (var i = 0; i < username.length; i++) {
    if (ascii.indexOf(username[i]) === -1) {
      return false;
    }
  }
  return true;
};

const domain = (domain) => {
  let parts = domain.split('.');
  if (parts.length !== 2) {
    return false;
  } else if (parts[0].length === 0 || parts[1].length === 0) {
    return false;
  }
  for (var i = 0; i < domain.length; i++) {
    if (domain[i] === '.') {
      continue;
    } else if (characters.indexOf(domain[i]) === -1) {
      return false;
    }
  }

  return true;
};

export default validEmail;
