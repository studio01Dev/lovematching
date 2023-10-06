import '../input/input.css'
import '../../asset/App.css'
import { useState, useEffect } from 'react';

export default function ProgressBar({ progressStatus }) {
    const [progressStatus1, setProgressStatus1] = useState('yes');
    const [progressStatus2, setProgressStatus2] = useState('no');
    const [progressStatus3, setProgressStatus3] = useState('no');
    const [progressStatus4, setProgressStatus4] = useState('no');
    const [progressStatus5, setProgressStatus5] = useState('no');

    useEffect(() => {
        // console.log(progressStatus)
        if (progressStatus == 1) {
            setProgressStatus1('yes')
            setProgressStatus2('no')
            setProgressStatus3('no')
            setProgressStatus4('no')
            setProgressStatus5('no')
        }
        else if (progressStatus == 2) {
            setProgressStatus1('yes')
            setProgressStatus2('yes')
            setProgressStatus3('no')
            setProgressStatus4('no')
            setProgressStatus5('no')
        }
        else if (progressStatus == 3) {
            setProgressStatus1('yes')
            setProgressStatus2('yes')
            setProgressStatus3('yes')
            setProgressStatus4('no')
            setProgressStatus5('no')
        }
        else if (progressStatus == 4) {
            setProgressStatus1('yes')
            setProgressStatus2('yes')
            setProgressStatus3('yes')
            setProgressStatus4('yes')
            setProgressStatus5('no')
        }
        else if (progressStatus == 5) {
            setProgressStatus1('yes')
            setProgressStatus2('yes')
            setProgressStatus3('yes')
            setProgressStatus4('yes')
            setProgressStatus5('yes')
        }
    }, [progressStatus])


    return (
        <div className='progress-container'>
            <div className="progress-item-before valign gap4 calign">
                <div className={`h7 sb ${progressStatus1}-progress`}>기본 정보</div>
                <div className={`${progressStatus1}-progress-bar`}></div>
            </div>
            <div className="progress-item-before valign gap4 calign">
                <div className={`h7 sb ${progressStatus2}-progress`}>라이프스타일</div>
                <div className={`${progressStatus2}-progress-bar`}></div>
            </div>
            <div className="progress-item-before valign gap4 calign">
                <div className={`h7 sb ${progressStatus3}-progress`}>성격</div>
                <div className={`${progressStatus3}-progress-bar`}></div>
            </div>
            <div className="progress-item-before valign gap4 calign">
                <div className={`h7 sb ${progressStatus4}-progress`}>사진</div>
                <div className={`${progressStatus4}-progress-bar`}></div>
            </div>
            <div className="progress-item-before valign gap4 calign">
                <div className={`h7 sb ${progressStatus5}-progress`}>원하는 이성</div>
                <div className={`${progressStatus5}-progress-bar`}></div>
            </div>
        </div>
    );
}