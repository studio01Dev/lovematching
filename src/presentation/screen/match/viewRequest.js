import people from '../../asset/images/people.svg'
import arrow from '../../asset/images/back.png'
import { Link, useParams } from 'react-router-dom';
import ListItem from '../../component/input/list-item';
import { useEffect, useState } from 'react';
import ReadUserUseCase from '../../../domain/use_cases/readUser_useCase';
import AdminSuggestListUseCase from '../../../domain/use_cases/adminSuggestList_usecase';

export default function ViewRequest({ suggestList }) {
    const { uid } = useParams();
    const [user, setUser] = useState(Object);
    const [adminSuggestList, setAdminSuggestList] = useState(Array);
    useEffect ( ()=> {
        async function fetchOneUser() {
            try {
                const readUserUseCase = new ReadUserUseCase();
                var response =  await readUserUseCase.readUser(uid)
                console.log(response)
                if(response.success === true) {
                    setUser(response.data)
                } else {
                    alert(response.message)
                }
            } catch(error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        async function fetchAdminSuggestList() {
            try {
                const adminSuggestList = new AdminSuggestListUseCase();
                var response =  await adminSuggestList.readAdminSuggestList(uid)
                console.log(response)
                if(response.success === true) {
                    setAdminSuggestList(response.data)
                } else {
                    alert(response.message)
                }
            } catch(error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        fetchOneUser();
        fetchAdminSuggestList();
    }, [])
    return (
        <div>

            <div className="arrow-back">
                <Link style={{ textDecoration: 'none' }} to='../queue'><img src={arrow} style={{ width: '8px', height: '16px' }} /></Link>
            </div>


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
                    <Link style={{ textDecoration: 'none' }} to={`../make-request/${uid}/${item.id}`}><ListItem name={item.name} age={item.age} residence={item.residence[0]+" "+item.residence[1]} job={item.job} mbti={item.mbti}/></Link>
                ))}
            </div>

        </div>
    );
}