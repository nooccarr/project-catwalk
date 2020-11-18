const months = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
};

const formatDate = (rawDate) => {
  let parts = rawDate.split('-');
  let year = parts[0];
  let month = months[parts[1]];
  let date = parts[2].split('T')[0];

  return `${month} ${date}, ${year}`;
};

export default formatDate;