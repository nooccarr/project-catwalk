const TotalStars = (rating) => {
  let total = 0;

  for (let i = 1; i <= 5; i++) {
    if (rating[i]) {
      total += rating[i];
    }
  }

  return total;
}

export default TotalStars;