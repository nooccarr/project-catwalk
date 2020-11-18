import React from 'react';

const ReviewList = ({ reviews }) => (
  <div>
      {reviews.map((review, idx) => {
        return <ReviewListEntry review={review} key={idx}/>
      })}
  </div>
);

const ReviewListEntry = ({ review }) => (
  <li>{review.summary}</li>
)

export default ReviewList;