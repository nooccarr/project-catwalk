import validBody from './validBody.js';
import validEmail from './validEmail.js';
import validPhotos from './validPhotos.js';

const validateSubmit = (rating, recommend, size, width, comfort, quality, length, fit, summary, body, nickname, email, photos) => {
  let message = 'You must enter the following:';
  if (
    !(
      rating && recommend && size &&
      width && comfort && quality &&
      length && fit && summary &&
      body && nickname && email
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
  if (!validPhotos(photos)) {
    message += '\nThe images selected are invalid or unable to be uploaded';
  }
  return message;
};

export default validateSubmit;
