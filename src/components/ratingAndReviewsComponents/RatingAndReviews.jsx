import React from 'react';
import axios from 'axios';
import NewReview from './NewReview.jsx';
import ReviewList from './ReviewList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import average from '../../../utils/average.js';
import filterReviews from '../../../utils/filterReviews.js';
import Stars from '../Stars.jsx';

class RatingAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      product: this.props.product,
      reviews: [],
      sort: 'relevant',
      show: false,
      filter: false
    };
    this.getAllReviews = this.getAllReviews.bind(this);
    this.getRating = this.getRating.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.showReview = this.showReview.bind(this);
    this.hideReview = this.hideReview.bind(this);
    this.selectedFilters = this.selectedFilters.bind(this);
    this.noFilter = this.noFilter.bind(this);
  }

  componentDidMount() {
    this.getAllReviews();
    this.getRating();
  }

  getAllReviews(sort) {
    return axios
      .get('http://3.21.164.220/reviews', {
        params: {
          product_id: this.state.productId,
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
      .then(meta => this.setState({
        rating: meta.data,
        average: average(meta.data)
      }))
      .catch(err => console.log(err));
  }

  handleSortByChange(e) {
    const sort = e.target.value;
    this.setState({
      sort: sort
    });
    this.getAllReviews(sort);
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

  selectedFilters(filters) {
    let filtered = filterReviews(this.state.reviews, filters);
    this.setState({
      filtered: filtered,
      filter: true
    });
  }

  noFilter() {
    this.setState({
      filter: false
    });
  }

  render() {
    return (
      <div>
        {/* {console.log(this.state)} */}
        <hr />
        <div>RATINGS & REVIEWS</div>
        <div>
          <h1>{this.state.average}</h1>
          {Stars(120, this.state.average)}
        </div>
        {this.state.rating ? <div>
          <RatingBreakdown
            ratings={this.state.rating.ratings}
            selectedFilters={this.selectedFilters}
            noFilter={this.noFilter}
            rec={this.state.rating.recommended}
          />
          <ProductBreakdown
            characteristics={this.state.rating.characteristics}
          />
        </div>: null}
        <form>
          <label>Sort on </label>
          <select onChange={(e) => this.handleSortByChange(e)}>
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </form>
        <ReviewList
          reviews={this.state.filter ? this.state.filtered : this.state.reviews}
          getAllReviews={this.getAllReviews}
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