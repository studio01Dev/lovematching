import React, { useState } from 'react';
import '../input/input.css';

export default function InputCheckboxNotMatter({ labelText, value }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className='input-comp'>
      <div className='h6 m grey500'>{labelText}</div>
      <div className={`input ${isChecked ? 'bg-dark' : 'bg-grey'}` }>
        <div className='checkbox-container'>
          <div className='input-container halign gap4 calign'>
            <input
              type='checkbox'
              value={value}
              id={value}
              onChange={handleCheckboxChange}
              checked={isChecked}
            />
            <label htmlFor={value} className={`h5 r ${isChecked ? 'label-dark' : '' }`}>
              {value}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
