import Select from "../../component/input/select";
import Button from "../../component/input/button";
import InputText from "../../component/input/input_text";
import { useRef, useEffect, useState } from "react";
import { charm } from "../../../domain/models/questionnaires";
import '../../component/input/input.css'

export default function Form3({ firstEmptyField, userData, onClick, backClick, mbti, strength, interest, dateType }) {

    const inputRef = {
        mbti: useRef(),
        strength: useRef(),
        interest: useRef(),
        dateType: useRef(),
    };

    useEffect(() => {
        if (inputRef[firstEmptyField] && inputRef[firstEmptyField].current) {
            inputRef[firstEmptyField].current.focus();
        }
    }, [firstEmptyField]);

    return (
        <div>
            <div className="h3 b padding">성격을 작성해주세요</div>
            <div class="valign gap32 margin">
                <Select displayNotMatter={'none'} labelText='MBTI' values={['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ']} dataToForm={data => mbti(data)} defaultValue={userData.mbti} />
                <InputCheckbox labelText='나는 어떤 사람인가요? (최대 3개 선택 가능)' values={charm} dataToForm={data => strength(data)} maxValues={3} defaultValue={userData.strength} />
                <InputText labelText='취미/관심사' placeholder='취미나 관심사를 입력해주세요' dataToForm={data => interest(data)} defaultValue={userData.interest} />
                <InputText labelText='선호하는 데이트' placeholder='선호하는 데이트를 입력해주세요' dataToForm={data => dateType(data)} defaultValue={userData.dateType} />
            </div>
            <div style={{ height: '80px' }} />
            <Button buttonText='다음으로' subButtonText={'뒤로가기'} onClick={onClick} backClick={backClick} />
        </div>
    );
}


export function InputCheckbox({ name, labelText, values, dataToForm, defaultValue, displayNotMatter, inputRef, maxValues }) {
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
                        <div className='valign gap8'>
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
            <label htmlFor={id} className='h6 r'>{value}</label>
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
