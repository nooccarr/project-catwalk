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
      sort: 'relevant'
    };
    this.getAllReviews = this.getAllReviews.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
  }

  // requires this.props.productId
  componentDidMount() {
    this.getAllReviews('5', this.state.sort);
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
    this.getAllReviews('5', sort);
  }

  render() {
    return (
      <div>
        {/* {console.log(this.state)} */}
        <hr />
        <Rating />
        <hr />
        <span>{`${this.state.reviews.length} reviews, sorted by `}
          <select onChange={(e) => this.handleSortByChange(e)}>
            <option value="relevant">Relevance</option>
            <option value="helpful">Helpfulness</option>
            <option value="newest">Newest</option>
          </select>
        </span>
        <ReviewList reviews={this.state.reviews}/>
        <hr />
        <NewReview />
      </div>
    );
  }
}

export default RatingAndReviews;