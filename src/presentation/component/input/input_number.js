import React, { useState } from 'react';
import '../input/input.css';

export default function InputNumber({ labelText, placeholder, maxDigit, dataToForm, defaultValue, inputRef }) {
  const [number, setNumber] = useState(defaultValue ?? '');
  const handleInputChange = (e) => {
    let numericValue = e.target.value;
    if (numericValue.length > maxDigit) {
      numericValue = numericValue.slice(0, maxDigit);
    }
    dataToForm(numericValue); // Pass the input value directly to the parent component
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
            value={number}
            onInput={handleInputChange}
            onWheel={(e) => e.currentTarget.blur()}
            defaultValue={defaultValue}
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
}
