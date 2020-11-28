const updateFiltered = (reviewsTemp, filtered, review_id) => {
  let result = filtered.slice();
  let updatedReview;
  let filteredIdx;
  for (let i = 0; i < reviewsTemp.length; i++) {
    if (reviewsTemp[i].review_id === review_id) {
      updatedReview = reviewsTemp[i];
    }
  }
  for (let j = 0; j < filtered.length; j++) {
    if (filtered[j].review_id === review_id) {
      filteredIdx = j;
    }
  }
  result[filteredIdx] = updatedReview;
  return result;
}

export default updateFiltered;