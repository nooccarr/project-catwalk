import React from 'react';

const ReviewList = ({ reviews }) => (
  <div>
    <ul>
      {reviews.map((review, idx) => {
        return <ReviewListEntry review={review} key={idx}/>
      })}
    </ul>
  </div>
);

const ReviewListEntry = ({ review }) => (
  <li>{review.summary}</li>
)

export default ReviewList;