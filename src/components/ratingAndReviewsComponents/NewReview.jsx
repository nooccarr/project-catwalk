import React from 'react';
import { Rating } from '@material-ui/lab';
// import { Box } from '@material-ui/core';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overallRating: 0
    };
    this.overallRatingHandleChange = this.overallRatingHandleChange.bind(this);
  }

  overallRatingHandleChange(e) {
    var overallRating = Number(e.target.value);
    this.setState({
      overallRating: overallRating
    });
  }

  render() {
    const { show, hideReview, product } = this.props;

    if (!show) {
      return null;
    }
    return (
      <div className="newReview">
        {console.log(this.state)}
        <h1>Write Your Review</h1>
        <h2>About the {product}</h2>
        <div>
          <h3>*Overall rating</h3>
          <div>
            <Rating
              name="overallRating"
              value={this.state.value}
              onChange={(e) => this.overallRatingHandleChange(e)}
            />
          </div>
        </div>
        <div>
          <button onClick={hideReview}>Close</button>
        </div>
      </div>
    );
  }
}

export default NewReview;