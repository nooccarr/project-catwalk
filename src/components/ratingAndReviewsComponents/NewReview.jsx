import React from 'react';
import { Rating } from '@material-ui/lab';
import getStarLabel from '../../../utils/getStarLabel.js';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      recommend: null,
      size: 'none selected',
      width: 'none selected',
      comfort: 'none selected',
      quality: 'none selected',
      length: 'none selected',
      fit: 'none selected',
    };
    this.ratingHandleChange = this.ratingHandleChange.bind(this);
    this.recommendHandleClick = this.recommendHandleClick.bind(this);
  }

  ratingHandleChange(e) {
    this.setState({
      rating: e.target.value
    });
  }

  recommendHandleClick(e) {
    this.setState({
      recommend: e.target.value
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
          <Rating
            name="rating"
            value={this.state.value}
            onChange={(e) => this.ratingHandleChange(e)}
          />
          {this.state.rating ? <span>{getStarLabel(this.state.rating)}</span>: null}
        </div>
        <div>
          <h3>*Do you recommend this product?</h3>
          <input type="radio" name="recommend" value="yes" onClick={(e) => this.recommendHandleClick(e)}/>
          <label>Yes</label>
          <input type="radio" name="recommend" value="no" onClick={(e) => this.recommendHandleClick(e)}/>
          <label>No</label>
        </div>
        <div>
          <h3>*Characteristics</h3>
          <div>

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