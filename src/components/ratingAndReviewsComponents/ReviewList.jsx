import React from 'react';
import { Rating } from '@material-ui/lab';
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
        {console.log(review)}
        {console.log(this.state)}
        <Rating
          name="rating"
          value={review.rating}
          readOnly={true}
        />
        <span>{formatDate(review.date)}</span>
        <div>
          <strong>{review.summary}</strong>
        </div>
        <div>
          <p>{review.body}</p>
            {review.photos.map((photo, idx) => {
              return (<div onClick={() => this.showPhoto(idx)}>
                <img
                  className="reviewListEntryThumbnail"
                  src={photo.url}
                />
              </div>);
            })}
        </div>
        {this.state.showPhoto ? <ReviewsPhoto
          url={review.photos[this.state.idx].url}
          hidePhoto={this.hidePhoto}
        /> : null}
        <hr />
      </div>
    );
  }
};

const ReviewsPhoto = ({ url, hidePhoto }) => (
  <img
    className="reviewsPhoto"
    src={url}
    onClick={hidePhoto}
  />
);

export default ReviewList;