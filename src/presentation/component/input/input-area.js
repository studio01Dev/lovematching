import React, { useEffect, useState } from 'react';
import '../input/input.css';
import { district, subdistrict } from '../../../domain/models/area';

export default function InputArea({ labelText1, labelText2, dataToForm, defaultValue }) {
    const [districtSelect, setDistrictSelect] = useState([])
    const [subdistrictSelect, setSubdistrictSelect] = useState([])

    // 도, 시군구 모두 보여주고
    // 도를 입력하면 그에 해당하는 시군구 입력하고
    // 도 / 시군구 정보는 useState에 담아두고
    // useEffect 써서 시군구 선택하면 업로드

    const districtChange = (e) => {
        setDistrictSelect(e.target.value)
    }

    const subDistrictChange = (e) => {
        setSubdistrictSelect(e.target.value)
    }

    useEffect(() => {
        dataToForm([districtSelect, subdistrictSelect])
        console.log([districtSelect, subdistrictSelect]);
    }, [subdistrictSelect]);


    const emptyOption = (
        <option disabled key="empty" value="">
            선택해주세요
        </option>
    );

    return (
        <div className='input-comp'>
            <div className='area-container'>
                <div className='h6 m grey500 valign gap4'>
                    {labelText1}
                    <div className='area-input'>
                        <div className='input-container halign gap4 calign'>
                            <select value={districtSelect} onChange={e => districtChange(e)}>
                                {emptyOption}
                                {district.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='h6 m grey500 valign gap4'>
                    {labelText2}
                    <div className='area-input'>
                        <div className='input-container halign gap4 calign'>
                            <select value={subdistrictSelect} onChange={e => subDistrictChange(e)}>
                                {emptyOption}
                                {Array.isArray(subdistrict[districtSelect]) ? subdistrict[districtSelect].map((subdistrict) => (
                                    <option key={subdistrict} value={subdistrict}>
                                        {subdistrict}
                                    </option>
                                )) : '' }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
