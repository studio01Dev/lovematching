import '../input/input.css';
import React, { useState } from 'react';
import { NotMatter } from './not-matter';

export default function InputRadio({ name, value1, value2, labelText, dataToForm, id1, id2, displayNotMatter, defaultValue, inputRef, allowDeselect = false }) {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const [isNotMatterChecked, setIsNotMatterChecked] = useState(false);

    const handleRadioChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        dataToForm(isNotMatterChecked ? '상관없음' : newValue);
    };

    const handleRadioClick = (value) => {
        if (allowDeselect && selectedValue === value) {
            setSelectedValue(undefined);
            dataToForm(undefined);
        }
    };

    return (
        <div className='input-comp'>
            <div className='h6 m grey500'>{labelText}</div>
            <NotMatter
                isNotMatterChecked={isNotMatterChecked}
                setIsNotMatterChecked={setIsNotMatterChecked}
                dataToForm={dataToForm}
                displayNotMatter={displayNotMatter}
                labelText={labelText}
            />
            <div className='input' style={{ display: `${isNotMatterChecked ? 'none' : ''}` }}>
                <Radio inputRef={inputRef} name={name} value={value1} id={id1} checked={selectedValue === value1} onChange={handleRadioChange} onSelect={handleRadioClick} />
                <Radio inputRef={inputRef} name={name} value={value2} id={id2} checked={selectedValue === value2} onChange={handleRadioChange} onSelect={handleRadioClick} />
            </div>
        </div>
    );
}

export function Radio({ name, value, id, checked, onChange, onSelect, inputRef }) {
    return (
        <div className='input-container halign gap4 calign'>
            <input type='radio' ref={inputRef} name={name} value={value} id={id} checked={checked} onChange={onChange} onClick={() => onSelect?.(value)} />
            <label htmlFor={id} className='h5 r'>{value}</label>
        </div>
    );
}