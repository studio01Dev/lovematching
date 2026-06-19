import people from '../../asset/images/people.svg';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ListItem from '../../component/listItem/list-item';
import { useEffect, useState } from 'react';
import AdminSuggestListUseCase from '../../../domain/use_cases/adminSuggestList_usecase';

export default function SentRequest() {
    const { uid } = useParams();
    const [chosenList, setChosenList] = useState([]);

    useEffect(() => {
        async function fetchChosenList() {
            try {
                const adminSuggestListUseCase = new AdminSuggestListUseCase();
                const response = await adminSuggestListUseCase.readChosenFromAdminSuggestList(uid);
                if (response.success === true) {
                    setChosenList(response.data);
                } else {
                    alert(response.message);
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.');
            }
        }
        fetchChosenList();
    }, [uid]);

    const date = new Date();
    const year = date.getFullYear();

    return (
        <div>
            <div className="valign padding gap8">
                <div className="halign sbalign">
                    <div className="h3 b grey900">내가 수락한 매칭</div>
                    <div className="halign calign gap2">
                        <img src={people} style={{ width: '20px' }} alt="" />
                        <div className="h6 sb brand500">{chosenList.length}</div>
                    </div>
                </div>

                <div className="h5 m grey600">
                    프로필 카드를 클릭하면,<br />
                    상세 프로필을 확인할 수 있어요.
                </div>
            </div>

            {chosenList.length === 0 ? (
                <div className="valign gap12 padding">
                    <div className="h5 m grey600">아직 수락한 매칭이 없어요.</div>
                    <Link href={`/view-request/${uid}`} className="h6 sb brand500">
                        추천 목록에서 매칭 신청하기
                    </Link>
                </div>
            ) : (
                <div className="valign gap20 padding">
                    {chosenList.map((item) => (
                        <Link
                            key={item.id}
                            href={`/sent-request/${uid}/${item.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <ListItem
                                name={item.name}
                                age={parseInt(year) + 1 - parseInt(item.yearOfBirth)}
                                residence={item.residence[0] + ' ' + item.residence[1]}
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
