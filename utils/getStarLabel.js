const labels = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great'
};

const getStarLabel = (rating) => {
  return labels[rating];
};

export default getStarLabel;