import React from 'react';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { show, hideReview } = this.props;

    if (!show) {
      return null;
    }
    return (
      <div className="newReview">
        <h5>New Review Form</h5>
        <div></div>
        <div>
          <button onClick={hideReview}>Close</button>
        </div>
      </div>
    );
  }
}

export default NewReview;