import React from 'react';
import Overview from './components/overview/Overview.jsx';
import axios from 'axios';
import average from '../utils/average.js';
import _ from 'underscore';
import RatingAndReviews from './components/ratingAndReviewsComponents/RatingAndReviews.jsx';
import Related from './components/relatedProducts/Related.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {relatedProducts: [],outfit: [], outfitIndex: {},
      productId: 5, productInfo: {faved: false}, relatedIndex: {}};
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
            var index = this.state.relatedIndex;
            index[id] = count;
            count++;
            if (count === results.data.length) {
              this.setState({relatedProducts: products, relatedIndex: index});
            }
          });
        });
    });
  }
  handleRedirect(id) {
      if (id !== this.state.productId) {
      console.log('Redirect to id:',id);
      }
  }
  toggleOutfit(id) {
    var product, outfit, index;
    if (id === this.state.productId) {
      product = this.state.productInfo;
      product.faved = !product.faved;
      this.setState({productInfo: product});
    } else {
        outfit = this.state.outfit;
        index = this.state.outfitIndex;
        //console.log('initial',outfit, index);
        if (index[id] >= 0) {
          delete outfit[index[id]];
          index[id] = -1;
          //console.log('deleted',outfit, index);
          this.setState({outfit: outfit, outfitIndex: index});
        } else {
          product = this.state.relatedProducts[this.state.relatedIndex[id]];
          index[id] = outfit.length;
          outfit.push(product);
          //console.log('added',outfit, index);
          this.setState({outfit: outfit, outfitIndex: index});
      }
    }
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