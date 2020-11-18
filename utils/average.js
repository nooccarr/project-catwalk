const average = (obj) => {
  let sum = 0;
  let total = 0;
  for (let score = 1; score <= 5; score++) {
    let count = obj.ratings[score];
    if (count) {
      sum += count * score;
      total += count;
    }
  }
  return sum / total;
};

export default average;