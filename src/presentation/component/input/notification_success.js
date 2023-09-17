import check from '../../asset/images/check.png'
import { useState, useEffect } from 'react';

export default function NotificationSuccess({ message, visible, setVisible }) {

    const [notificationHeight, setNotificationHeight] = useState(-100); // 시작 시 위치
    const time = 2000; // notification이 내려왔을 때 대기하는 시간인데, 변경해도 됩니다

    const drop = () => {
        const screenHeight = window.innerHeight; // viewport 크기
        const dropPosition = 116;
        setNotificationHeight(dropPosition);
        setTimeout(() => setNotificationHeight(-100), time);
        setTimeout(() => setVisible(false), time + 500)
    };

    useEffect(() => {
        if (visible) {
            drop();
        }
    }, [visible]);

    return (
        <div className="notification halign gap10 calign" style={{
            bottom: `${notificationHeight}px`,
            transition: 'bottom 0.5s ease-in-out',

        }}>
            <img src={check} style={{ width: '20px', height: '20px' }} />
            <div className='h5 sb greywhite'>{message}</div>
        </div>
    );
}