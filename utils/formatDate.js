const months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'Sepember',
  '10': 'October',
  '11': 'November',
  '12': 'December'
};

const formatDate = (rawDate) => {
  let parts = rawDate.split('-');
  let year = parts[0];
  let month = months[parts[1]];
  let date = parts[2].split('T')[0];

  return `${month} ${date}, ${year}`;
};

export default formatDate;