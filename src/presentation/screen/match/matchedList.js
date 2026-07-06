import people from '../../asset/images/people.svg';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ListItem from '../../component/listItem/list-item';
import { useEffect, useState } from 'react';
import FirstMatchingUseCase from '../../../domain/use_cases/firstMatching_usecase';
import { QueueCountBadge } from './queueCount';
import './queue.css';

export default function MatchedList() {
    const { uid } = useParams();
    const [matchedList, setMatchedList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchMatchedList() {
            setIsLoading(true);
            try {
                const firstMatchingUseCase = new FirstMatchingUseCase();
                const response = await firstMatchingUseCase.readMatchedUsers(uid);
                if (response.success === true) {
                    setMatchedList(response.data);
                } else {
                    alert(response.message);
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.');
            } finally {
                setIsLoading(false);
            }
        }
        fetchMatchedList();
    }, [uid]);

    const date = new Date();
    const year = date.getFullYear();

    return (
        <div>
            <div className="valign padding gap8">
                <div className="halign sbalign">
                    <div className="h3 b grey900">매칭이 성사된 프로필</div>
                    <div className="halign calign gap2">
                        <img src={people} style={{ width: '20px' }} alt="" />
                        <QueueCountBadge isLoading={isLoading} count={matchedList.length} />
                    </div>
                </div>

                <div className="h5 m grey600">
                    프로필 카드를 클릭하면,<br />
                    매칭이 완료된 상대의 프로필을 확인할 수 있어요.
                </div>
            </div>

            {isLoading ? (
                <div className="valign gap12 padding">
                    <div className="queue-count-loading h5 m grey600">
                        잠시만 기다려주세요
                        <span className="queue-count-dots" aria-hidden="true">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </span>
                    </div>
                </div>
            ) : matchedList.length === 0 ? (
                <div className="valign gap12 padding">
                    <div className="h5 m grey600">아직 매칭이 성사된 프로필이 없어요.</div>
                    <Link href={`/queue/${uid}`} className="h6 sb brand500">
                        러브매칭 홈으로 돌아가기
                    </Link>
                </div>
            ) : (
                <div className="valign gap20 padding">
                    {matchedList.map((item) => (
                        <Link
                            key={`${item.matchId}-${item.id}`}
                            href={`/matched-list/${uid}/${item.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <ListItem
                                name={item.name}
                                age={parseInt(year) + 1 - parseInt(item.yearOfBirth)}
                                residence={item.residence?.[0] && item.residence?.[1]
                                    ? `${item.residence[0]} ${item.residence[1]}`
                                    : ''}
                                job={item.job}
                                mbti={item.mbti}
                                source={item.faceImageUrl}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
