import React from 'react';
import NewReview from './NewReview.jsx';
import ReviewList from './ReviewList.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <hr />
        <span>Reviews</span>
        <NewReview />
        <ReviewList />
      </div>
    );
  }
}

export default Reviews;