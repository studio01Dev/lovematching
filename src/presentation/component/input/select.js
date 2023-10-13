import '../input/input.css';
import { useState } from 'react';

export default function Select({ name, labelText, values, dataToForm, defaultValue, inputRef }) {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);

        // Call the callback function to pass the selected value to the parent
        dataToForm(newValue);
    };

    const options = [
        <option key="empty" value="">
            선택해주세요
        </option>,
        ...values.map((value, index) => (
            <option key={index} name={name} value={value}>
                {value}
            </option>
        ))
    ];

    return (
        <div>
            <div className="input-comp">
                <div className='h6 m grey500'>{labelText}</div>
                <div className='input'>
                    <div className='input-container halign gap4 calign'>
                        <select ref={inputRef} value={selectedValue} onChange={handleSelectChange}>
                            {options}
                        </select>
                    </div>
                </div>
            </div>
            {selectedValue === '기타' && (
                <InputText dataToForm={dataToForm} inputRef={inputRef} placeholder={`${labelText}를 직접 입력해주세요`} />
            )}
        </div>
    );
}

export function InputText({ labelText, placeholder, dataToForm, inputRef }) {
    return (
        <div class="input-comp">
            <div className='h6 m grey500'>{labelText}</div>
            <div className='input'>
                <div className='input-container halign gap4 calign'>
                    <input ref={inputRef} type='text' placeholder={placeholder} onChange={e => dataToForm(e.target.value)} />
                </div>
            </div>
        </div>
    );
}
