const getPercentage = (total, star = 0) => {
  if (!total) {
    return 0;
  }
  let result = (star / total) * 100;
  return Number(result.toFixed(0));
};

export default getPercentage;