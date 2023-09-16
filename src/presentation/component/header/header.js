import logo from '../../asset/images/logo.svg'
import hamburger from '../../asset/images/hamburger.png'
import '../header/header.css'

export default function header() {
    return(
        <header>
            <div className='halign sb gap4'>
                <img src={logo} style={{ width: '24px', height: '24px' }} />
                <div className='h5 sb'>LoveMatching</div>
            </div>
            <img src={hamburger} style={{ width: '24px', height: '24px' }} />
        </header>
    );
}