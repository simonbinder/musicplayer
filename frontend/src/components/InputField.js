import React from 'react';

const InputField = props => {

  const {
    type,
    placeHolder,
    value,
    handleChange
  } = props;

  return <input
    type={ type }
    className="form-control o-input"
    placeholder={ placeHolder }
    value={ value }
    onChange={ handleChange }
  />;
};

export default InputField;
