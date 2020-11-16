import React from 'react';
// import Sample from './components/sample.jsx';
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
        <div className="nav">
          <span className="logo">Donauwelle</span>
        </div>
<<<<<<< HEAD
          <div className="app">
        <Overview/>
        <Related products={[1,2,3,4,5]}/>
        <Reviews/>
        </div>
=======
        <Overview className="overview"/>
        <Related className="related"/>
        <RatingAndReviews className="ratingAndReviews"/>
>>>>>>> 199cec54b1b7096ebdae3bd6017fa1418ca31d91
      </div>
    )
  }
}

export default App;