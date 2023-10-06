import logo from '../../asset/images/logo.svg'
import hamburger from '../../asset/images/hamburger.png'
import '../header/header.css'

export default function header() {
    return (
        <div>
            <header>
                <div className='header'>
                    <div className='halign sb gap4'>
                        <img src={logo} style={{ width: '24px', height: '24px' }} />
                        <div className='h5 sb'>LoveMatching</div>
                    </div>
                </div>
            </header>
            <div style={{ height: 60 }}></div>
        </div>
    );
}