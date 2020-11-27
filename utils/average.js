const average = (obj) => {
  let sum = 0;
  let totalCount = 0;
  for (let score = 1; score <= 5; score++) {
    let count = obj.ratings[score];
    if (count) {
      sum += count * score;
      totalCount += count;
    }
  }
  if (!sum && !totalCount) {
    return 0;
  }
  let result = sum / totalCount;
  return Number(result.toFixed(1));
};

export default average;