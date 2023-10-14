import people from '../../asset/images/people.svg'
import arrow from '../../asset/images/back.png'
import ListItem from '../../component/input/list-item';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AcceptMatchUseCase from '../../../domain/use_cases/acceptMatch_usecase';



export default function ReviewRequest({ suggestList }) {
    const { uid } = useParams();
    const [inCounterChosenFromAdminSuggestList, setInCounterChosenFromAdminSuggestList] = useState(Array);
    useEffect ( ()=> {
        async function fetchInCounterChosenFromAdminSuggestList() {
            try {
                const acceptMatchUseCase = new AcceptMatchUseCase();
                var response =  await acceptMatchUseCase.readInCounterChosenFromAdminSuggestList(uid)
                console.log(response)
                if(response.success === true) {
                    setInCounterChosenFromAdminSuggestList(response.data)
                } else {
                    alert(response.message)
                }
            } catch(error) {
                alert('새로고침하거나, 번호를 다시 입력해주세요.')
            }
        }
        fetchInCounterChosenFromAdminSuggestList();
    }, [])

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
                    <div className='h3 b grey900'>나에게 온 매칭 확인하기</div>
                    <div class="halign calign gap2">
                        <img src={people} style={{ width: '20px' }} />
                        <div className='h6 sb brand500'>{inCounterChosenFromAdminSuggestList.length}</div>
                    </div>
                </div>

                <div className='h5 m grey600'>
                    프로필 카드를 클릭하면,<br />
                    해당 유저의 매칭에 응답할 수 있어요
                </div>

            </div>


            <div class="valign gap20 padding">
                {/* index:  int 0~ */}
                {inCounterChosenFromAdminSuggestList.map((item, index) => (
                    <Link style={{ textDecoration: 'none' }} to={`../approve-request/${uid}/${item.id}`}><ListItem name={item.name} age={
                        parseInt(year) - parseInt(item.yearOfBirth)
                    } residence={item.residence[0]+" "+item.residence[1]} job={item.job} mbti={item.mbti}/></Link>
                ))}
            </div>

        </div>
    );
}