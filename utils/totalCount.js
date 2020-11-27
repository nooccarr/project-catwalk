const totalCount = (obj) => {
  if (obj[0] && obj[1]) {
    return obj[0] + obj[1];
  } else if (!obj[0] && obj[1]) {
    return obj[1];
  } else if (obj[0] && !obj[1]) {
    return obj[0];
  } else {
    return 0;
  }
};

export default totalCount;