import people from '../../asset/images/people.svg'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ListItem from '../../component/listItem/list-item';
import { useEffect, useState } from 'react';
// import ReadUserUseCase from '../../../domain/use_cases/readUser_useCase';
import AdminSuggestListUseCase from '../../../domain/use_cases/adminSuggestList_usecase';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../../firebase/index'

export default function ViewRequest({ suggestList }) {
    const { uid } = useParams();
    const [adminSuggestList, setAdminSuggestList] = useState(Array);
    const [thisUser, setThisUser] = useState(Object);

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
        async function fetchAdminSuggestList() {
            console.log(thisUser.declinedUsers !== undefined)
            try {
                const adminSuggestList = new AdminSuggestListUseCase();
                var response = await adminSuggestList.readAdminSuggestList(uid)
                // console.log(response)
                if (response.success === true) {
                    const newData = response.data.filter(user =>
                        thisUser.declinedUsers !== undefined
                            ? !thisUser.declinedUsers.includes(user.id)
                            : response.data
                    )
                    setAdminSuggestList(newData)
                } else {
                    alert(response.message)
                }
            } catch (error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        fetchAdminSuggestList();
    }, [thisUser])

    const date = new Date()
    const year = date.getFullYear()

    return (
        <div>

            {/* <div className="arrow-back">
                <Link style={{ textDecoration: 'none' }} to='../queue'><img src={arrow} style={{ width: '8px', height: '16px' }} /></Link>
            </div> */}


            {/* 내가 매칭 신청하기 부분 */}
            <div class="valign padding gap8">

                <div className='halign sbalign'>
                    <div className='h3 b grey900'>내가 매칭 신청하기</div>
                    <div class="halign calign gap2">
                        <img src={people} style={{ width: '20px' }} />
                        <div className='h6 sb brand500'>{adminSuggestList.length}</div>
                    </div>
                </div>

                <div className='h5 m grey600'>
                    프로필 카드를 클릭하면,<br />
                    해당 유저에게 매칭 신청을 할 수 있어요
                </div>

            </div>


            <div class="valign gap20 padding">
                {/* index:  int 0~ */}
                {adminSuggestList.map((item, index) => (
                    <Link style={{ textDecoration: 'none' }} href={`/make-request/${uid}/${item.id}`} key={item.id}>
                        <ListItem
                            name={item.name}
                            age={parseInt(year) + 1 - parseInt(item.yearOfBirth)}
                            residence={item.residence[0] + " " + item.residence[1]}
                            job={item.job}
                            mbti={item.mbti}
                            source={item.faceImageUrl} />
                    </Link>
                ))}
            </div>

        </div>
    );
}