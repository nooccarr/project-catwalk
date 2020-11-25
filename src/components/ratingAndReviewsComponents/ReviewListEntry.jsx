import React from 'react';
import Stars from '../Stars.jsx';
import formatDate from '../../../utils/formatDate.js';
import validBody from '../../../utils/validBody.js';
import axios from 'axios';

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
    this.clickReportHandler = this.clickReportHandler.bind(this);
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

  clickHelpfulHandler(review_id) {
    if (!this.state[review_id]) {
      return axios
        .put(`http://3.21.164.220/reviews/${review_id}/helpful`, {
          params: { review_id: review_id }
        })
        .then(result => this.setState({
          [review_id]: true
        }))
        .then(result2 => this.props.getAllReviews(this.props.sort))
        .catch(err => console.log(err));
    }
  }

  clickReportHandler(review_id) {
    return axios
      .put(`http://3.21.164.220/reviews/${review_id}/report`, {
        params: { review_id: review_id }
      })
      .then(result => this.props.getAllReviews(this.props.sort))
      .catch(err => console.log(err));
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
        {Stars(70, review.rating)}
        {/* <span>Verified Purchaser </span> */}
        <span>{review.reviewer_name}, {formatDate(review.date)}</span>
        <div>
          <strong className="individualReviewSummary">{review.summary}</strong>
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
        <div
          className="reviewReportLink"
          onClick={() => this.clickReportHandler(review.review_id)}
        >Report</div>
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

export default ReviewListEntry;