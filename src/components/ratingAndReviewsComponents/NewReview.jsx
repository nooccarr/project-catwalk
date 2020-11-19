import React from 'react';
import axios from 'axios';
import Stars from '../Stars.jsx';
import CharacteristicEntry from './CharacteristicEntry.jsx';
import InputEntry from './InputEntry.jsx';
import getLabel from '../../../utils/getLabel.js';
import capitalize from '../../../utils/capitalize.js';
import counter from '../../../utils/counter.js';
import validateSubmit from '../../../utils/validateSubmit.js';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      summary: '',
      body: '',
      photos: [],
      nickname: '',
      email: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSelect(e) {
    if (typeof e === 'number') {
      this.setState({
        rating: e
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  submitReview() {
    let message = 'You must enter the following:';
    let messageSubmitted = validateSubmit(
      this.state.rating,
      this.state.recommend,
      this.state.size,
      this.state.width,
      this.state.comfort,
      this.state.quality,
      this.state.length,
      this.state.fit,
      this.state.body,
      this.state.nickname,
      this.state.email
    );

    if (message === messageSubmitted) {
      // axios POST /reviews
      // then this.props.getAllReviews()
      // catch error
      // this.props.hideReview()
      alert('SUCCESS');
    } else {
      alert(messageSubmitted);
    }
  }

  handleClose() {
    this.setState({
      rating: null,
      summary: '',
      body: '',
      photos: [],
      nickname: '',
      email: ''
    });
    this.props.hideReview();
  }

  render() {
    const characteristics = [
      'size', 'width', 'comfort', 'quality', 'length', 'fit'
    ];
    const { show, product } = this.props;

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
          {Stars(120, this.state.rating || 0, (e) => this.handleSelect(e))}
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
          {characteristics.map((name, idx) => {
            return (<CharacteristicEntry
              state={this.state[name]}
              name={name}
              handleSelect={this.handleSelect}
              key={idx}
            />);
          })}
        </div>
        <InputEntry
          subtitle={'Review summary'}
          name={'summary'}
          value={this.state.summary}
          maxLength={'60'}
          placeholder={'Example: Best purchase ever!'}
          handleSelect={this.handleSelect}
        />
        <InputEntry
          subtitle={'*Review body'}
          name={'body'}
          value={this.state.body}
          maxLength={'1000'}
          placeholder={'Why did you like the product or not?'}
          handleSelect={this.handleSelect}
          text={counter(this.state.body)}
        />
        <div>
          <h3>Upload your photos</h3>
          <button>Upload upto 5 photos</button>
        </div>
        <InputEntry
          subtitle={'*What is your nickname'}
          name={'nickname'}
          value={this.state.nickname}
          maxLength={'60'}
          placeholder={'Example: jackson11!'}
          handleSelect={this.handleSelect}
          text={'For privacy reasons, do not use your full name or email address'}
        />
        <InputEntry
          subtitle={'*Your email'}
          name={'email'}
          value={this.state.email}
          maxLength={'60'}
          placeholder={'Example: jackson11@email.com'}
          handleSelect={this.handleSelect}
          text={'For authentication reasons, you will not be emailed'}
        />
        <div>
          <button
            onClick={this.submitReview}
          >Submit review</button>
          <button onClick={this.handleClose}>Close</button>
        </div>
      </div>
    );
  }
}

export default NewReview;