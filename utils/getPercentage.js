const getPercentage = (total, star) => {
  let result = (star / total) * 100;
  return Number(result.toFixed(0));
};

export default getPercentage;