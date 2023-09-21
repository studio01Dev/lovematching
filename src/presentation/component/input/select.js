import '../input/input.css';
import { useState } from 'react';

export default function Select({ name, labelText, values, dataToForm }) {
    const [selectedValue, setSelectedValue] = useState(""); // Initialize with an empty default value

    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);

        // Call the callback function to pass the selected value to the parent
        dataToForm(newValue);
    };

    const options = [
        <option disabled key="empty" value="">
            선택해주세요
        </option>,
        ...values.map((value, index) => (
            <option key={index} name={name} value={value}>
                {value}
            </option>
        ))
    ];

    return (
        <div className="input-comp">
            <div className='h6 m grey500'>{labelText}</div>
            <div className='input'>
                <div className='input-container halign gap4 calign'>
                    <select value={selectedValue} onChange={handleSelectChange}>
                        {options}
                    </select>
                </div>
            </div>
        </div>
    );
}
