const filterReviews = (reviews, filters) => {
  let filteredReview = [];
  for (let i = 0; i < reviews.length; i++) {
    let reviewRating = reviews[i].rating;
    if (filters[reviewRating]) {
      filteredReview.push(reviews[i]);
    }
  }
  return filteredReview;
};

export default filterReviews;