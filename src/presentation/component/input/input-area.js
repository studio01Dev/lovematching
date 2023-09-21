import React, { useState } from 'react';
import '../input/input.css';
import { district, subdistrict } from '../../../domain/models/area';

export default function InputArea({ labelText1, labelText2, dataToForm }) {
    const districts = district;
    const subdistricts = subdistrict;

    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedSubdistrict, setSelectedSubdistrict] = useState('');

    const handleDistrictChange = (event) => {
        const districtValue = event.target.value;
        setSelectedDistrict(districtValue);
        setSelectedSubdistrict(''); // Reset the selected subdistrict when the district changes
    };

    const handleSubdistrictChange = (event) => {
        const subdistrictValue = event.target.value;
        setSelectedSubdistrict(subdistrictValue); // Update selectedSubdistrict first

        // Create an object with the updated values and pass it to the parent
        const selectedArea = {
            selectedDistrict,
            selectedSubdistrict: subdistrictValue, // Use the updated value
        };

        dataToForm(selectedArea);
    };

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
                            <select value={selectedDistrict} onChange={handleDistrictChange}>
                                {emptyOption}
                                {districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {selectedDistrict && (
                    <div className='h6 m grey500 valign gap4'>
                        {labelText2}
                        <div className='area-input'>
                            <div className='input-container halign gap4 calign'>
                                <select value={selectedSubdistrict} onChange={handleSubdistrictChange}>
                                    {emptyOption}
                                    {subdistricts[selectedDistrict].map((subdistrict) => (
                                        <option key={subdistrict} value={subdistrict}>
                                            {subdistrict}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
