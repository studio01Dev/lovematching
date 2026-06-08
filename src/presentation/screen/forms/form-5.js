/* eslint-disable no-unused-expressions */
import Button from "../../component/button/button";
import InputCheckbox from "../../component/input/input_checkbox";
import InputRadio from "../../component/input/input_radio";
import Select from '../../component/input/input_select'
import LoadingDialog from '../../component/loading_dialog/loading_dialog'
import { React, useState, useRef, useEffect } from "react";
import { charm } from "../../../domain/models/questionnaires";
import { district } from "../../../domain/models/area";


export default function Form5({ isLoading, firstEmptyField, userData, onClick, backClick, counterpartAcademic, counterpartAge, counterpartBodyType, counterpartDrinkingFrequency, counterpartHaveCar, counterpartHaveHouse, counterpartHeight, counterpartHowWork, counterpartIncome, counterpartJob, counterpartReligion, counterpartSmoking, counterpartStrength, counterpartStyle, counterpartTattoo, counterpartResidence}) {

    const inputRef = {
        counterpartAge: useRef(),
        counterpartAcademic: useRef(),
        counterpartJob: useRef(),
        counterpartIncome: useRef(),
        counterpartHowWork: useRef(),
        counterpartHeight: useRef(),
        counterpartBodyType: useRef(),
        counterpartStyle: useRef(),
        counterpartStrength: useRef(),
        counterpartHaveCar: useRef(),
        counterpartHaveHouse: useRef(),
        counterpartDrinkingFrequency: useRef(),
        counterpartSmoking: useRef(),
        counterpartTattoo: useRef(),
        counterpartReligion: useRef(),
        counterpartResidence: useRef()
    };

    useEffect(() => {
        if (inputRef[firstEmptyField] && inputRef[firstEmptyField].current) {
            inputRef[firstEmptyField].current.focus();
        }
    }, [firstEmptyField]);

    return (
        <div>
            {isLoading && <LoadingDialog />}
            {!isLoading && (
                <div>
                    <div className="h3 b padding">원하는 이성을 알려주세요</div>
                    <div class="valign gap12 margin40">
                        <div className="h4 b grey700 side-padding">기본 정보</div>
                        <div class="valign gap32">
                            <InputCheckbox displayNotMatter={'block'} inputRef={inputRef.counterpartAge} labelText='나이' values={['20~25', '26~30', '31~35', '36~40']} dataToForm={data => counterpartAge(data)} defaultValue={userData.counterpartAge} />
                            <InputCheckbox displayNotMatter={'block'} inputRef={inputRef.counterpartAcademic} labelText='학력' values={['고졸 이하', '전문대', '4년제대학', '해외 대학', '석사', '박사']} dataToForm={data => counterpartAcademic(data)} defaultValue={userData.counterpartAcademic} />
                            <InputCheckbox displayNotMatter={'block'} inputRef={inputRef.counterpartJob} labelText='직종' values={['전문직', '보건/의료직(전문직 외)', '대기업', '중견기업', '중소기업/스타트업', '공무원', '자영업', '공기업', '연구소', '프리랜서', '외국계']} dataToForm={data => counterpartJob(data)} defaultValue={userData.counterpartJob} />
                            <InputCheckbox displayNotMatter={'block'} inputRef={inputRef.counterpartIncome} labelText='연소득 (단위: 만 원)' values={['1,001~2,000', '2,001~3,000', '3,001~4,000', '4,001~5,000', '5,001~6,000', '6,001~7,000', '7,001~8,000', '8,001 이상']} dataToForm={data => counterpartIncome(data)} defaultValue={userData.counterpartIncome} />
                            <InputCheckbox displayNotMatter={'block'} inputRef={inputRef.counterpartHowWork} labelText='근무 형태' values={['주 5일', '교대근무']} dataToForm={data => counterpartHowWork(data)} defaultValue={userData.counterpartHowWork} />
                            <InputCheckbox displayNotMatter={'block'} inputRef={inputRef.counterpartHeight} labelText='키' values={['145~150', '151~155', '156~160', '161~165', '166~170', '171~175', '176~180', '181~185', '186~190']} dataToForm={data => counterpartHeight(data)} defaultValue={userData.counterpartHeight} />
                            <InputCheckbox displayNotMatter={'block'} inputRef={inputRef.counterpartBodyType} labelText='체형' values={['마름', '날씬', '보통', '통통', '근육질']} dataToForm={data => counterpartBodyType(data)} defaultValue={userData.counterpartBodyType} />
                            <InputCheckbox displayNotMatter={'block'} inputRef={inputRef.counterpartStyle} labelText='스타일' values={['귀여움', '지적임', '듬직함', '평범함', '건강미', '청순함', '세련됨', '선한 인상']} dataToForm={data => counterpartStyle(data)} defaultValue={userData.counterpartStyle} />
                            <Select displayNotMatter={'block'} inputRef={inputRef.counterpartResidence} labelText='거주지' values={district} dataToForm={data => counterpartResidence(data)} defaultValue={userData.counterpartResidence} />
                        </div>
                    </div>
                    <div class="valign gap12">
                        <div className="h4 b grey700 side-padding">라이프스타일</div>
                        <div class="valign gap32 margin">
                            <InputRadio inputRef={inputRef.counterpartHaveCar} name='counterpartHaveCar' id1='counterpartCarYes' id2='counterpartCarNo' labelText='자차 보유 여부' value1='있음' value2='없음' dataToForm={data => counterpartHaveCar(data)} defaultValue={userData.counterpartHaveCar} />
                            <InputRadio inputRef={inputRef.counterpartHaveHouse} name='counterpartHaveHouse' id1='counterpartHouseYes' id2='counterpartHouseNo' labelText='자가 보유 여부' value1='있음' value2='없음' dataToForm={data => counterpartHaveHouse(data)} defaultValue={userData.counterpartHaveHouse} />
                            <InputCheckbox displayNotMatter={'block'} inputRef={inputRef.counterpartDrinkingFrequency} labelText='음주 횟수' values={['주 4회 이상', '주 2~3회', '월 2~4회', '월 1회 이하', '마시지 않음']} dataToForm={data => counterpartDrinkingFrequency(data)} defaultValue={userData.counterpartDrinkingFrequency} />
                            <InputRadio inputRef={inputRef.counterpartSmoking} name='counterpartSmoking' id1='counterpartSmokingYes' id2='counterpartSmokingNo' labelText='흡연 여부' value1='흡연' value2='비흡연' dataToForm={data => counterpartSmoking(data)} defaultValue={userData.counterpartSmoking} />
                            <InputRadio inputRef={inputRef.counterpartTattoo} name='counterpartTattoo' id1='counterpartTattooYes' id2='counterpartTattooNo' labelText='문신 여부' value1='있음' value2='없음' dataToForm={data => counterpartTattoo(data)} defaultValue={userData.counterpartTattoo} />
                            <InputCheckbox inputRef={inputRef.counterpartReligion} displayNotMatter={'block'} labelText='종교' values={['무교', '기독교', '천주교', '불교', '기타']} dataToForm={data => counterpartReligion(data)} defaultValue={userData.counterpartReligion} />
                            <InputCheckbox2 inputRef={inputRef.counterpartStrength} displayNotMatter={'block'} labelText='어떤 사람을 원하시나요? (최대 3개 선택 가능)' values={charm} dataToForm={data => counterpartStrength(data)} maxValues={3} defaultValue={userData.counterpartStrength} />
                        </div>
                    </div>
                    <div style={{ height: '80px' }} />
                    <Button buttonText='신청 완료하기' backText={'뒤로가기'} onClick={onClick} backClick={backClick} />
                </div>
            )}

        </div>
    );
}

export function InputCheckbox2({ name, labelText, values, dataToForm, defaultValue, displayNotMatter, inputRef, maxValues }) {
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
