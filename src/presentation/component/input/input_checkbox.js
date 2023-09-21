import React, { useState, useEffect } from 'react';
import '../input/input.css';

export default function InputCheckbox({ name, labelText, values, dataToForm }) {
    const [selectedValues, setSelectedValues] = useState([]);
    const [isNotMatterChecked, setIsNotMatterChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (value === 'notMatter') {
            // Update the state of the "Not Matter" checkbox
            setIsNotMatterChecked(isChecked);

            // Clear the selected values when "Not Matter" is checked
            if (isChecked) {
                setSelectedValues(['상관 없음']);
            } else {
                setSelectedValues([]); // Clear other selected values
            }
        } else {
            // Update the selected values based on the checkbox state
            if (isChecked) {
                setSelectedValues([...selectedValues, value]);
            } else {
                setSelectedValues(selectedValues.filter((selectedValue) => selectedValue !== value));
            }
        }
    }

    useEffect(() => {
        dataToForm(isNotMatterChecked ? '상관 없음' : selectedValues);
    }, [selectedValues]);

    return (
        <div className='input-comp'>
            <div className='h6 m grey500'>{labelText}</div>
            <InputCheckboxNotMatter
                isNotMatterChecked={isNotMatterChecked}
                setIsNotMatterChecked={setIsNotMatterChecked}
                setSelectedValues={setSelectedValues} // Pass down setSelectedValues
                labelText={labelText}
            />
            {isNotMatterChecked ? null : (
                <div className='input'>
                    <div className='checkbox-container'>
                        {values.map((value, index) => (
                            <Checkbox
                                key={index}
                                name={name}
                                value={value}
                                id={value}
                                checked={selectedValues.includes(value)}
                                onChange={handleCheckboxChange}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export function Checkbox({ name, value, checked, onChange, id }) {
    return (
        <div className='input-container halign gap4 calign'>
            <input type='checkbox' name={name} value={value} id={id} checked={checked} onChange={onChange} />
            <label htmlFor={id} className='h5 r'>{value}</label>
        </div>
    );
}

export function InputCheckboxNotMatter({ isNotMatterChecked, setIsNotMatterChecked, setSelectedValues, labelText }) {
    const handleCheckboxChange = (event) => {
        setIsNotMatterChecked(event.target.checked);

        // Clear the selected values when "Not Matter" is checked
        if (event.target.checked) {
            setSelectedValues([]);
        }
    };

    return (
        <div>
            <label htmlFor={labelText}>
                <div className={`input ${isNotMatterChecked ? 'bg-dark' : 'bg-grey'}`}>
                    <div className='checkbox-container'>
                        <div className='input-container halign gap4 calign'>
                            <input
                                type='checkbox'
                                value='상관 없음'
                                id={labelText}
                                onChange={handleCheckboxChange}
                                checked={isNotMatterChecked}
                            />
                            <label htmlFor={labelText} className={`h5 r ${isNotMatterChecked ? 'label-dark' : ''}`}>상관 없음</label>
                        </div>
                    </div>
                </div>
            </label>
        </div>
    );
}
