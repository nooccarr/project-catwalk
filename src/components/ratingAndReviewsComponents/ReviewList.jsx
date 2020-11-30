import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';

const ReviewList = ({ reviews, getCurrentReviews, getCurrentFiltered, sort, moreReviews, handleMoreReviewsClick, filter, addClickedReviewId, reviewIds }) => (
  <React.Fragment>
    {/* {console.log(reviews)} */}
    {reviews.map((review, idx) => {
      return <ReviewListEntry
        review={review}
        getCurrentReviews={getCurrentReviews}
        getCurrentFiltered={getCurrentFiltered}
        sort={sort}
        moreReviews={moreReviews}
        handleMoreReviewsClick={handleMoreReviewsClick}
        filter={filter}
        addClickedReviewId={addClickedReviewId}
        reviewIds={reviewIds}
        key={idx}
      />
    })}
  </React.Fragment>
);

export default ReviewList;