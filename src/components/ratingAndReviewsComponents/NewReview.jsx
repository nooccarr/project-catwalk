import React from 'react';
import { Rating } from '@material-ui/lab';
import getStarLabel from '../../../utils/getStarLabel.js';
import getSizeLabel from '../../../utils/getSizeLabel.js';
import getWidthLabel from '../../../utils/getWidthLabel.js';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      recommend: null,
      size: null,
      width: null,
      comfort: null,
      quality: null,
      length: null,
      fit: null,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.setState({
      [e.target.name]: e.target.value
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
            onChange={(e) => this.handleSelect(e)}
          />
          {this.state.rating ? <span>{getStarLabel(this.state.rating)}</span>: null}
        </div>
        <div>
          <h3>*Do you recommend this product?</h3>
          <input type="radio" name="recommend" value="yes" onClick={(e) => this.handleSelect(e)} />
          <label>Yes</label>
          <input type="radio" name="recommend" value="no" onClick={(e) => this.handleSelect(e)} />
          <label>No</label>
        </div>
        <div>
          <h3>*Characteristics</h3>
          <div>
            <h2>Size</h2>
            {this.state.size ? <h3>{getSizeLabel(this.state.size)}</h3> : <h3>none selected</h3>}
            <input type="radio" name="size" value="1" onClick={(e) => this.handleSelect(e)} />
            <label>1</label>
            <input type="radio" name="size" value="2" onClick={(e) => this.handleSelect(e)} />
            <label>2</label>
            <input type="radio" name="size" value="3" onClick={(e) => this.handleSelect(e)} />
            <label>3</label>
            <input type="radio" name="size" value="4" onClick={(e) => this.handleSelect(e)} />
            <label>4</label>
            <input type="radio" name="size" value="5" onClick={(e) => this.handleSelect(e)} />
            <label>5</label>
          </div>
          <div>
            <h2>Width</h2>
            {this.state.width ? <h3>{getWidthLabel(this.state.width)}</h3> : <h3>none selected</h3>}
            <input type="radio" name="width" value="1" onClick={(e) => this.handleSelect(e)} />
            <label>1</label>
            <input type="radio" name="width" value="2" onClick={(e) => this.handleSelect(e)} />
            <label>2</label>
            <input type="radio" name="width" value="3" onClick={(e) => this.handleSelect(e)} />
            <label>3</label>
            <input type="radio" name="width" value="4" onClick={(e) => this.handleSelect(e)} />
            <label>4</label>
            <input type="radio" name="width" value="5" onClick={(e) => this.handleSelect(e)} />
            <label>5</label>
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