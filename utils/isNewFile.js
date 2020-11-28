const isNewFile = (files, newFile) => {
  for (let i = 0; i < files.length; i++) {
    if (files[i].name === newFile.name) {
      return false;
    }
  }
  return true;
};

export default isNewFile;