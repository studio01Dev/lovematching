import { useState } from "react";
import testEnrollUserUseCase from '../../../domain/use_cases/_test_enrollUser_usecase'
import { Link } from "react-router-dom";
import { getDocs, collection, getDoc, setDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {ref, getStorage, getDownloadURL} from "firebase/storage"
import db from '../../../firebase/index'
import storage from '../../../firebase/index'

export default function Test() {
    const [name, setName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')



    const handleClick = () => {
        const user = {name, phoneNum}
        testEnrollUserUseCase(user)
    }
    
    const updateData = async () => {
        //1. 이름 가져오기 face, body, employ
        const userList = []
        const querySnapshot = await getDocs(collection(db.db, "testFS"))
        querySnapshot.forEach(
            (doc) => {
                userList.push(
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                )
            }
        )
        userList.forEach(
            async (user) => {
                const faceFileRef = ref(storage.storage, user.faceImageUrl)
                const bodyFileRef = ref(storage.storage, user.bodyImageUrl)
                const employFileRef = ref(storage.storage, user.employImageUrl)
                const realFaceImageUrl = await getDownloadURL(faceFileRef);
                const realBodyImageUrl = await getDownloadURL(bodyFileRef);
                const realEmployImageUrl = await getDownloadURL(employFileRef);
                const docRef = doc(db.db, "testFS", user.id);
                await updateDoc(docRef, {
                    faceImageUrl: realFaceImageUrl,
                    bodyImageUrl: realBodyImageUrl,
                    employImageUrl: realEmployImageUrl,
                });
            }
        )
        //2. 같은 이름의 파일을 storage에서 찾아서 URL 다운로드 하기
        //3. URL을 firestore 포맷에 맞게 올리기


    }



    return (
        <div>
            {/* <Child dataToForm={smth1 => setName(smth1)}/>
            <Child dataToForm={smth2 => setPhoneNum(smth2)}/>


            <button onClick={handleClick}>button</button> */}



            <Link to='../form'><button>신청하기</button></Link>
            <Link to='../input-code'><button>매칭 확인하기</button></Link>
            <button onClick={updateData}>사진을 파일이름에서 스토리지 URL로 바꾸기</button>
        </div>
    );
}


export function Child({dataToForm}) {
    return(
        <input style={{ border: '1px solid black' }} type="text" onChange={e => dataToForm(e.target.value)} />
    );
}