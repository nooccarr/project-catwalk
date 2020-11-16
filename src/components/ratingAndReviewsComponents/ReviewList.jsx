import React from 'react';

const ReviewList = (props) => (
  <div>
    <span>Review List</span>
    <ul>
      <ReviewListEntry />
    </ul>
  </div>
);

const ReviewListEntry = (props) => (
  <li>Review List Entry</li>
)

export default ReviewList;