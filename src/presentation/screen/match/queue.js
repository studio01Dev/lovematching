import arrow from '../../asset/images/back.png'
import { Link } from 'react-router-dom';
import plane from '../../asset/images/plane.svg'
import memo from '../../asset/images/memo.svg'
import people from '../../asset/images/people.svg'
import Button from '../../component/input/button';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ReadUserUseCase from '../../../domain/use_cases/readUser_useCase';
import AdminSuggestListUseCase from '../../../domain/use_cases/adminSuggestList_usecase';
import AcceptMatchUseCase from '../../../domain/use_cases/acceptMatch_usecase';


export default function Queue() {
    const { uid } = useParams();
    const [user, setUser] = useState(Object);
    const [adminSuggestListLength, setAdminSuggestListLength] = useState(Number);
    const [inCounterChosenFromAdminSuggestListLength, setInCounterChosenFromAdminSuggestListLength] = useState(Number);
    useEffect ( ()=> {
        async function fetchOneUser() {
            try {
                const readUserUseCase = new ReadUserUseCase();
                var response =  await readUserUseCase.readUser(uid)
                // console.log(response)
                if(response.success === true) {
                    setUser(response.data)
                } else {
                    alert(response.message)
                }
            } catch(error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        async function fetchAdminSuggestListLength() {
            try {
                const adminSuggestList = new AdminSuggestListUseCase();
                var response =  await adminSuggestList.readAdminSuggestList(uid)
                // console.log(response)
                if(response.success === true) {
                    setAdminSuggestListLength(response.data.length)
                } else {
                    alert(response.message)
                }
            } catch(error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        async function fetchInCounterChosenFromAdminSuggestListLength() {
            try {
                const acceptMatchUseCase = new AcceptMatchUseCase();
                var response =  await acceptMatchUseCase.readInCounterChosenFromAdminSuggestList(uid)
                // console.log(response)
                if(response.success === true) {
                    setInCounterChosenFromAdminSuggestListLength(response.data.length)
                } else {
                    alert(response.message)
                }
            } catch(error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        fetchOneUser();
        fetchAdminSuggestListLength();
        fetchInCounterChosenFromAdminSuggestListLength();
    }, [])
    return (
        <div>
            {/* <div className="arrow-back">
                <Link to='../'><img src={arrow} style={{ width: '8px', height: '16px' }} /></Link>
            </div> */}
            <div className='valign'>
                <div className='padding h3 b grey900'> {user.name}님의 러브매칭</div>


                <div class="padding valign gap20">
                    <Link to={`../view-request/${uid}`} style={{ textDecoration: 'none' }}>
                        <div className='request-box valign gap8'>
                            <div className="halign sbalign calign">
                                <img src={plane} style={{ width: '40px' }} />
                                <div className='halign calign gap2'>
                                    <img src={people} style={{ width: '20px' }} />
                                    <div className='h6 sb brand500'>{adminSuggestListLength}</div>
                                </div>
                            </div>
                            <div className='h4 sb grey800'>내가 매칭 신청하기</div>
                            <div className='h5 r grey600'>담당 매니저가 엄선한 {adminSuggestListLength}명 중,<br />마음에 드는 분에게 매칭을 신청하세요</div>
                        </div>
                    </Link>

                    <Link to={`../review-request/${uid}`} style={{ textDecoration: 'none' }}>
                        <div className='request-box valign gap8'>
                            <div className="halign sbalign calign">
                                <img src={memo} style={{ width: '40px' }} />
                                <div className='halign calign gap2'>
                                    <img src={people} style={{ width: '20px' }} />
                                    <div className='h6 sb brand500'>{inCounterChosenFromAdminSuggestListLength}</div>
                                </div>
                            </div>
                            <div className='h4 sb grey800'>나에게 온 매칭 확인하기</div>
                            <div className='h5 r grey600'>님께 호감을 표시한 {inCounterChosenFromAdminSuggestListLength}명 중,<br />마음에 드는 분을 수락해보세요.</div>
                        </div>
                    </Link>
                </div>
            </div>
            <Link to='../'><Button buttonText='홈으로 돌아가기' /></Link>
        </div>
    );
}