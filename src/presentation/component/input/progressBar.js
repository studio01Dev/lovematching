import '../input/input.css'
import '../../asset/App.css'

export default function ProgressBar({ }) {
    return (
        <div className='progress-container'>
            <div className="progress-item-before valign gap4 calign">
                <div className='h7 sb no-progress'>기본 정보</div>
                <div className='progress-bar'></div>
            </div>
            <div className="progress-item-before valign gap4 calign">
                <div className='h7 sb no-progress'>라이프스타일</div>
                <div className='progress-bar'></div>
            </div>
            <div className="progress-item-before valign gap4 calign">
                <div className='h7 sb no-progress'>성격</div>
                <div className='progress-bar'></div>
            </div>
            <div className="progress-item-before valign gap4 calign">
                <div className='h7 sb no-progress'>사진</div>
                <div className='progress-bar'></div>
            </div>
            <div className="progress-item-before valign gap4 calign">
                <div className='h7 sb no-progress'>원하는 상대방</div>
                <div className='progress-bar'></div>
            </div>
        </div>
    );
}