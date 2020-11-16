import React from 'react';
import axios from 'axios';
import NewReview from './NewReview.jsx';
import ReviewList from './ReviewList.jsx';
import Rating from './Rating.jsx';

class RatingAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      sort: 'relevant',
      showReview: false
    };
    this.getAllReviews = this.getAllReviews.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.toggleReview = this.toggleReview.bind(this);
  }

  componentDidMount() {
    // requires this.props.productId
    this.getAllReviews('6', this.state.sort);
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

  handleSortByChange(e) {
    const sort = e.target.value;
    this.setState({
      sort: sort
    });
    // requires this.props.productId
    this.getAllReviews('6', sort);
  }

  toggleReview() {
    this.setState({
      showReview: !this.state.showReview
    });
  }

  render() {
    return (
      <div>
        {/* {console.log(this.state)} */}
        <hr />
        <Rating />
        <form>
          <label>Sort on </label>
          <select onChange={(e) => this.handleSortByChange(e)}>
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </form>
        <ReviewList reviews={this.state.reviews}/>
        <button onClick={this.toggleReview}>Write Your Review</button>
        <NewReview showReview={this.state.showReview} toggleReview={this.toggleReview}/>
      </div>
    );
  }
}

export default RatingAndReviews;