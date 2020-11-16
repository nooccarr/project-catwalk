import React from 'react';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { show, hideReview, product } = this.props;

    if (!show) {
      return null;
    }
    return (
      <div className="newReview">
        <h1>Write Your Review</h1>
        <h2>About the {product}</h2>
        <div>
          <h3>*Overall rating</h3>
        </div>
        <div>
          <button onClick={hideReview}>Close</button>
        </div>
      </div>
    );
  }
}

export default NewReview;