import './input.css'

export default function Button({ buttonText }) {
    return (
        <div className="padding">
            <button className='main-button'>
                <div class="h5 sb">{buttonText}</div>
            </button>
        </div>
    );
}