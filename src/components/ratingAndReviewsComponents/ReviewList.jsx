import React from 'react';
import Stars from '../Stars.jsx';
import formatDate from '../../../utils/formatDate.js';
import axios from 'axios';

const ReviewList = ({ reviews, getAllReviews, productId, sort }) => (
  <div>
      {reviews.map((review, idx) => {
        return <ReviewListEntry
          review={review}
          key={idx}
          getAllReviews={getAllReviews}
          productId={productId}
          sort={sort}
        />
      })}
  </div>
);

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhoto: false,
    };
    this.showPhoto = this.showPhoto.bind(this);
    this.hidePhoto = this.hidePhoto.bind(this);
    this.clickHelpfulHandler = this.clickHelpfulHandler.bind(this);
  }

  showPhoto(idx) {
    this.setState({
      showPhoto: true,
      idx: idx
    });
  }

  hidePhoto() {
    this.setState({
      showPhoto: false
    });
  }

  clickHelpfulHandler(id) {
    const { getAllReviews, productId, sort } = this.props;

    if (!this.state[id]) {
      console.log('trigger')
      return axios
        .put(`http://3.21.164.220/reviews/${id}/helpful`, {
          params: { review_id: id }
        })
        .then(result => this.setState({
          [id]: true
        }))
        .then(result => getAllReviews(productId, sort))
        .catch(err => console.log(err));
    }
  }

  render() {
    const { review } = this.props;

    return (
      <div>
        {console.log(review)}
        {console.log(this.state)}
        {Stars(120, review.rating)}
        <span>Verified Purchaser </span>
        <span>{review.reviewer_name}, {formatDate(review.date)}</span>
        <div>
          <strong>{review.summary}</strong>
        </div>
        <div>
          <p>{review.body}</p>
          {review.photos.map((photo, idx) => {
            return (<div onClick={() => this.showPhoto(idx)} key={idx}>
              <img
                className="reviewListEntryThumbnail"
                src={photo.url}
              />
            </div>);
          })}
        </div>
        {review.recommend ? <p>&#10003; I recommend this product</p> : null}
        {review.response ? <div>
          <p>Response from seller: </p>
          <p>{review.response}</p>
        </div> : null}
        <div>
          <p>Was this review helpful?</p>
          <div
            className="reviewHelpfulLink"
            onClick={() => this.clickHelpfulHandler(review.review_id)}
          >Yes</div>
          <span>({review.helpfulness})</span>
        </div>
        {this.state.showPhoto ? <img
          className="reviewsPhoto"
          src={review.photos[this.state.idx].url}
          onClick={this.hidePhoto}
        /> : null}
        <hr />
      </div>
    );
  }
};

export default ReviewList;