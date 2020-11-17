import React from 'react';
// import Sample from './components/sample.jsx';
import Overview from './components/Overview';
import RatingAndReviews from './components/ratingAndReviewsComponents/RatingAndReviews.jsx';
import Related from './components/relatedProducts/Related.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var fish = ['Goldfish', 'Catfish', 'Butterfish', 'Kangaroo', 'Bazooka', 'Orange', 'Santa Claus', 'Charlie', 'Toby', 'Marina'];
    var fakeItems = [];
    for (var i=0; i<10;i++) {
      fakeItems.push({id: i, name: fish[i],
      img: 'https://image.shutterstock.com/image-photo/gold-fish-isolated-on-white-260nw-580306465.jpg'});
    }
    return (
      <div>
        <div className="nav">
          <span className="logo">Donauwelle</span>
        </div>
          <div className="app">
        <Overview/>
        <div className="listies">
          <Related pyro={0} products={fakeItems}/>
          <Related pyro={1} products={fakeItems}/>
        </div>
        <RatingAndReviews className="ratingAndReviews"/>
        </div>
      </div>
    )
  }
}

export default App;