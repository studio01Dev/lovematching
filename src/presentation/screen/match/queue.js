import Link from 'next/link';
import plane from '../../asset/images/plane.svg'
import memo from '../../asset/images/memo.svg'
import brandCheck from '../../asset/images/brand-check.svg'
import info from '../../asset/images/info.svg'
import people from '../../asset/images/people.svg'
import { MainButton } from '../../component/button/button';
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import ReadUserUseCase from '../../../domain/use_cases/readUser_useCase';
import AdminSuggestListUseCase from '../../../domain/use_cases/adminSuggestList_usecase';
import AcceptMatchUseCase from '../../../domain/use_cases/acceptMatch_usecase';
import FirstMatchingUseCase from '../../../domain/use_cases/firstMatching_usecase';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../../firebase/index'
import { QueueCountBadge, QueueCountText } from './queueCount';
import './queue.css';


export default function Queue() {
    const { uid } = useParams();
    const [user, setUser] = useState({});
    const [thisUser, setThisUser] = useState(null);
    const [adminSuggestListLength, setAdminSuggestListLength] = useState(0);
    const [inCounterChosenFromAdminSuggestListLength, setInCounterChosenFromAdminSuggestListLength] = useState(0);
    const [chosenListLength, setChosenListLength] = useState(0);
    const [matchedListLength, setMatchedListLength] = useState(0);
    const [isMatchedCountLoading, setIsMatchedCountLoading] = useState(true);

    useEffect(() => {
        async function fetchThisUser() {
            try {
                const docRef = doc(db.db, "users", uid)
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setThisUser({
                        ...docSnap.data(),
                        id: docSnap.id,
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        fetchThisUser()
    }, [uid])

    useEffect(() => {
        if (!thisUser) {
            return;
        }

        const filterDeclined = (items) => (
            thisUser.declinedUsers !== undefined
                ? items.filter((item) => !thisUser.declinedUsers.includes(item.id))
                : items
        );

        async function fetchAdminSuggestListLength() {
            try {
                const adminSuggestList = new AdminSuggestListUseCase();
                const response = await adminSuggestList.readAdminSuggestList(uid)
                if (response.success === true) {
                    setAdminSuggestListLength(filterDeclined(response.data).length)
                } else {
                    alert(response.message)
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }

        async function fetchInCounterChosenFromAdminSuggestListLength() {
            try {
                const acceptMatchUseCase = new AcceptMatchUseCase();
                const response = await acceptMatchUseCase.readInCounterChosenFromAdminSuggestList(uid)
                if (response.success === true) {
                    setInCounterChosenFromAdminSuggestListLength(filterDeclined(response.data).length)
                } else {
                    alert(response.message)
                }
            } catch (error) {
                // alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }

        async function fetchChosenListLength() {
            try {
                const adminSuggestListUseCase = new AdminSuggestListUseCase();
                const response = await adminSuggestListUseCase.readChosenFromAdminSuggestList(uid)
                if (response.success === true) {
                    setChosenListLength(response.data.length)
                } else {
                    alert(response.message)
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }

        async function fetchMatchedListLength() {
            setIsMatchedCountLoading(true);
            try {
                const firstMatchingUseCase = new FirstMatchingUseCase();
                const response = await firstMatchingUseCase.readMatchedUsers(uid)
                if (response.success === true) {
                    setMatchedListLength(response.data.length)
                } else {
                    alert(response.message)
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            } finally {
                setIsMatchedCountLoading(false);
            }
        }

        async function fetchOneUser() {
            try {
                const readUserUseCase = new ReadUserUseCase();
                const response = await readUserUseCase.readUser(uid)
                if (response.success === true) {
                    setUser(response.data)
                } else {
                    alert(response.message)
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }

        fetchOneUser();
        fetchAdminSuggestListLength();
        fetchInCounterChosenFromAdminSuggestListLength();
        fetchChosenListLength();
        fetchMatchedListLength();
    }, [thisUser, uid])

    const toHome = () => {
        window.location.href = 'https://www.lovematching.kr/';
    }

    return (
        <div>
            <div className='valign'>
                <div className='padding h3 b grey900'>{user.name ? `${user.name}님의 러브매칭` : '러브매칭'}</div>

                <div className="padding valign gap20">
                    <Link href={`/view-request/${uid}`} style={{ textDecoration: 'none' }}>
                        <div className='request-box valign gap8'>
                            <div className="halign sbalign calign">
                                <img src={plane} style={{ width: '40px' }} alt="" />
                                <div className='halign calign gap2'>
                                    <img src={people} style={{ width: '20px' }} alt="" />
                                    <div className='h6 sb brand500'>{adminSuggestListLength}</div>
                                </div>
                            </div>
                            <div className='h4 sb grey800'>내가 매칭 신청하기</div>
                            <div className='h5 r grey600'>담당 매니저가 엄선한 {adminSuggestListLength}명 중,<br />마음에 드는 분에게 매칭을 신청하세요</div>
                        </div>
                    </Link>

                    <Link href={`/sent-request/${uid}`} style={{ textDecoration: 'none' }}>
                        <div className='request-box valign gap8'>
                            <div className="halign sbalign calign">
                                <img src={brandCheck} style={{ width: '40px' }} alt="" />
                                <div className='halign calign gap2'>
                                    <img src={people} style={{ width: '20px' }} alt="" />
                                    <div className='h6 sb brand500'>{chosenListLength}</div>
                                </div>
                            </div>
                            <div className='h4 sb grey800'>내가 매칭 신청한 프로필 확인하기</div>
                            <div className='h5 r grey600'>매칭 신청을 완료한 {chosenListLength}명의 프로필을<br />확인할 수 있어요.</div>
                        </div>
                    </Link>

                    <Link href={`/review-request/${uid}`} style={{ textDecoration: 'none' }}>
                        <div className='request-box valign gap8'>
                            <div className="halign sbalign calign">
                                <img src={memo} style={{ width: '40px' }} alt="" />
                                <div className='halign calign gap2'>
                                    <img src={people} style={{ width: '20px' }} alt="" />
                                    <div className='h6 sb brand500'>{inCounterChosenFromAdminSuggestListLength}</div>
                                </div>
                            </div>
                            <div className='h4 sb grey800'>나에게 온 매칭 확인하기</div>
                            <div className='h5 r grey600'>{user.name}님께 호감을 표시한 {inCounterChosenFromAdminSuggestListLength}명 중,<br />마음에 드는 분을 수락해보세요.</div>
                        </div>
                    </Link>

                    <Link href={`/matched-list/${uid}`} style={{ textDecoration: 'none' }}>
                        <div className='request-box valign gap8'>
                            <div className="halign sbalign calign">
                                <img src={info} style={{ width: '40px' }} alt="" />
                                <div className='halign calign gap2'>
                                    <img src={people} style={{ width: '20px' }} alt="" />
                                    <QueueCountBadge isLoading={isMatchedCountLoading} count={matchedListLength} />
                                </div>
                            </div>
                            <div className='h4 sb grey800'>매칭이 성사된 프로필 확인하기</div>
                            <div className='h5 r grey600'>
                                <QueueCountText
                                    isLoading={isMatchedCountLoading}
                                    loadingText={<>잠시만 기다려주세요</>}
                                >
                                    매칭이 완료된 {matchedListLength}명의 프로필을<br />확인할 수 있어요.
                                </QueueCountText>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <MainButton buttonText='홈으로 돌아가기' onClick={toHome}/>
        </div>
    );
}
