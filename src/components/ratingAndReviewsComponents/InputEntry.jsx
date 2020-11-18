import React from 'react';

const InputEntry = ({ subtitle, name, value, minLength, maxLength, placeholder, handleSelect, text }) => {
  return (
    <div>
      <h3>{subtitle}</h3>
      <input
        name={name}
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => handleSelect(e)}
      />
      {text ? <h4>{text}</h4> : null}
    </div>
  );
};

export default InputEntry;