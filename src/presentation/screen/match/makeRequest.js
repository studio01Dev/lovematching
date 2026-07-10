import { useParams, useRouter } from 'next/navigation';
import InfoCard from '../../component/infoCard/info-card';
import Button from '../../component/button/button';
import NotificationSuccess from '../../component/notification/notification_success';
import { useState, useEffect } from 'react';
import ReadUserUseCase from '../../../domain/use_cases/readUser_useCase';
import AdminSuggestListUseCase from '../../../domain/use_cases/adminSuggestList_usecase';
import LoadingDialog from '../../component/loading_dialog/loading_dialog';
import { formatBirthDate } from '../../../domain/models/birthDate';


export default function MakeRequest({ name }) {
    const { uid, counterId } = useParams();
    const router = useRouter();
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

    const goBack = async () => {
        router.back();
        const adminSuggestListUseCase = new AdminSuggestListUseCase();
        await adminSuggestListUseCase.declineSuggest(uid, counterId);
    }

    const goToList = () => {
        router.push(`/view-request/${uid}`);
    };

    // Notification을 위한 hook
    const [alertVisible, setAlertVisible] = useState(false); // alertVisible === true일 때, notification이 생성됩니다.
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
                router.replace(`/view-request/${uid}`);
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
                    <div className="side-padding" style={{ paddingTop: 8, paddingBottom: 8 }}>
                        <button
                            type="button"
                            className="h6 sb grey700"
                            onClick={goToList}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            ← 뒤로가기
                        </button>
                    </div>
                    {/* 님의 프로필 부분 */}
                    <div className="valign gap8">
                        <div className='padding h3 b grey900'>{counterUser.name.charAt(0)}**님의 프로필</div>
                        <NotificationSuccess message='매칭을 신청했어요' visible={alertVisible} setVisible={setAlertVisible} />



                        {/* carousel 부분 */}
                        <div className="slider-wrapper padding">
                            <div className='slider halign gap20'>
                                <img src={counterUser.faceImageUrl} onContextMenu={(e) => e.preventDefault()}  />
                                <img src={counterUser.bodyImageUrl} onContextMenu={(e) => e.preventDefault()} />
                            </div>
                        </div>


                        <div className='padding valign gap20'>
                            <div className='h4 b grey800'>기본 정보</div>
                            <div className='profile'>
                                <InfoCard dataName='연락처' value='미공개' />
                                <InfoCard dataName='성별' value={counterUser.sex} />
                                <InfoCard dataName='출생년월일' value={formatBirthDate(counterUser)} />
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
                                <InfoCard dataName='장점(직접입력)' value={counterUser.strengthText} />
                                <InfoCard dataName='취미' value={counterUser.interest} />
                                <InfoCard dataName='선호하는 데이트' value={counterUser.dateType} />
                            </div>
                        </div>


                    </div>
                    <Button buttonText='매칭 신청하기' backText={'거절하기'} onClick={suggestMatch} backClick={goBack} />
                </div>
            )}

        </div>
    );
}