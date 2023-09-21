import '../input/input.css'

export default function InputText({ labelText, placeholder, dataToForm }) {
    return (
        <div class="input-comp">
            <div className='h6 m grey500'>{labelText}</div>
            <div className='input'>
                <div className='input-container halign gap4 calign'>
                    <input type='text' placeholder={placeholder} onChange={e => dataToForm(e.target.value)}/>
                </div>
            </div>
        </div>
    );
}