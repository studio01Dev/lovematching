import React, { useEffect, useState } from 'react';
import '../input/input.css';

export default function InputIncome({ labelText, placeholder, dataToForm, defaultValue, inputRef }) {
    const [rawNumber, setRawNumber] = useState(defaultValue);
    const [formattedNumber, setFormattedNumber] = useState('');

    const handleInputChange = (e) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        setFormattedNumber(inputValue);
        setRawNumber(inputValue !== '' ? parseInt(inputValue) : undefined);
    };

    useEffect(() => {
        if (typeof rawNumber === 'number') {
            const formattedValue = rawNumber.toLocaleString('ko-KR');
            setFormattedNumber(formattedValue);
        } else {
            setFormattedNumber('');
        }
    }, [rawNumber]);

    // Call dataToForm when rawNumber changes
    useEffect(() => {
        dataToForm(rawNumber);
    }, [rawNumber]);

    return (
        <div className="input-comp">
            <div className="h6 m grey500">{labelText}</div>
            <div className="input">
                <div className="input-container halign gap4 calign">
                    <input
                        type="text"
                        ref={inputRef}
                        pattern="[0-9]*"
                        placeholder={placeholder}
                        onInput={handleInputChange}
                        value={formattedNumber}
                        defaultValue={formattedNumber}
                    />
                </div>
            </div>
        </div>
    );
}
