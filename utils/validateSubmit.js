import validBody from './validBody.js';
import validEmail from './validEmail.js';

const validateSubmit = (rating, recommend, size, width, comfort, quality, length, fit, body, nickname, email) => {
  let message = 'You must enter the following:';
  if (
    !(
      rating && recommend && size &&
      width && comfort && quality &&
      length && fit && body &&
      nickname && email
    )
  ) {
    message += '\nAny mandatory fields are blank';
  }
  if (!validBody(body, 50)) {
    message += '\nThe review body is less than 50 characters';
  }
  if (!validEmail(email)) {
    message += '\nThe email address provided is not in correct format';
  }
  return message;
};

export default validateSubmit;
