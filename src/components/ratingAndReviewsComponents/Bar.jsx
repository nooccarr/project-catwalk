import React from 'react';
import getPercentage from '../../../utils/getPercentage.js';

const Bar = ({ star, rating = 0, total, handleBarClick }) => {
  let width = { width: `${getPercentage(total, rating)}%` };

  return (
    <div
      className="ratingBreakdownBar"
      onClick={() => handleBarClick(star)}
    >
      <div className="ratingBreakdownStars">{star} stars</div>
      <div className="progress-bar">
        <span style={width}>progress bar</span>
      </div>
      <div className="ratingBreakdownStarsCount">{rating}</div>
    </div>
  );
}

export default Bar;