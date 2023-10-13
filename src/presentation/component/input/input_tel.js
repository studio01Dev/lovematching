import React, { useState } from 'react';
import '../input/input.css';

export default function InputTel({ labelText, placeholder, dataToForm, defaultValue, inputRef }) {
  const [formattedValue, setFormattedValue] = useState(defaultValue || '');

  const handleInputChange = (e) => {
    // Remove non-numeric characters and dashes
    let numericValue = e.target.value.replace(/[^0-9]/g, '');

    // Limit the input to 11 digits
    if (numericValue.length > 11) {
      numericValue = numericValue.slice(0, 11);
    }

    // Split the numeric value into groups of 4 digits separated by dashes
    const newFormattedValue = numericValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

    // Update the state with the formatted value
    setFormattedValue(newFormattedValue);

    // Pass the raw numeric value to the parent component
    dataToForm(numericValue);
  };

  return (
    <div className="input-comp">
      <div className="h6 m grey500">{labelText}</div>
      <div className="input">
        <div className="input-container halign gap4 calign">
          <input
            type="tel"
            pattern="[0-9]*"
            placeholder={placeholder}
            onInput={handleInputChange}
            value={formattedValue}
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
}
