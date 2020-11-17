import React from 'react';
import { Rating } from '@material-ui/lab';
import CharacteristicEntry from './CharacteristicEntry.jsx';
import getLabel from '../../../utils/getLabel.js';
import capitalize from '../../../utils/capitalize.js';
import counter from '../../../utils/counter.js';

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
      summary: '',
      body: '',
      // photos: ,
      nickname: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const characteristics = [
      'size', 'width', 'comfort', 'quality', 'length', 'fit'
    ];
    const { show, hideReview, product } = this.props;

    if (!show) {
      return null;
    }
    return (
      <div className="newReview">
        {console.log(this.state)}
        <h1>Write Your Review</h1>
        <h3>About the {product}</h3>
        <div>
          <h3>*Overall rating</h3>
          <Rating
            name="rating"
            value={this.state.value}
            onChange={(e) => this.handleSelect(e)}
          />
          {this.state.rating ? <span>
            {getLabel('rating', this.state.rating)}
          </span>: null}
        </div>
        <div>
          <h3>*Do you recommend this product?</h3>
          {['yes', 'no'].map((value, idx) => {
            return (<span key={idx}>
              <input
                type="radio"
                name="recommend"
                value={value}
                onClick={(e) => this.handleSelect(e)} />
              <label>{capitalize(value)}</label>
            </span>);
          })}
        </div>
        <div>
          <h3>*Characteristics</h3>
          {characteristics.map((property, idx) => {
            return (<CharacteristicEntry
              state={this.state[property]}
              property={property}
              handleSelect={this.handleSelect}
              key={idx}
            />);
          })}
        </div>
        <div>
          <h3>Review summary</h3>
          <input
            name="summary"
            type="text"
            value={this.state.summary}
            maxLength="60"
            placeholder="Example: Best purchase ever!"
            onChange={(e) => this.handleSelect(e)}
          />
        </div>
        <div>
          <h3>*Review body</h3>
          <input
            name="body"
            type="text"
            value={this.state.body}
            minLength="50"
            maxLength="1000"
            placeholder="Why did you like the product or not?"
            onChange={(e) => this.handleSelect(e)}
          />
          <h4>{counter(this.state.body)}</h4>
        </div>
        {/* <div>
          <h3>Upload your photos</h3>
          <button>Upload upto 5 photos</button>
        </div> */}
        <div>
          <h3>*What is your nickname</h3>
          <input
            name="nickname"
            type="text"
            value={this.state.nickname}
            maxLength="60"
            placeholder="Example: jackson11!"
            onChange={(e) => this.handleSelect(e)}
          />
          <h4>For privacy reasons, do not use your full name or email address</h4>
        </div>
        <div>
          <h3>*Your email</h3>
        </div>
        <div>
          <button onClick={hideReview}>Close</button>
        </div>
      </div>
    );
  }
}

export default NewReview;