import React from 'react';
import Overview from './components/overview/Overview.jsx';
import axios from 'axios';
import _ from 'underscore';
import RatingAndReviews from './components/ratingAndReviewsComponents/RatingAndReviews.jsx';
import Related from './components/relatedProducts/Related.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {relatedProducts: [], productId: 6, productInfo: null};
    this.handleRelatedClick = this.handleRelatedClick.bind(this);
    this.handleOutfitClick = this.handleOutfitClick.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.getRelatedProducts(6);
  }
  getProduct(id, cb) {
    axios.get(`http://3.21.164.220/products/${id}`)
      .then((results) => {
        var product = results.data;
        axios.get(`http://3.21.164.220/products/${id}/styles?product_id=${id}`)
        .then((styles) => {
          product.styles = styles.data;
          cb(product);
        });
      });
  }
  getRelatedProducts(id) {
    var count = 0;
    axios.get(`http://3.21.164.220/products/${id}/related?product_id=${id}`)
      .then((results) => {
        var products = [];
        _.each(results.data, (id) => {
          this.getProduct(id, (product) => {
            console.log(product);
            products.push(product);
            count++;
            if (count === results.data.length) {
              this.setState({relatedProducts: products});
            }
          });
        });
    });
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
      fakeItems.push({id: i, name: fish[i], rating: 2.25,
        img: 'https://image.shutterstock.com/image-photo/gold-fish-isolated-on-white-260nw-580306465.jpg'});
    }
    return (
      <div>
        <div className="nav">
          <span className="logo">Donauwelle</span>
        </div>
          <div className="app">
        <Overview product={this.state.productInfo}/>
        <div className="listies">
          <Related overviewId={6} handleClick={this.handleRelatedClick}
          pyro={0} products={this.state.relatedProducts}/>
          <Related overviewId={1} handleClick={this.handleOutfitClick}
          pyro={1} products={fakeItems}/>
        </div>
        <RatingAndReviews className="ratingAndReviews"/>
        </div>
      </div>
    )
  }
}

export default App;