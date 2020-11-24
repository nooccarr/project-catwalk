const validExtensions = ['jpeg', 'jpg', 'png', 'tif', 'gif'];

const validPhotos = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    let parts = photos[i].split('.');
    let extension = parts[parts.length - 1].toLowerCase();
    if (validExtensions.indexOf(extension) === -1) {
      return false;
    }
  }
  return true;
};

export default validPhotos;