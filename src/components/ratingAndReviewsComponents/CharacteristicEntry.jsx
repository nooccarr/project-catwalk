import React from 'react';
import capitalize from '../../../utils/capitalize.js';
import getLabel from '../../../utils/getLabel.js';

const CharacteristicEntry = ({ state, property, handleSelect }) => {
  return (
    <div>
      <h3>{capitalize(property)}</h3>
      {state ? <h3>
        {getLabel(property, state)}
      </h3> : <h3>none selected</h3>}
      {[1, 2, 3, 4, 5].map((value, idx) => {
        return (<span key={idx}>
          <input
            type="radio"
            name={property}
            value={value}
            onClick={(e) => handleSelect(e)}
          />
          <label>{value}</label>
        </span>);
      })}
    </div>
  );
};

export default CharacteristicEntry;