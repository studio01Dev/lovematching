import people from '../../asset/images/people.svg'
import ListItem from '../../component/listItem/list-item';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AcceptMatchUseCase from '../../../domain/use_cases/acceptMatch_usecase';
import { MainButton } from '../../component/button/button';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../../firebase/index'


export default function ReviewRequest({ suggestList }) {
    const { uid } = useParams();
    const router = useRouter();
    const [thisUser, setThisUser] = useState(Object);
    const [inCounterChosenFromAdminSuggestList, setInCounterChosenFromAdminSuggestList] = useState(Array);


    useEffect(() => {
        async function fetchOneUser() {
            try {
                const user = []
                const docRef = doc(db.db, "users", uid)
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    user.push({
                        ...docSnap.data(),
                        id: docSnap.id,
                    })
                } else {
                    console.log("No such document!");
                }
                setThisUser(user[0])
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        fetchOneUser()
    }, [])

    useEffect(() => {
        async function fetchInCounterChosenFromAdminSuggestList() {
            try {
                const acceptMatchUseCase = new AcceptMatchUseCase();
                var response = await acceptMatchUseCase.readInCounterChosenFromAdminSuggestList(uid)
                // console.log(response)
                if (response.success === true) {
                    const newData = response.data.filter(user =>
                        thisUser.declinedUsers !== undefined
                            ? !thisUser.declinedUsers.includes(user.id)
                            : response.data
                    )
                    setInCounterChosenFromAdminSuggestList(newData)
                } else {
                    alert(response.message)
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        fetchInCounterChosenFromAdminSuggestList();
    }, [thisUser])

    const date = new Date()
    const year = date.getFullYear()

    const goToQueue = () => {
        router.push(`/queue/${uid}`);
    };

    return (
        <div>
            {/* 나에게 온 매칭 확인하기 부분 */}
            <div className="valign padding gap8">

                <div className='halign sbalign'>
                    <div className='h3 b grey900'>나에게 온 매칭 확인하기</div>
                    <div className="halign calign gap2">
                        <img src={people} style={{ width: '20px' }} alt="" />
                        <div className='h6 sb brand500'>{inCounterChosenFromAdminSuggestList.length}</div>
                    </div>
                </div>

                <div className='h5 m grey600'>
                    프로필 카드를 클릭하면,<br />
                    해당 유저의 매칭에 응답할 수 있어요
                </div>

            </div>


            <div className="valign gap20 padding">
                {/* index:  int 0~ */}
                {inCounterChosenFromAdminSuggestList.map((item, index) => (
                    <Link style={{ textDecoration: 'none' }} href={`/approve-request/${uid}/${item.id}`} key={item.id}>
                        <ListItem name={item.name} age={
                            parseInt(year) + 1 - parseInt(item.yearOfBirth)
                        } residence={item.residence[0] + " " + item.residence[1]} job={item.job} mbti={item.mbti} />
                    </Link>
                ))}
            </div>

            <div style={{ height: '80px' }} />
            <MainButton buttonText="뒤로가기" onClick={goToQueue} />
        </div>
    );
}
