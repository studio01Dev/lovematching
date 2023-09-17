import './input.css'

export default function Button({ buttonText, onClick }) {
    return (
        <div className="padding">
            <button className='main-button' onClick={onClick}>
                <div class="h5 sb">{buttonText}</div>
            </button>
        </div>
    );
}