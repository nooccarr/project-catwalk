import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <span>Rating</span>
        <RatingBreakdown />
        <ProductBreakdown />
      </div>
    );
  }
};

export default Rating;