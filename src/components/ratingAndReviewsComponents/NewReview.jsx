import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import Stars from '../Stars.jsx';
import CharacteristicEntry from './CharacteristicEntry.jsx';
import InputEntry from './InputEntry.jsx';
import UploadPhotos from './UploadPhotos.jsx';
import getLabel from '../../../utils/getLabel.js';
import counter from '../../../utils/counter.js';
import validateSubmit from '../../../utils/validateSubmit.js';
import isNewFile from '../../../utils/isNewFile.js';
import toBoolean from '../../../utils/toBoolean.js';
import toCharacteristics from '../../../utils/toCharacteristics.js';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      summary: '',
      body: '',
      photos: [],
      files: [],
      thumbnails: [],
      nickname: '',
      email: '',
      showUploadPhotos: false,
      showAddPhoto: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.addNewReview = this.addNewReview.bind(this);
    this.photosToCloudinary = this.photosToCloudinary.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUploadPhotosButton = this.handleUploadPhotosButton.bind(this);
    this.deleteThumbnail = this.deleteThumbnail.bind(this);
    this.handleUploadPhotoClose = this.handleUploadPhotoClose.bind(this);
    this.handleFileAdd = this.handleFileAdd.bind(this);
    this.hideAddPhoto = this.hideAddPhoto.bind(this);
  }

  handleSelect(e) {
    if (typeof e === 'number') {
      this.setState({
        rating: e
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  submitReview() {
    let photos = _.map(this.state.files, item => { return item.name });
    let message = 'You must enter the following:';
    let messageSubmitted = validateSubmit(
      this.state.rating,
      this.state.recommend,
      this.state.size,
      this.state.width,
      this.state.comfort,
      this.state.quality,
      this.state.length,
      this.state.fit,
      this.state.summary,
      this.state.body,
      this.state.nickname,
      this.state.email,
      photos
    );

    if (message === messageSubmitted) {
      this.photosToCloudinary();
    } else {
      alert(messageSubmitted);
    }
  }

  addNewReview() {
    return axios
      .post('http://3.21.164.220/reviews/', {
        product_id: this.props.productId,
        rating: this.state.rating,
        summary: this.state.summary,
        body: this.state.body,
        recommend: toBoolean(this.state.recommend),
        name: this.state.nickname,
        email: this.state.email,
        photos: this.state.photos,
        characteristics: toCharacteristics(
          this.props.characteristics,
          this.state.size,
          this.state.width,
          this.state.comfort,
          this.state.quality,
          this.state.length,
          this.state.fit
        )
      })
      .then(result1 => this.props.getAllReviews(this.props.sort))
      .then(result2 => this.handleClose())
      .catch(err => console.log(err));
  }

  photosToCloudinary() {
    let photos = this.state.photos.slice();
    let requests = [];
    for (let i = 0; i < this.state.files.length; i++) {
      let formData = new FormData();
      formData.append('file', this.state.files[i]);
      formData.append('upload_preset', 'unsigned');
      let request = axios
        .post('https://api.cloudinary.com/v1_1/donauwelle/image/upload', formData);
      requests.push(request);
    }
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          responses.map(response => photos.push(response.data.url));
        })
      )
      .then(result =>{
        this.setState({
          photos: photos
        })
      })
      .then(result2 => this.addNewReview())
      .catch(err => console.log(err));
  }

  handleClose() {
    this.setState({
      rating: null,
      summary: '',
      body: '',
      photos: [],
      files: [],
      thumbnails: [],
      nickname: '',
      email: '',
      showUploadPhotos: false
    });
    this.props.hideReview();
  }

  handleUploadPhotosButton() {
    this.setState({
      showUploadPhotos: true
    });
  }

  handleUploadPhotoClose() {
    this.setState({
      showUploadPhotos: false
    });
  }

  handleFileAdd(e) {
    let newFile = e.target.files[0];
    let files = this.state.files.slice();
    let newFileSelected = isNewFile(files, newFile);
    let newThumbnail = URL.createObjectURL(newFile);
    let thumbnails = this.state.thumbnails.slice();
    if (newFileSelected) {
      files.push(newFile);
      thumbnails.push(newThumbnail);
      this.setState({
        files: files,
        thumbnails: thumbnails
      });
      if (files.length === 5) {
        this.hideAddPhoto();
      }
    }
  }

  deleteThumbnail(idx) {
    let files = this.state.files;
    let thumbnails = this.state.thumbnails;
    files.splice(idx, 1);
    thumbnails.splice(idx, 1);
    this.setState({
      files: files,
      thumbnails: thumbnails,
      showAddPhoto: true
    })
  }

  hideAddPhoto() {
    this.setState({
      showAddPhoto: false
    });
  }

  render() {
    const characteristics = [
      'size', 'width', 'comfort', 'quality', 'length', 'fit'
    ];
    const { show, product } = this.props;

    if (!show) {
      return null;
    }
    return (
      <div className="newWindow">
        <div className="newWindowTitle">
          <h1 className="newWindowLogo">donauwelle</h1>
        </div>
        <div className="newWindowContainer">
          {/* {console.log(this.state)} */}
          <h1 className="newReviewWindowTitle">write your review</h1>
          <h3 className="newReviewAboutProduct">About the {product}</h3>
          <h3 className="newReviewInput">*Overall rating</h3>
          <div className="newReviewOverallRating">
            <div className="newReviewOverallRatingStarRating">
              {Stars(80, this.state.rating || 0, (e) => this.handleSelect(e))}
            </div>
            {this.state.rating ? <div
              className="newReviewOverallRatingFeedback"
            >
              {getLabel('rating', this.state.rating)}
            </div>: null}
          </div>
          <h3 className="newReviewInput">*Do you recommend this product?</h3>
          {['yes', 'no'].map((value, idx) => {
            return (<div
              className="newReviewInputColumn"
              key={idx}
            >
              <input
                className="newReviewInputRadio"
                type="radio"
                name="recommend"
                value={value}
                onClick={(e) => this.handleSelect(e)}
              />
              <label className="newReviewInputLabel">
                {value}
              </label>
            </div>);
          })}
          <h3 className="newReviewInput">*Characteristics</h3>
          {characteristics.map((name, idx) => {
            return (<CharacteristicEntry
              state={this.state[name]}
              name={name}
              handleSelect={this.handleSelect}
              key={idx}
            />);
          })}
          <InputEntry
            subtitle={'*Review summary'}
            name={'summary'}
            value={this.state.summary}
            maxLength={'60'}
            placeholder={'Example: Best purchase ever!'}
            handleSelect={this.handleSelect}
          />
          <InputEntry
            subtitle={'*Review body'}
            name={'body'}
            value={this.state.body}
            maxLength={'1000'}
            placeholder={'Why did you like the product or not?'}
            handleSelect={this.handleSelect}
            text={counter(this.state.body)}
          />
          <button
            className="newReviewUploadPhotosWindow"
            onClick={this.handleUploadPhotosButton}
          >Upload your photos</button>
          {this.state.showUploadPhotos ?
            <UploadPhotos
              showAddPhoto={this.state.showAddPhoto}
              handleFileAdd={this.handleFileAdd}
              thumbnails={this.state.thumbnails}
              deleteThumbnail={this.deleteThumbnail}
              handleUploadPhotoClose={this.handleUploadPhotoClose}
          /> : null}
          <InputEntry
            subtitle={'*What is your nickname'}
            name={'nickname'}
            value={this.state.nickname}
            maxLength={'60'}
            placeholder={'Example: jackson11!'}
            handleSelect={this.handleSelect}
            text={'For privacy reasons, do not use your full name or email address'}
          />
          <InputEntry
            subtitle={'*Your email'}
            name={'email'}
            value={this.state.email}
            maxLength={'60'}
            placeholder={'Example: jackson11@email.com'}
            handleSelect={this.handleSelect}
            text={'For authentication reasons, you will not be emailed'}
          />
          <hr className="newReviewFormDivider" />
          <div className="submitReviewClose">
            <button
              className="submitReviewButton"
              onClick={this.submitReview}
            >submit review</button>
            <button
            className="closeButton"
            onClick={this.handleClose}
            >close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewReview;