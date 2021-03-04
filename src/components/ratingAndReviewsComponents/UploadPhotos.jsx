import React from 'react';

const UploadPhotos = ({ showAddPhoto, handleFileAdd, thumbnails, deleteThumbnail, handleUploadPhotoClose }) => {

  return (<div className='newWindow'>
    <div className="newWindowTitle">
      <img className="newWindowLogo" src="/images/donauwelle.png"/>
    </div>
    <div className="newWindowContainer">
      <label className="newReviewWindowTitle">Upload your photos</label>
      {showAddPhoto ? <input
        className="newReviewAddPhotoInput"
        name="file"
        type="file"
        onChange={(e) => handleFileAdd(e)}
      /> : null}
      {thumbnails.length ? <React.Fragment>
        <div className="uploadPhotosSpacer">
          {thumbnails.map((thumbnail, idx) => {
            return (<div
              className="reviewPhotoThumbnailsContainer"
              key={idx}
            >
              <img
                className="reviewPhotoThumbnails"
                src={thumbnail}
                onClick={() => deleteThumbnail(idx)}
              />
            </div>);
          })}
        </div>
        <hr />
        <div className="uploadClose">
          <button
            className="uploadCloseButton"
            onClick={handleUploadPhotoClose}
          >Upload</button>
        </div>
      </React.Fragment> : <React.Fragment>
        <div className="uploadPhotosSpacer"></div>
        <hr />
        <div className="uploadClose">
          <button
            className="uploadCloseButton"
            onClick={handleUploadPhotoClose}
          >Close</button>
        </div>
      </React.Fragment>}
    </div>
  </div>);
};

export default UploadPhotos;