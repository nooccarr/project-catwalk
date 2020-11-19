import React from 'react';
import axios from 'axios';
import NewReview from './NewReview.jsx';
import ReviewList from './ReviewList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import average from '../../../utils/average.js';

class RatingAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 22, // requires this.props.productId (6, 22)
      product: 'Pumped Up Kicks', // requires this.props.name
      reviews: [],
      sort: 'relevant',
      show: false
    };
    this.getAllReviews = this.getAllReviews.bind(this);
    this.getRating = this.getRating.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.showReview = this.showReview.bind(this);
    this.hideReview = this.hideReview.bind(this);
  }

  componentDidMount() {
    // requires this.props.productId
    this.getRating();
  }

  getAllReviews(productId, sort) {
    return axios
      .get('http://3.21.164.220/reviews', {
        params: {
          product_id: productId,
          sort: sort
        }
      })
      .then(({ data }) => {
        this.setState({
          reviews: data.results
        })
      })
      .catch(err => console.log(err));
  }

  getRating() {
    return axios
      .get('http://3.21.164.220/reviews/meta', {
        params: { product_id: this.state.productId }
      })
      .then(result => this.setState({
        rating: result.data,
        average: average(result.data)
      }))
      .then(this.getAllReviews(this.state.productId, this.state.sort))
      .catch(err => console.log(err));
  }

  handleSortByChange(e) {
    const sort = e.target.value;
    this.setState({
      sort: sort
    });
    // requires this.props.productId
    this.getAllReviews(this.state.productId, sort);
  }

  showReview() {
    this.setState({
      show: true
    });
  }

  hideReview() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    return (
      <div>
        {console.log(this.state)}
        <hr />
        <div>RATINGS & REVIEWS</div>
        <RatingBreakdown
          average={this.state.average}
          rating={this.state.rating}
        />
        <ProductBreakdown />
        <form>
          <label>Sort on </label>
          <select onChange={(e) => this.handleSortByChange(e)}>
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </form>
        <ReviewList
          reviews={this.state.reviews}
          getAllReviews={this.getAllReviews}
          productId={this.state.productId}
          sort={this.state.sort}
        />
        <button onClick={this.showReview}>Write New Review</button>
        <NewReview
          show={this.state.show}
          hideReview={this.hideReview}
          product={this.state.product}
        />
      </div>
    );
  }
}

export default RatingAndReviews;