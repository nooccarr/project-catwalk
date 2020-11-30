const updateFiltered = (reviewsTemp, filtered, review_id, isHelpful = true) => {
  let result = filtered.slice();
  if (isHelpful) {
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
  } else {
    for (let k = 0; k < result.length; k++) {
      if (result[k].review_id === review_id) {
        result.splice(k, 1);
        break;
      }
    }
  }
  return result;
}

export default updateFiltered;