import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';

const ReviewList = ({ reviews, getAllReviews, sort }) => (
  <div>
    {/* {console.log(reviews)} */}
    {reviews.map((review, idx) => {
      return <ReviewListEntry
        review={review}
        getAllReviews={getAllReviews}
        sort={sort}
        key={idx}
      />
    })}
  </div>
);

export default ReviewList;