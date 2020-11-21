const TotalStars = (rating) => {
  let total = 0;

  for (i = 1; i <= 5; i++) {
    if (rating[i]) {
      total += rating[i];
    }
  }

  return total;
}

export default TotalStars;