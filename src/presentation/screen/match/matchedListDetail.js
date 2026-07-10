import { useParams, useRouter } from 'next/navigation';
import InfoCard from '../../component/infoCard/info-card';
import { MainButton } from '../../component/button/button';
import { useState, useEffect } from 'react';
import ReadUserUseCase from '../../../domain/use_cases/readUser_useCase';
import LoadingDialog from '../../component/loading_dialog/loading_dialog';
import { formatBirthDate } from '../../../domain/models/birthDate';

export default function MatchedListDetail() {
    const { uid, counterId } = useParams();
    const router = useRouter();
    const [counterUser, setCounterUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOneUser() {
            try {
                const readUserUseCase = new ReadUserUseCase();
                const response = await readUserUseCase.readUser(counterId);
                if (response.success === true) {
                    setCounterUser(response.data);
                    setIsLoading(false);
                } else {
                    alert(response.message);
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.');
            }
        }
        fetchOneUser();
    }, [counterId]);

    const goToList = () => {
        router.push(`/matched-list/${uid}`);
    };

    if (isLoading || !counterUser) {
        return <LoadingDialog />;
    }

    return (
        <div>
            <div className="valign gap8">
                <div className="padding h3 b grey900">{counterUser.name.charAt(0)}**님의 프로필</div>
                <div className="padding h5 m grey600">매칭이 성사되었어요.</div>

                <div className="slider-wrapper padding">
                    <div className="slider halign gap20">
                        <img src={counterUser.faceImageUrl} alt="" onContextMenu={(e) => e.preventDefault()} />
                        <img src={counterUser.bodyImageUrl} alt="" onContextMenu={(e) => e.preventDefault()} />
                    </div>
                </div>

                <div className="padding valign gap20">
                    <div className="h4 b grey800">기본 정보</div>
                    <div className="profile">
                        <InfoCard dataName="연락처" value="미공개" />
                        <InfoCard dataName="성별" value={counterUser.sex} />
                        <InfoCard dataName="출생년월일" value={formatBirthDate(counterUser)} />
                        <InfoCard dataName="최종 학력" value={counterUser.academicCareer} />
                        <InfoCard dataName="직업" value={counterUser.job} />
                        <InfoCard dataName="연소득 (단위: 만 원)" value={counterUser.income} />
                        <InfoCard dataName="근무 형태" value={counterUser.howWork} />
                        <InfoCard dataName="키 (단위: cm)" value={counterUser.height} />
                        <InfoCard dataName="체형" value={counterUser.bodyType} />
                        <InfoCard dataName="스타일" value={counterUser.style} />
                    </div>
                </div>

                <div className="padding valign gap20">
                    <div className="h4 b grey800">라이프스타일</div>
                    <div className="profile">
                        <InfoCard dataName="거주지" value={counterUser.residence[0] + ' ' + counterUser.residence[1]} />
                        <InfoCard dataName="근무지" value={counterUser.workPlace[0] + ' ' + counterUser.workPlace[1]} />
                        <InfoCard dataName="자차 보유 여부" value={counterUser.haveCar} />
                        <InfoCard dataName="자가 보유 여부" value={counterUser.haveHouse} />
                        <InfoCard dataName="음주 횟수" value={counterUser.drinkingFrequency} />
                        <InfoCard dataName="흡연 여부" value={counterUser.smoking} />
                        <InfoCard dataName="문신 여부" value={counterUser.tattoo} />
                        <InfoCard dataName="종교" value={counterUser.religion} />
                    </div>
                </div>

                <div className="padding valign gap20">
                    <div className="h4 b grey800">성격</div>
                    <div className="profile">
                        <InfoCard dataName="MBTI" value={counterUser.mbti} />
                        <InfoCard dataName="장점" value={counterUser.strength} />
                        <InfoCard dataName="장점(직접입력)" value={counterUser.strengthText} />
                        <InfoCard dataName="취미" value={counterUser.interest} />
                        <InfoCard dataName="선호하는 데이트" value={counterUser.dateType} />
                    </div>
                </div>
            </div>
            <div style={{ height: '80px' }} />
            <MainButton buttonText="목록으로 돌아가기" onClick={goToList} />
        </div>
    );
}
