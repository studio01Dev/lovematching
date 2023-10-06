import React, { useState } from 'react';
import '../input/input.css';

export default function InputNumber({ labelText, placeholder, maxDigit, dataToForm, defaultValue }) {
  const [number, setNumber] = useState()
  const handleInputChange = (e) => {
    let numericValue = e.target.value
    if (numericValue.length > maxDigit) {
      numericValue = numericValue.slice(0, maxDigit);
    }
    setNumber(numericValue)
  };

  return (
    <div className="input-comp">
      <div className="h6 m grey500">{labelText}</div>
      <div className="input">
        <div className="input-container halign gap4 calign">
          <input
            type="number"
            pattern="[0-9]*"
            placeholder={placeholder}
            onInput={handleInputChange}
            value={number}
            onChange={e => dataToForm(number)}
            defaultValue={defaultValue}
          />
        </div>
      </div>
    </div>
  );
}

