import '../input/input.css';
import { useEffect, useState } from 'react';

export default function Select({ name, labelText, values, dataToForm, defaultValue, inputRef }) {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const otherInput = defaultValue

    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        dataToForm(newValue);
    };

    useEffect(() => {
        if (!values.includes(defaultValue) && values.includes('기타') && defaultValue != undefined) {
            setSelectedValue('기타')
        }
    }, [])

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
    console.log(otherInput)

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
                <InputText dataToForm={dataToForm} inputRef={inputRef} placeholder={`${labelText}를 직접 입력해주세요`} defaultValue={otherInput} />
            )}
        </div>
    );
}

export function InputText({ labelText, placeholder, dataToForm, inputRef, defaultValue }) {
    return (
        <div class="input-comp">
            <div className='h6 m grey500'>{labelText}</div>
            <div className='input'>
                <div className='input-container halign gap4 calign'>
                    <input ref={inputRef} type='text' defaultValue={defaultValue == '기타' ? '' : defaultValue} placeholder={placeholder} onChange={e => dataToForm(e.target.value)} />
                </div>
            </div>
        </div>
    );
}
