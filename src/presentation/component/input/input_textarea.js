import '../input/input.css'

export default function InputTextArea({ labelText, placeholder, dataToForm, inputRef }) {
    return (
        <div class="input-comp">
            <div className='h6 m grey500'>{labelText}</div>
            <div className='input'>
                <div className='textarea-container'>
                    <textarea ref={inputRef} placeholder={placeholder} onChange={e => dataToForm(e.target.value)}/>
                </div>
            </div>
        </div>
    );
}