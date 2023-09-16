import '../input/input.css'

export default function InputCheckbox({ labelText }) {
    return (
        <div className='input-comp'>
            <div className='h6 m grey500'>{labelText}</div>
            <div className='input'>
                <div className='checkbox-container'>
                    <Checkbox name='test' value='test1' />
                    <Checkbox name='test' value='test2' />
                    <Checkbox name='test' value='test3' />
                    <Checkbox name='test' value='test4' />
                </div>
            </div>
        </div>
    );
}

export function Checkbox({ name, value }) {
    return (
        <div className='input-container halign gap4 calign'>
            <input type='checkbox' name={name} value={value} id={value} />
            <label for={value} className='h5 r'>{value}</label>
        </div>
    );
}