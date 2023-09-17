import people from '../../asset/images/people.svg'
import arrow from '../../asset/images/back.png'
import { Link } from 'react-router-dom';
import ListItem from '../../component/input/list-item';
import sampleImage from '../../asset/images/sampleImage.png'
import InfoCard from '../../component/input/info-card';
import Button from '../../component/input/button';
import NotificationSuccess from '../../component/input/notification_success';
import { useState, useEffect } from 'react';


export default function ApproveRequest({ name }) {
    // Notification을 위한 hook
    const [alertVisible, setAlertVisible] = useState(false); // alertVisible == true일 때, notification이 생성됩니다.
    const showNotification = () => {
        setAlertVisible(true); // Show the alert when button is clicked
    };



    return (
        <div>

            <div className="arrow-back">
                <Link style={{ textDecoration: 'none' }} to='../review-request'><img src={arrow} style={{ width: '8px', height: '16px' }} /></Link>
            </div>


            {/* 님의 프로필 부분 */}
            <div class="valign gap8">
                <div className='padding h3 b grey900'>{name}님의 프로필</div>




                <NotificationSuccess message='매칭 신청을 수락했어요' visible={alertVisible} setVisible={setAlertVisible} />



                {/* carousel 부분 */}
                <div class="slider-wrapper padding">
                    <div className='slider halign gap20'>
                        <img src={sampleImage} />
                        <img src={sampleImage} />
                    </div>
                </div>


                <div className='padding valign gap20'>
                    <div className='h4 b grey800'>기본 정보</div>
                    <div className='profile'>
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                    </div>
                </div>


                <div className='padding valign gap20'>
                    <div className='h4 b grey800'>라이프스타일</div>
                    <div className='profile'>
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                    </div>
                </div>


                <div className='padding valign gap20'>
                    <div className='h4 b grey800'>성격</div>
                    <div className='profile'>
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                        <InfoCard dataName='연락처' value='010-0000-0000' />
                    </div>
                </div>


            </div>
            <Button buttonText='매칭 신청 수락하기' onClick={showNotification} />
        </div>
    );
}