import React from 'react';
import Stars from '../Stars.jsx';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  render() {
    const { average, rating } = this.props;

    return (
      <div>
        {/* {console.log(rating)} */}
        <h1>{average}</h1>
        {Stars(120, average)}
      </div>
    );
  }
};

export default RatingBreakdown;