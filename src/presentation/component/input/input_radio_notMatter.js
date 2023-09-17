import '../input/input.css'
import React from 'react';
import { useState } from 'react';

export default function InputRadioNotMatter({name, value1, value2, labelText}) {
    return (
        <div className='input-comp'>
            <div className='h6 m grey500'>{labelText}</div>
            <InputCheckboxNotMatter />
            <div className='input'>
                <Radio name='test' value={value1} />
                <Radio name='test' value={value2} />
            </div>
        </div>
    );
}
export function Radio({ name, value }) {
    return (
        <div className='input-container halign gap4 calign'>
            <input type='radio' name={name} value={value} id={value} />
            <label for={value} className='h5 r'>{value}</label>
        </div>
    );
}

export function InputCheckboxNotMatter({ labelText, value }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div>
            <label for={value}>
                <div className={`input ${isChecked ? 'bg-dark' : 'bg-grey'}`}>
                    <div className='checkbox-container'>
                        <div className='input-container halign gap4 calign'>
                            <input
                                type='checkbox'
                                value={value}
                                id={value}
                                onChange={handleCheckboxChange}
                                checked={isChecked}
                            />
                            <label htmlFor={value} className={`h5 r ${isChecked ? 'label-dark' : ''}`}>상관 없음</label>
                        </div>
                    </div>
                </div>
            </label>
        </div>
    );
}