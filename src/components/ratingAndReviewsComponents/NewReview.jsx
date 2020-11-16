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
      <div>
        <hr />
        <div>New Review Form</div>
        <button onClick={toggleReview}>Close</button>
      </div>
    );
  }
}

export default NewReview;