const toCharacteristics = (characteristics, size, width, comfort, quality, length, fit) => {

  let obj = {
    'Size': size,
    'Width': width,
    'Comfort': comfort,
    'Quality': quality,
    'Length': length,
    'Fit': fit
  };

  let result = {};
  for (let characteristic in characteristics) {
    result[characteristics[characteristic].id.toString()] = Number(obj[characteristic]);
  }

  return result;
};

export default toCharacteristics;