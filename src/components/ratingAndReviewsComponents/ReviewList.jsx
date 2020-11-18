import React from 'react';
import Stars from '../Stars.jsx';
import formatDate from '../../../utils/formatDate.js';

const ReviewList = ({ reviews }) => (
  <div>
      {reviews.map((review, idx) => {
        return <ReviewListEntry review={review} key={idx}/>
      })}
  </div>
);

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhoto: false,
      idx: null
    };
    this.showPhoto = this.showPhoto.bind(this);
    this.hidePhoto = this.hidePhoto.bind(this);
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

  render() {
    const { review } = this.props;

    return (
      <div>
        {/* {console.log(review)} */}
        {Stars(120, review.rating)}
        <span>{formatDate(review.date)}</span>
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