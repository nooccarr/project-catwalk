import React from 'react';
import _ from 'underscore';
import deleteInnerHTML from '../../../utils/deleteInnerHTML.js';
import isMeasurement from '../../../utils/isMeasurement.js';
import getPercentage from '../../../utils/getPercentage.js';

const ProductBreakdown = ({ characteristics, scale }) => {
  return (
    <div className="characteristicsBreakdown">
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
  let textIndent = { textIndent: `${getPercentage(5, Number(scale))}%` };
  if (!scale) { deleteInnerHTML('upsideDownTriangle'); }

  return (<div>
    <div className="characteristicName">{characteristic}</div>
    <div className="characteristic-bar">
      <span
        id="upsideDownTriangle"
        style={textIndent}
      >&#x25BC;</span>
    </div>
    {isMeasurement(characteristic) ? <div className="feedbackBlock">
      <p className="characteristicFeedback">too small </p>
      <p className="characteristicFeedback">perfect </p>
      <p className="characteristicFeedback">large</p>
    </div> : <div className="feedbackBlock">
      <p className="characteristicFeedback">poor </p>
      <p className="characteristicFeedback">great</p>
    </div>}
  </div>);
};

export default ProductBreakdown;