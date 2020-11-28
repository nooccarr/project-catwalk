import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';

const ReviewList = ({ reviews, getCurrentReviews, sort, moreReviews, handleMoreReviewsClick, filter, addClickedReviewId, reviewIds }) => (
  <div>
    {/* {console.log(reviews)} */}
    {reviews.map((review, idx) => {
      return <ReviewListEntry
        review={review}
        getCurrentReviews={getCurrentReviews}
        sort={sort}
        moreReviews={moreReviews}
        handleMoreReviewsClick={handleMoreReviewsClick}
        filter={filter}
        addClickedReviewId={addClickedReviewId}
        reviewIds={reviewIds}
        key={idx}
      />
    })}
  </div>
);

export default ReviewList;