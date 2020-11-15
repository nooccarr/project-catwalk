import React from 'react';
import NewReview from './NewReview.jsx';
import ReviewList from './ReviewList.jsx';
import Rating from './Rating.jsx';

class RatingAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <hr />
        <span>Rating and Reviews</span>
        <NewReview />
        <ReviewList />
        <hr />
        <Rating />
      </div>
    );
  }
}

export default RatingAndReviews;