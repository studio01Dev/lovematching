import { Link, useParams, useNavigate } from 'react-router-dom';
import InfoCard from '../../component/input/info-card';
import Button from '../../component/input/button';
import NotificationSuccess from '../../component/input/notification_success';
import { useState, useEffect } from 'react';
import ReadUserUseCase from '../../../domain/use_cases/readUser_useCase';
import AdminSuggestListUseCase from '../../../domain/use_cases/adminSuggestList_usecase';
import LoadingDialog from '../../component/loading_dialog/loading_dialog';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../../../firebase/index'


export default function MakeRequest({ }) {
    const { uid, counterId } = useParams();
    const navigate = useNavigate()
    const [counterUser, setCounterUser] = useState(Object);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchOneUser() {
            try {
                const readUserUseCase = new ReadUserUseCase();
                var response = await readUserUseCase.readUser(counterId)
                // console.log(response)
                if (response.success === true) {
                    setCounterUser(response.data)
                    setIsLoading(false)
                } else {
                    alert(response.message)
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        fetchOneUser();
    }, [])

    const [newDeclined, setNewDeclined] = useState([])
    const rejectMatch = async () => {
        try {
            setIsLoading(true)
            const user = []
            const ref = doc(db.db, 'users', uid);
            const docSnap = await getDoc(ref);
            user.unshift({
                ...docSnap.data(),
                id: docSnap.id,
            })

            // declinedUsers 필드가 없으면 새로 만들어서 업데이트
            if (user[0].declinedUsers === undefined) {
                await updateDoc(ref, {
                    declinedUsers: [counterId]
                })
                alert('매칭이 거절되었어요!')
                // 이미 declinedUsers에 있는 상대방이면 알려주기
            } else if (user[0].declinedUsers.includes(counterId)) {
                alert('이미 거절했던 유저에요.')
                // declinedUsers에 없는 유저면 추가하기
            } else {
                await updateDoc(ref, {
                    declinedUsers: [user[0].declinedUsers, counterId]
                })
                alert('매칭이 거절되었어요!')
            }
            await deleteDoc(doc(db.db, "users", uid, "AdminSuggestList", counterId));

            setIsLoading(false)
            navigate(`/view-request/${uid}`, { replace: true })
        } catch (error) {
            alert('일시적으로 오류가 생겼습니다. 다시 시도해주세요.')
        }
    }


    // Notification을 위한 hook
    const [alertVisible, setAlertVisible] = useState(false); // alertVisible == true일 때, notification이 생성됩니다.
    const showNotification = () => {
        setAlertVisible(true); // Show the alert when button is clicked
    };

    const suggestMatch = async () => {
        try {
            setIsLoading(true)
            const adminSuggestListUseCase = new AdminSuggestListUseCase();
            var response = await adminSuggestListUseCase.suggestMatch(uid, counterId)
            // console.log(response)
            if (response.success === true) {
                setIsLoading(false)
                showNotification()
                navigate(`/view-request/${uid}`, { replace: true })
            } else {
                alert(response.message)
            }
        } catch (error) {
            alert('일시적으로 오류가 생겼습니다. 다시 시도해주세요.')
        }
    }



    return (
        <div>
            {/* 데이터 로딩 중이면 로딩 다이얼로그를 표시 */}
            {isLoading && <LoadingDialog />}

            {/* 실제 데이터 렌더링 */}
            {!isLoading && (
                <div>
                    {/* <div className="arrow-back">
                        <Link style={{ textDecoration: 'none' }} to='../make-request'><img src={arrow} style={{ width: '8px', height: '16px' }} /></Link>
                    </div> */}
                    {/* 님의 프로필 부분 */}
                    <div class="valign gap8">
                        <div className='padding h3 b grey900'>{counterUser.name.charAt(0)}**님의 프로필</div>
                        <NotificationSuccess message='매칭을 신청했어요' visible={alertVisible} setVisible={setAlertVisible} />



                        {/* carousel 부분 */}
                        <div class="slider-wrapper padding">
                            <div className='slider halign gap20'>
                                <img src={counterUser.faceImageUrl} />
                                <img src={counterUser.bodyImageUrl} />
                            </div>
                        </div>


                        <div className='padding valign gap20'>
                            <div className='h4 b grey800'>기본 정보</div>
                            <div className='profile'>
                                <InfoCard dataName='연락처' value='미공개' />
                                <InfoCard dataName='성별' value={counterUser.sex} />
                                <InfoCard dataName='출생년도' value={counterUser.yearOfBirth} />
                                <InfoCard dataName='최종 학력' value={counterUser.academicCareer} />
                                <InfoCard dataName='직업' value={counterUser.job} />
                                <InfoCard dataName='연소득 (단위: 만 원)' value={counterUser.income} />
                                <InfoCard dataName='근무 형태' value={counterUser.howWork} />
                                <InfoCard dataName='키 (단위: cm)' value={counterUser.height} />
                                <InfoCard dataName='체형' value={counterUser.bodyType} />
                                <InfoCard dataName='스타일' value={counterUser.style} />
                            </div>
                        </div>


                        <div className='padding valign gap20'>
                            <div className='h4 b grey800'>라이프스타일</div>
                            <div className='profile'>
                                {/* <InfoCard dataName='거주지' 
                                    value={counterUser.residence.length >= 2
                                    ? counterUser.residence[0] + " " + counterUser.residence[1]
                                    : "거주지 정보 없음"
                                    }
                                /> */}
                                <InfoCard dataName='거주지' value={counterUser.residence[0] + " " + counterUser.residence[1]} />
                                <InfoCard dataName='근무지' value={counterUser.workPlace[0] + " " + counterUser.workPlace[1]} />
                                <InfoCard dataName='자차 보유 여부' value={counterUser.haveCar} />
                                <InfoCard dataName='자가 보유 여부' value={counterUser.haveHouse} />
                                <InfoCard dataName='음주 횟수' value={counterUser.drinkingFrequency} />
                                <InfoCard dataName='흡연 여부' value={counterUser.smoking} />
                                <InfoCard dataName='문신 여부' value={counterUser.tattoo} />
                                <InfoCard dataName='종교' value={counterUser.religion} />
                            </div>
                        </div>


                        <div className='padding valign gap20'>
                            <div className='h4 b grey800'>성격</div>
                            <div className='profile'>
                                <InfoCard dataName='MBTI' value={counterUser.mbti} />
                                <InfoCard dataName='장점' value={counterUser.strength} />
                                <InfoCard dataName='취미' value={counterUser.interest} />
                                <InfoCard dataName='선호하는 데이트' value={counterUser.dateType} />
                            </div>
                        </div>
                    </div>
                    <Button buttonText='매칭 신청하기' subButtonText={'거절하기'} onClick={suggestMatch} backClick={rejectMatch} />
                </div>
            )}

        </div>
    );
}