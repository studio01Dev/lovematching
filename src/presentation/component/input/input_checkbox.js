import React, { useState, useEffect } from 'react';
import '../input/input.css';

export default function InputCheckbox({ name, labelText, values, dataToForm, defaultValue, displayNotMatter, inputRef, maxValues }) {
    const [selectedValues, setSelectedValues] = useState(defaultValue || []);
    const [isNotMatterChecked, setIsNotMatterChecked] = useState(
        defaultValue !== undefined && defaultValue.includes('상관없음')
    );

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (value === 'notMatter') {
            setIsNotMatterChecked(isChecked);
            setSelectedValues(isChecked ? ['상관없음'] : []);
        } else {
            if (isChecked) {
                if (maxValues != undefined) {
                    if (selectedValues.length < maxValues) {
                        setSelectedValues([...selectedValues, value]);
                    } else {
                        event.preventDefault();
                    }
                } else {
                    setSelectedValues([...selectedValues, value]);
                }
            } else {
                setSelectedValues(selectedValues.filter((selectedValue) => selectedValue !== value));
            }
            setIsNotMatterChecked(false);
        }
    };


    useEffect(() => {
        dataToForm(isNotMatterChecked ? ['상관없음'] : selectedValues);
    }, [selectedValues, isNotMatterChecked]);

    return (
        <div className='input-comp'>
            <div className='h6 m grey500'>{labelText}</div>
            {
                displayNotMatter ?
                    <InputCheckboxNotMatter
                        isNotMatterChecked={isNotMatterChecked}
                        setIsNotMatterChecked={setIsNotMatterChecked}
                        setSelectedValues={setSelectedValues}
                        labelText={labelText}
                    /> : null
            }
            {
                isNotMatterChecked ? null : (
                    <div className='input'>
                        <div className='checkbox-container'>
                            {values.map((value, index) => (
                                <Checkbox
                                    key={index}
                                    name={name}
                                    value={value}
                                    inputRef={inputRef}
                                    id={value}
                                    checked={selectedValues.includes(value)}
                                    onChange={handleCheckboxChange}
                                />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}


export function Checkbox({ name, value, checked, onChange, id, inputRef }) {
    return (
        <div className='input-container halign gap4 calign'>
            <input ref={inputRef} type='checkbox' name={name} value={value} id={id} checked={checked} onChange={onChange} />
            <label htmlFor={id} className='h5 r'>{value}</label>
        </div>
    );
}

export function InputCheckboxNotMatter({ isNotMatterChecked, setIsNotMatterChecked, setSelectedValues, labelText }) {
    const handleCheckboxChange = (event) => {
        setIsNotMatterChecked(event.target.checked);
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
                                value='상관없음'
                                id={labelText}
                                onChange={handleCheckboxChange}
                                checked={isNotMatterChecked}
                            />
                            <label htmlFor={labelText} className={`h5 r ${isNotMatterChecked ? 'label-dark' : ''}`}>상관없음</label>
                        </div>
                    </div>
                </div>
            </label>
        </div>
    );
}
