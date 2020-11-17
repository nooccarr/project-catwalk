const labels = {
  1: 'Too narrow',
  2: 'Slightly narrow',
  3: 'Perfect',
  4: 'Slightly wide',
  5: 'Too wide'
};

const getWidthLabel = (rating) => {
  return labels[rating];
};

export default getWidthLabel;