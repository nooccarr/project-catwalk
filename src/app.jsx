import React from 'react';
import Sample from './components/sample.jsx';
import Overview from './components/Overview';
import RatingAndReviews from './components/ratingAndReviewsComponents/RatingAndReviews.jsx';
import Related from './components/Related';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Sample />
        <Overview/>
        <Related/>
        <RatingAndReviews/>
      </div>
    )
  }
}

export default App;