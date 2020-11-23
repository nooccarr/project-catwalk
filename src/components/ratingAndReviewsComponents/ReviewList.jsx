import React from 'react';
import Stars from '../Stars.jsx';
import formatDate from '../../../utils/formatDate.js';
import validBody from '../../../utils/validBody.js';
import axios from 'axios';

const ReviewList = ({ reviews, getAllReviews, sort }) => (
  <div>
    {/* {console.log(reviews)} */}
    {reviews.map((review, idx) => {
      return <ReviewListEntry
        review={review}
        getAllReviews={getAllReviews}
        sort={sort}
        key={idx}
      />
    })}
  </div>
);

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: true,
      showPhoto: false,
    };
    this.showPhoto = this.showPhoto.bind(this);
    this.hidePhoto = this.hidePhoto.bind(this);
    this.clickHelpfulHandler = this.clickHelpfulHandler.bind(this);
    this.setLargeBody = this.setLargeBody.bind(this);
    this.handleShowMore = this.handleShowMore.bind(this);
  }

  componentDidMount() {
    this.setLargeBody();
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
    const { getAllReviews } = this.props;

    if (!this.state[id]) {
      return axios
        .put(`http://3.21.164.220/reviews/${id}/helpful`, {
          params: { review_id: id }
        })
        .then(result => this.setState({
          [id]: true
        }))
        .then(result2 => getAllReviews(this.props.sort))
        .catch(err => console.log(err));
    }
  }

  setLargeBody() {
    let largeBody = this.props.review.body.slice(0, 250);
    this.setState({
      largeBody: largeBody
    });
  }

  handleShowMore() {
    this.setState({
      largeBody: this.props.review.body,
      showButton: false
    });
  }

  render() {
    const { review } = this.props;
    const largeBody = validBody(review.body, 251);

    return (
      <div>
        {/* {console.log(review)} */}
        {/* {console.log(this.state)} */}
        {Stars(120, review.rating)}
        <span>Verified Purchaser </span>
        <span>{review.reviewer_name}, {formatDate(review.date)}</span>
        <div>
          <strong>{review.summary}</strong>
        </div>
        <div>
          {largeBody ? <div>
            <p>{this.state.largeBody}</p>
            {this.state.showButton ? <div
              className="showMoreBody"
              onClick={this.handleShowMore}
            >Show more</div> : null}
          </div> : <div><p>{review.body}</p></div>}
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