import React from 'react';

const UploadPhotos = ({ showAddPhoto, handleFileAdd, thumbnails, deleteThumbnail, handleUploadPhotoClose }) => {

  return (<div className='uploadPhotosSection'>
    <label>Upload your photos</label>
    {showAddPhoto ? <input
      name="file"
      type="file"
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
      <button
        onClick={handleUploadPhotoClose}
      >Upload</button>
    </div> : <div>
      <button
        onClick={handleUploadPhotoClose}
      >Close</button>
    </div>}
  </div>);
};

export default UploadPhotos;