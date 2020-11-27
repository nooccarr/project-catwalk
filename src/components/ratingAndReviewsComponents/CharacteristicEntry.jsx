import React from 'react';
import getLabel from '../../../utils/getLabel.js';

const CharacteristicEntry = ({ state, name, handleSelect }) => {
  return (
    <div>
      <h3 className="characteristicEntryName">{name}</h3>
      {state ? <h3
        className="characteristicEntryFeedback"
      >
        {getLabel(name, state)}
      </h3> : <h3
        className="characteristicEntryFeedback">
          None selected
      </h3>}
      {[1, 2, 3, 4, 5].map((value, idx) => {
        return (<div
          className="newReviewInputColumn"
          key={idx}
        >
          <input
            className="newReviewInputRadio"
            type="radio"
            name={name}
            value={value}
            onClick={(e) => handleSelect(e)}
          />
          <label className="newReviewInputLabel">{value}</label>
        </div>);
      })}
    </div>
  );
};

export default CharacteristicEntry;