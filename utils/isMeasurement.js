const measurements = ['Size', 'Length', 'Width', 'Fit'];

const isMeasurement = (characteristic) => {
  if (measurements.indexOf(characteristic) !== -1) {
    return true;
  }
  return false;
}

export default isMeasurement;