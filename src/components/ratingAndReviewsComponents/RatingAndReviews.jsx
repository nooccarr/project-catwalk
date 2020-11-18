import React from 'react';
import axios from 'axios';
import NewReview from './NewReview.jsx';
import ReviewList from './ReviewList.jsx';
import Rating from './Rating.jsx';

class RatingAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 6, // requires this.props.productId (6)
      product: 'Pumped Up Kicks', // requires this.props.name
      reviews: [],
      sort: 'relevant',
      show: false
    };
    this.getAllReviews = this.getAllReviews.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.showReview = this.showReview.bind(this);
    this.hideReview = this.hideReview.bind(this);
  }

  componentDidMount() {
    // requires this.props.productId
    this.getAllReviews(this.state.productId, this.state.sort);
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