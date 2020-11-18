import React from 'react';
import Overview from './components/overview/Overview.jsx';
import axios from 'axios';
import average from '../utils/average.js';
import _ from 'underscore';
import RatingAndReviews from './components/ratingAndReviewsComponents/RatingAndReviews.jsx';
import Related from './components/relatedProducts/Related.jsx';

class App extends React.Component {
  constructor(props) {
    var fish = ['Goldfish', 'Catfish', 'Butterfish', 'Kangaroo', 'Bazooka', 'Orange', 'Santa Claus', 'Charlie', 'Toby', 'Marina'];
    var fakeItems = [];
    for (var i=0; i<10;i++) {
      fakeItems.push({id: i + 1, name: fish[i], rating: 2.25,
        img: 'https://image.shutterstock.com/image-photo/gold-fish-isolated-on-white-260nw-580306465.jpg'});
    }
    super(props);
    this.state = {relatedProducts: [],outfit: fakeItems, productId: 5, productInfo: null};
    this.handleRedirect = this.handleRedirect.bind(this);
    this.toggleOutfit = this.toggleOutfit.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
  }
  componentDidMount() {
    this.getProduct(this.state.productId, (product) => {
      this.setState({productInfo: product});
    });
    this.getRelatedProducts(this.state.productId);
  }
  getProduct(id, cb) {
    axios.get(`http://3.21.164.220/products/${id}`)
      .then((results) => {
        var product = results.data;
        axios.get(`http://3.21.164.220/products/${id}/styles?product_id=${id}`)
        .then((styles) => {
          axios.get(`http://3.21.164.220/reviews/meta?product_id=${id}`)
            .then((ratings) => {
              product.average = average(ratings.data);
              product.styles = styles.data;
              product.faved = false; //true if product is in outfit
              cb(product);
            });
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
            products.push(product);
            count++;
            if (count === results.data.length) {
              this.setState({relatedProducts: products});
            }
          });
        });
    });
  }
  handleRedirect(id) {
      console.log('Redirect to id:',id);
  }
  toggleOutfit(id) {
    console.log('Toggle',id);
  }
  render() {
    return (
      <div>
        <div className="nav">
          <span className="logo">Donauwelle</span>
        </div>
          <div className="app">
        <Overview product={this.state.productInfo}/>
        <div className="listies">
          <Related overview={this.state.productInfo} handleRedirect={this.handleRedirect}
          pyro={0} products={this.state.relatedProducts} toggleOutfit={this.toggleOutfit}/>
          <Related overview={this.state.productInfo} handleRedirect={this.handleRedirect}
          pyro={1} products={this.state.outfit} toggleOutfit={this.toggleOutfit}/>
        </div>
        <RatingAndReviews className="ratingAndReviews"/>
        </div>
      </div>
    )
  }
}

export default App;