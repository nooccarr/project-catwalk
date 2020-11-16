import React from 'react';
import axios from 'axios';
import NewReview from './NewReview.jsx';
import ReviewList from './ReviewList.jsx';
import Rating from './Rating.jsx';

class RatingAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      reviews: []
    };
    this.getAllReviews = this.getAllReviews.bind(this);
  }

  componentDidMount() {
    this.getAllReviews('5', 'relevant');
  }

  getAllReviews(productId, sortBy) {
    return axios
      .get('http://3.21.164.220/reviews', {
        params: {
          product_id: productId,
          sort: sortBy
        }
      })
      .then(({data}) => {
        this.setState({
          reviews: data.results
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {console.log(this.state)}
        <hr />
        <Rating />
        <hr />
        <ReviewList />
        <hr />
        <NewReview />
      </div>
    );
  }
}

export default RatingAndReviews;