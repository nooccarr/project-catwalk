import React from 'react';
import getLabel from '../../../utils/getLabel.js';

const CharacteristicEntry = ({ state, name, handleSelect }) => {
  return (
    <div>
      <h3 className="characteristicEntryName">{name}</h3>
      {state ? <h3>
        {getLabel(name, state)}
      </h3> : <h3>none selected</h3>}
      {[1, 2, 3, 4, 5].map((value, idx) => {
        return (<span key={idx}>
          <input
            type="radio"
            name={name}
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