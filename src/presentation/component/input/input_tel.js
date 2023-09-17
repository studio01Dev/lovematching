import React from 'react';
import '../input/input.css';

export default function InputTel({ labelText, placeholder }) {
  const handleInputChange = (e) => {
    // Remove non-numeric characters and dashes
    let numericValue = e.target.value.replace(/[^0-9]/g, '');

    // Limit the input to 11 digits
    if (numericValue.length > 11) {
      numericValue = numericValue.slice(0, 11);
    }

    // Split the numeric value into groups of 4 digits separated by dashes
    const formattedValue = numericValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

    // Update the input field value with the formatted value
    e.target.value = formattedValue;
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
          />
        </div>
      </div>
    </div>
  );
}
