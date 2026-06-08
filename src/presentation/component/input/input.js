import { useState } from "react";
import upload from '../../asset/images/upload.png';
import check from '../../asset/images/brand-check.svg'

export default function Input(props) {
    const [formattedValue, setFormattedValue] = useState(defaultValue || '');
    const [isNotMatterChecked, setIsNotMatterChecked] = useState(false);
    const [text, setText] = useState('아직 업로드되지 않음');
    const [area, setArea] = {
        district: '',
        subdistrict: ''
    }

    const handleInput = (e, etc) => {
        const value = e.target.value
        switch (props.type) {
            case 'tel':
                let numericValue = value.replace(/[^0-9]/g, '');
                if (numericValue.length > 11) {
                    numericValue = numericValue.slice(0, 11);
                }
                const newFormattedValue = numericValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
                setFormattedValue(newFormattedValue);
                dataToForm(numericValue);

            case 'number':
                if (value.length > maxDigit) {
                    numericValue = numericValue.slice(0, maxDigit);
                }
                dataToForm(numericValue);
                setFormattedValue(numericValue);

            case 'income':
                // get value and replace it to localestring
                const formattedValue = value.toLocaleString('ko-KR');
                setFormattedValue(formattedValue);

            case 'checkbox':
                return;

            case 'radio':
                setFormattedValue(value);
                dataToForm(isNotMatterChecked ? '상관없음' : newValue);

            case 'select':
                setSelectedValue(value);
                dataToForm(isNotMatterChecked ? '상관없음' : value);
                if (!props.values.includes(props.defaultValue) && props.values.includes('기타') && props.defaultValue !== undefined) {
                    setSelectedValue('기타')
                };

            case 'textarea':
                dataToForm(value);

            case 'upload':
                const file = e.target.files[0];
                setImage(file);
                dataToForm(file);
                if (image !== undefined) {
                    setText('이미지 업로드됨')
                    setUploaded(true)
                } else {
                    setText('이미지 업로드되지 않음')
                    setUploaded(false)
                };

            case 'area':
                switch (etc) {
                    case 'district':
                        setArea({ ...area, district: value })
                    case 'subdistrict':
                        setArea({ ...area, subdistrict: value })
                    default:
                        break;
                }
                if (area.district && area.subdistrict) dataToForm([area.district, area.subdistrict]);

            default:
                dataToForm(value);
        }
    }

    const emptyOption = (
        <option disabled key="empty" value="">
            선택해주세요
        </option>
    );

    switch (props.type) {
        case 'tel':
            return (
                <div className="input-comp">
                    <div className="h6 m grey500">{props.labelText}</div>
                    <div className="input">
                        <div className="input-container halign gap4 calign">
                            <input
                                type="tel"
                                pattern="[0-9]*"
                                placeholder={props.placeholder}
                                onInput={handleInput}
                                value={formattedValue}
                                ref={props.inputRef}
                            />
                        </div>
                    </div>
                </div>
            );

        case 'number':
            return (
                <div className="input-comp">
                    <div className="h6 m grey500">{props.labelText}</div>
                    <div className="input">
                        <div className="input-container halign gap4 calign">
                            <input
                                type="number"
                                pattern="[0-9]*"
                                placeholder={props.placeholder}
                                value={formattedValue}
                                onInput={handleInput}
                                onWheel={(e) => e.currentTarget.blur()}
                                defaultValue={props.defaultValue}
                                ref={props.inputRef}
                            />
                        </div>
                    </div>
                </div>
            );

        case 'income':
            return (
                <div className="input-comp">
                    <div className="h6 m grey500">{props.labelText}</div>
                    <div className="input">
                        <div className="input-container halign gap4 calign">
                            <input
                                type="text"
                                ref={props.inputRef}
                                pattern="[0-9]*"
                                placeholder={props.placeholder}
                                onInput={handleInput}
                                value={formattedValue}
                                defaultValue={props.defaultValue}
                            />
                        </div>
                    </div>
                </div>
            );

        case 'checkbox':
            return;

        case 'radio':
            return;

        case 'select':
            return;

        case 'textarea':
            return (
                <div class="input-comp">
                    <div className='h6 m grey500'>{props.labelText}</div>
                    <div className='input'>
                        <div className='textarea-container'>
                            <textarea ref={props.inputRef} placeholder={props.placeholder} onChange={handleInput} />
                        </div>
                    </div>
                </div>
            );

        case 'upload':
            return (
                <div className="input-comp">
                    <div className="h6 m grey500">{props.labelText}</div>
                    <label>
                        {
                            uploaded
                                ?
                                <div className='image-success'>
                                    <div className="input-container halign gap4 calign sbalign">
                                        <input
                                            type="file"
                                            ref={props.inputRef}
                                            id="img"
                                            style={{ display: 'none' }}
                                            onChange={handleInput}
                                            accept=".jpg, .jpeg, .png .svg"
                                        />
                                        <div htmlFor="img" className='h5 r brand500'>{text}</div>
                                        <img width={20} src={check} alt="Upload" />
                                    </div>
                                </div>
                                :
                                <div className="input">
                                    <div className="input-container halign gap4 calign sbalign">
                                        <input
                                            type="file"
                                            ref={props.inputRef}
                                            id="img"
                                            style={{ display: 'none' }}
                                            onChange={handleInput}
                                            accept=".jpg, .jpeg, .png .svg"
                                        />
                                        <div htmlFor="img" className='h5 r grey700'>{text}</div>
                                        <img width={20} src={upload} alt="Upload" />
                                    </div>
                                </div>
                        }
                    </label>
                </div>
            );

        case 'area':
            return (
                <div className='input-comp'>
                    <div className='area-container'>
                        <div className='h6 m grey500 valign gap4'>
                            {props.labelText1}
                            <div className='area-input'>
                                <div className='input-container halign gap4 calign'>
                                    <select ref={props.inputRef} value={area.district} onChange={() => handleInput(e, 'district')}>
                                        {emptyOption}
                                        {
                                            area.district.map(
                                                (district) => (
                                                    <option key={district} value={district}>
                                                        {district}
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='h6 m grey500 valign gap4'>
                            {props.labelText2}
                            <div className='area-input'>
                                <div className='input-container halign gap4 calign'>
                                    <select value={area.subdistrict} onChange={() => handleInput(e, 'subdistrict')}>
                                        {emptyOption}
                                        {
                                            area.subdistrict.map(
                                                (subdistrict) => (
                                                    <option key={subdistrict} value={subdistrict}>
                                                        {subdistrict}
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        default:
            return (
                <div class="input-comp">
                    <div className='h6 m grey500'>{props.labelText}</div>
                    <div className='input'>
                        <div className='input-container halign gap4 calign'>
                            <input ref={props.inputRef} defaultValue={props.defaultValue} type='text' placeholder={props.placeholder} onChange={handleInput} />
                        </div>
                    </div>
                </div>
            );
    }

    function NotMatter(props) {
        const handleCheckboxChange = (e) => {
            const isChecked = e.target.checked;
            setIsNotMatterChecked(isChecked);
            const newValue = isChecked ? '상관없음' : null;
            dataToForm(newValue);
        };

        return (
            <label htmlFor={props.labelText}>
                <div className={`input ${props.isNotMatterChecked ? 'bg-dark' : 'bg-grey'}`}>
                    <div className='checkbox-container'>
                        <div className='input-container halign gap4 calign'>
                            <input
                                type='checkbox'
                                value='notMatter'
                                id={labelText}
                                onChange={handleCheckboxChange}
                                checked={props.isNotMatterChecked}
                            />
                            <label htmlFor={labelText} className={`h5 r ${props.isNotMatterChecked ? 'label-dark' : ''}`}>상관없음</label>
                        </div>
                    </div>
                </div>
            </label>
        );
    }

}