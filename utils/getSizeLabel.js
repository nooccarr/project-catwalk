const labels = {
  1: 'A size too small',
  2: '1/2 a size too small',
  3: 'Perfect',
  4: '1/2 a size too big',
  5: 'A size too big'
};

const getSizeLabel = (rating) => {
  return labels[rating];
};

export default getSizeLabel;