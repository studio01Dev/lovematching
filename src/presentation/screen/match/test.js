import { useState } from "react";
import testEnrollUserUseCase from '../../../domain/use_cases/_test_enrollUser_usecase'
import { Link } from "react-router-dom";
import db from '../../../firebase/index'
import { getDocs, collection, getDoc, setDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function Test() {
    const [name, setName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')



    const handleClick = () => {
        const user = {name, phoneNum}
        testEnrollUserUseCase(user)
    }
    
    const updateData = async () => {
        for (let i = 1; i <= 100; i++) {
            const docRef = doc(collection(db.db, "RandomUsers"), i.toString());
            
            try {
                await updateDoc(docRef, {
                    bodyImageUrl: "https://firebasestorage.googleapis.com/v0/b/love-matching-ecb3c.appspot.com/o/%EB%B0%95%EB%AF%BC%EC%9A%B0010415864581995body?alt=media&token=d07e71c3-db2a-4e61-9aa4-5bd4058667bb",
                    faceImageUrl: "https://firebasestorage.googleapis.com/v0/b/love-matching-ecb3c.appspot.com/o/%EB%B0%95%EB%AF%BC%EC%9A%B0010415864581995body?alt=media&token=d07e71c3-db2a-4e61-9aa4-5bd4058667bb",
                    employImageUrl: "https://firebasestorage.googleapis.com/v0/b/love-matching-ecb3c.appspot.com/o/%EB%B0%95%EB%AF%BC%EC%9A%B0010415864581995body?alt=media&token=d07e71c3-db2a-4e61-9aa4-5bd4058667bb",
                    company: "회사이름(테스트)",
                    createdAt: new Date(),
                    dateType: "선호하는데이터(테스트)",
                    hobby: "취미/관심사(테스트)",
                    isMatched: false,
                    jobDetail: "상세한직업(테스트)",
                    phoneNum: i.toString(),
                    strength: "장점(테스트)",
             });
                console.log(`데이터 업데이트 성공: ${i}`);
            } catch (error) {
              console.error(`데이터 업데이트 중 오류 발생: ${i}`, error);
            }
          }



        //id, 이름, 전화번호는 서로 같고 1부터 100까지의 string임
        //성별은 50이하는 남자

        // 아래 값은 모두 통일함
        // bodyImageUrl: "https://firebasestorage.googleapis.com/v0/b/love-matching-ecb3c.appspot.com/o/%EB%B0%95%EB%AF%BC%EC%9A%B0010415864581995body?alt=media&token=d07e71c3-db2a-4e61-9aa4-5bd4058667bb",
        // faceImageUrl: "https://firebasestorage.googleapis.com/v0/b/love-matching-ecb3c.appspot.com/o/%EB%B0%95%EB%AF%BC%EC%9A%B0010415864581995body?alt=media&token=d07e71c3-db2a-4e61-9aa4-5bd4058667bb",
        // employImageUrl: "https://firebasestorage.googleapis.com/v0/b/love-matching-ecb3c.appspot.com/o/%EB%B0%95%EB%AF%BC%EC%9A%B0010415864581995body?alt=media&token=d07e71c3-db2a-4e61-9aa4-5bd4058667bb",
        // company: "회사이름(테스트)",
        // createdAt: new Date(),
        // dateType: "선호하는데이터(테스트)",
        // hobby: "취미/관심사(테스트)",
        // isMatched: false,
        // jobDetail: "상세한직업(테스트)",
        // phoneNum: i.toString(),
        // strength: "장점(테스트)",
    }



    return (
        <div>
            {/* <Child dataToForm={smth1 => setName(smth1)}/>
            <Child dataToForm={smth2 => setPhoneNum(smth2)}/>


            <button onClick={handleClick}>button</button> */}



            <Link to='../form'><button>신청하기</button></Link>
            <Link to='../input-code'><button>매칭 확인하기</button></Link>
            <button onClick={updateData}>랜덤데이터 업데이트</button>
        </div>
    );
}


export function Child({dataToForm}) {
    return(
        <input style={{ border: '1px solid black' }} type="text" onChange={e => dataToForm(e.target.value)} />
    );
}