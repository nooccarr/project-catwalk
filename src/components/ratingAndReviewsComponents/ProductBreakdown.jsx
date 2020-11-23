import React from 'react';
import _ from 'underscore';
import isMeasurement from '../../../utils/isMeasurement.js';
import getPercentage from '../../../utils/getPercentage.js';

const ProductBreakdown = ({ characteristics }) => {
  return (
    <div>
      {_.map(characteristics, (scale, characteristic) => {
        return (<Characteristic
          characteristic={characteristic}
          scale={scale.value}
          key={scale.id}
        />);
      })}
    </div>
  );
};

const Characteristic = ({ characteristic, scale }) => {
  return (<div>
    <div>{characteristic}</div>
    <div>{getPercentage(5, Number(scale))}</div>
    {isMeasurement(characteristic) ? <div>
      <span>too small </span>
      <span>perfect </span>
      <span>large</span>
    </div> : <div>
      <span>poor </span>
      <span>great</span>
    </div>}
  </div>);
};

export default ProductBreakdown;