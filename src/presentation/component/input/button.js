import './input.css'

export default function Button({ buttonText, backText, onClick, backClick }) {
    return (
        <div className="side-padding halign gap12 button-container">
            <button className='sub-button' onClick={backClick}>
                <div className='h5 sb'>{backText}</div>
            </button>
            <button className='main-button' onClick={onClick}>
                <div className="h5 sb">{buttonText}</div>
            </button>
        </div>
    );
}

export  function MainButton({ buttonText, onClick }) {
    return (
        <div className="side-padding halign gap12 button-container">
            <button style={{ width: '100%' }} className='main-button' onClick={onClick}>
                <div className="h5 sb">{buttonText}</div>
            </button>
        </div>
    );
}