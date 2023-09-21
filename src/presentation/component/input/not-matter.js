export function NotMatter({ isNotMatterChecked, setIsNotMatterChecked, dataToForm, displayNotMatter, labelText }) {
    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setIsNotMatterChecked(isChecked);

        // If "상관 없음" is checked, set the selected value to it, otherwise, keep the previously selected value
        const newValue = isChecked ? '상관 없음' : null;

        // Call the callback function to pass the selected value to the parent
        dataToForm(newValue);
    };

    return (
        <div style={{ display: `${displayNotMatter}` }}>
            <label htmlFor={labelText}>
                <div className={`input ${isNotMatterChecked ? 'bg-dark' : 'bg-grey'}`}>
                    <div className='checkbox-container'>
                        <div className='input-container halign gap4 calign'>
                            <input
                                type='checkbox'
                                value='notMatter'
                                id={labelText}
                                onChange={handleCheckboxChange}
                                checked={isNotMatterChecked}
                            />
                            <label htmlFor={labelText} className={`h5 r ${isNotMatterChecked ? 'label-dark' : ''}`}>상관 없음</label>
                        </div>
                    </div>
                </div>
            </label>
        </div>
    );
}
