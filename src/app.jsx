import React from 'react';
import Overview from './components/overview/Overview.jsx';
import axios from 'axios';
import RatingAndReviews from './components/ratingAndReviewsComponents/RatingAndReviews.jsx';
import Related from './components/relatedProducts/Related.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleRelatedClick = this.handleRelatedClick.bind(this);
    this.handleOutfitClick = this.handleOutfitClick.bind(this);
  }
  handleRelatedClick(e) {
    var id = e.target.id;
    if (id) {
      if (e.target.className === 'related-item-star') {
        console.log('Add',id,'to outfit');
      } else {
        console.log('Redirect to id:',id);
      }
    }
  }
  handleOutfitClick(e) {
    var id = e.target.id;
    if (id) {
      if (e.target.className === 'related-item-star') {
        console.log('Remove',id,'from outfit');
      } else {
        console.log('Redirect to id:',id);
      }
    }
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
          <Related overviewId="1" handleClick={this.handleRelatedClick}
          pyro={0} products={fakeItems}/>
          <Related overviewId="1" handleClick={this.handleOutfitClick}
          pyro={1} products={fakeItems}/>
        </div>
        <RatingAndReviews className="ratingAndReviews"/>
        </div>
      </div>
    )
  }
}

export default App;