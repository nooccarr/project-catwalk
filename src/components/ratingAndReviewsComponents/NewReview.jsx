import React from 'react';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { showReview, toggleReview } = this.props;

    if (!showReview) {
      return null;
    }
    return (
      <div className="newReview">
        <h5>New Review Form</h5>
        <div></div>
        <div>
          <button onClick={toggleReview}>Close</button>
        </div>
      </div>
    );
  }
}

export default NewReview;