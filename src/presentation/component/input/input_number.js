import React from 'react';
import '../input/input.css';

export default function InputNumber({ labelText, placeholder, value, dataToForm, maxDigit, defaultValue }) {
  const handleInputChange = (e) => {
    // Remove non-numeric characters and dashes
    let numericValue = e.target.value.replace(/[^0-9]/g, '');

    numericValue = numericValue.slice(0, maxDigit);

    // Update the input field with the cleaned numeric value
    e.target.value = numericValue;

    // Pass the numeric value to the parent component
    dataToForm(numericValue);
  };

  return (
    <div className="input-comp">
      <div className="h6 m grey500">{labelText}</div>
      <div className="input">
        <div className="input-container halign gap4 calign">
          <input
            type="text"
            placeholder={placeholder}
            onInput={handleInputChange} // Attach the input event handler
            value={value}
            onChange={e => dataToForm(e.target.value)}
            defaultValue={defaultValue}
          />
        </div>
      </div>
    </div>
  );
}

