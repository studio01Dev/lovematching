import './button.css'

export default function Button({ buttonText, backText, onClick, backClick }) {

    const upClick = () => {
        setTimeout(() => {
            onClick()
        }, 150);
    }

    const downClick = () => {
        setTimeout(() => {
            backClick()
        }, 150);
    }

    return (
        <div className="side-padding halign gap12 button-container">
            <button className='sub-button' onClick={downClick}>
                <div className='h5 sb'>{backText}</div>
            </button>
            <button className='main-button' onClick={upClick}>
                <div className="h5 sb">{buttonText}</div>
            </button>
        </div>
    );
}

export function MainButton({ buttonText, onClick }) {

    const handleClick = () => {
        setTimeout(() => {
            onClick()
        }, 150);
    }

    return (
        <div className="side-padding halign gap12 button-container">
            <button style={{ width: '100%' }} className='main-button' onClick={handleClick}>
                <div className="h5 sb">{buttonText}</div>
            </button>
        </div>
    );
}