import React from 'react';

class UploadPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { showAddPhoto, handleFileAdd, thumbnails, deleteThumbnail, handleUploadPhotoClose } = this.props;

    return (<div className='uploadPhotosSection'>
      <label>Upload your photos</label>
      {showAddPhoto ? <input
        type="file"
        name="file"
        onChange={(e) => handleFileAdd(e)}
      /> : null}
      {thumbnails.length ? <div>
        {thumbnails.map((thumbnail, idx) => {
          return (<img
            className="reviewPhotoThumbnails"
            src={thumbnail}
            key={idx}
            onClick={() => deleteThumbnail(idx)}
          />);
        })}
      </div> : null}
      <button
        onClick={handleUploadPhotoClose}
      >Upload</button>
    </div>);
  }
};

export default UploadPhotos;