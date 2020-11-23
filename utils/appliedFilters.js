const appliedFilters = (filters) => {
  let result = [];
  for (let i = 0; i <= 5; i++) {
    if (filters[i]) {
      result.push(i);
    }
  }

  if (result.length === 1) {
    return 'Applied filter: ' + result[0];
  } else if (result.length) {
    return 'Applied filters: ' + result.join(', ');
  }
};

export default appliedFilters;