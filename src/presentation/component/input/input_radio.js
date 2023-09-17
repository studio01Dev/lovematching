import '../input/input.css'

export default function InputRadio({name, value1, value2, labelText}) {
    return (
        <div className='input-comp'>
            <div className='h6 m grey500'>{labelText}</div>
            <div className='input'>
                <Radio name='test' value={value1} />
                <Radio name='test' value={value2} />
            </div>
        </div>
    );
}
export function Radio({ name, value }) {
    return (
        <div className='input-container halign gap4 calign'>
            <input type='radio' name={name} value={value} id={value} />
            <label for={value} className='h5 r'>{value}</label>
        </div>
    );
}