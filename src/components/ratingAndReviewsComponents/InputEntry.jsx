import React from 'react';

const InputEntry = ({ subtitle, name, value, minLength, maxLength, placeholder, handleSelect, text }) => {
  return (
    <React.Fragment>
      <h3 className="newReviewInput">{subtitle}</h3>
      <input
        className="newReviewInputBox"
        name={name}
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => handleSelect(e)}
      />
      {text ? <h4 className="newReviewInputInfo">&#x2139; {text}</h4> : null}
    </React.Fragment>
  );
};

export default InputEntry;