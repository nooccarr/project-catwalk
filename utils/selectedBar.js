const selectedBar = (filters) => {
  for (let i  = 1; i <= 5; i++) {
    if (filters[i]) {
      return true;
    }
  }
  return false;
};

export default selectedBar;