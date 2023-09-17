import React from 'react';
import '../input/input.css';

export default function InputRange({ labelText, placeholder1, placeholder2 }) {
    const handleInputChange = (e) => {
        // Remove non-numeric characters and dashes
        let numericValue = e.target.value.replace(/[^0-9]/g, '');
    };

    return (
        <div className="input-comp">
            <div className="h6 m grey500">{labelText}</div>
            <div class="valign gap4">
                <div className="input">
                    <div className="input-container halign gap4 calign">
                        <input
                            type="text"
                            placeholder={placeholder1}
                            onInput={handleInputChange} // Attach the input event handler
                        />
                    </div>
                </div>
                <div className='h5 r grey700' style={{ textAlign: 'center' }}>~</div>
                <div className="input">
                    <div className="input-container halign gap4 calign">
                        <input
                            type="text"
                            placeholder={placeholder2}
                            onInput={handleInputChange} // Attach the input event handler
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
