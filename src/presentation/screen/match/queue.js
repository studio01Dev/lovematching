import arrow from '../../asset/images/back.png'
import { Link } from 'react-router-dom';
import plane from '../../asset/images/plane.svg'
import memo from '../../asset/images/memo.svg'
import people from '../../asset/images/people.svg'
import Button from '../../component/input/button';

export default function Queue({ name, suggestList, requestList }) {
    return (
        <div>
            <div className="arrow-back">
                <Link to='../'><img src={arrow} style={{ width: '8px', height: '16px' }} /></Link>
            </div>
            <div className='valign'>
                <div className='padding h3 b grey900'>{name}님의 러브매칭</div>


                <div class="padding valign gap20">
                    <Link to='../view-request' style={{ textDecoration: 'none' }}>
                        <div className='request-box valign gap8'>
                            <div className="halign sbalign calign">
                                <img src={plane} style={{ width: '40px' }} />
                                <div className='halign calign gap2'>
                                    <img src={people} style={{ width: '20px' }} />
                                    <div className='h6 sb brand500'>{suggestList}6</div>
                                </div>
                            </div>
                            <div className='h4 sb grey800'>내가 매칭 신청하기</div>
                            <div className='h5 r grey600'>담당 매니저가 엄선한 {suggestList}명 중,<br />마음에 드는 분에게 매칭을 신청하세요</div>
                        </div>
                    </Link>

                    <Link to='../review-request' style={{ textDecoration: 'none' }}>
                        <div className='request-box valign gap8'>
                            <div className="halign sbalign calign">
                                <img src={memo} style={{ width: '40px' }} />
                                <div className='halign calign gap2'>
                                    <img src={people} style={{ width: '20px' }} />
                                    <div className='h6 sb brand500'>{requestList}100</div>
                                </div>
                            </div>
                            <div className='h4 sb grey800'>내가 매칭 신청하기</div>
                            <div className='h5 r grey600'>{name}님께 호감을 표시한 {requestList}명 중,<br />마음에 드는 분을 수락해보세요.</div>
                        </div>
                    </Link>
                </div>
            </div>
            <Link to='../'><Button buttonText='홈으로 돌아가기' /></Link>
        </div>
    );
}