import React from 'react';

const UploadPhotos = ({ showAddPhoto, handleFileAdd, thumbnails, deleteThumbnail, handleUploadPhotoClose }) => {

  return (<div className='newWindow'>
    <div className="newWindowTitle">
      <h1 className="newWindowLogo">donauwelle</h1>
    </div>
    <div className="newWindowContainer">
      <label className="newReviewWindowTitle">Upload your photos</label>
      {showAddPhoto ? <input
        className="newReviewAddPhotoInput"
        name="file"
        type="file"
        onChange={(e) => handleFileAdd(e)}
      /> : null}
      {thumbnails.length ? <div>
        <div className="uploadPhotosSpacer">
          {thumbnails.map((thumbnail, idx) => {
            return (<div className="reviewPhotoThumbnailsContainer">
              <img
                className="reviewPhotoThumbnails"
                src={thumbnail}
                key={idx}
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
      </div> : <div>
        <div className="uploadPhotosSpacer"></div>
        <hr />
        <div className="uploadClose">
          <button
            className="uploadCloseButton"
            onClick={handleUploadPhotoClose}
          >Close</button>
        </div>
      </div>}
    </div>
  </div>);
};

export default UploadPhotos;