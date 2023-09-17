import React from 'react';
import '../input/input.css';

export default function InputNumber({ labelText, placeholder }) {
  const handleInputChange = (e) => {
    // Remove non-numeric characters and dashes
    let numericValue = e.target.value.replace(/[^0-9]/g, '');
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
