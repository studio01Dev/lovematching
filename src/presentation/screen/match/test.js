import { useState } from "react";
import testEnrollUserUseCase from '../../../domain/use_cases/_test_enrollUser_usecase'
import { Link } from "react-router-dom";
import { getDocs, collection, getDoc, setDoc, doc, Timestamp, updateDoc, orderBy, query } from 'firebase/firestore';
import { ref, getStorage, getDownloadURL } from "firebase/storage"
import db from '../../../firebase/index'
import storage from '../../../firebase/index'

export default function Test() {
    const [name, setName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')

    const handleClick = () => {
        const user = { name, phoneNum }
        testEnrollUserUseCase(user)
    }

    const updateData = async () => {
        //1. 이름 가져오기 face, body, employ
        // const userList = []
        // const querySnapshot = await getDocs(collection(db.db, "testFS"))
        // querySnapshot.forEach(
        //     (doc) => {
        //         userList.push(
        //             {
        //                 ...doc.data(),
        //                 id: doc.id
        //             }
        //         )
        //     }
        // )
        const docRef = doc(db.db, "users", 'bRCzOEqaMv8HHt2qysuZ')
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const faceFileRef = ref(storage.storage, docSnap.data().faceImageUrl)
            const bodyFileRef = ref(storage.storage, docSnap.data().bodyImageUrl)
            const employFileRef = ref(storage.storage, docSnap.data().employImageUrl)
            const realFaceImageUrl = await getDownloadURL(faceFileRef);
            const realBodyImageUrl = await getDownloadURL(bodyFileRef);
            const realEmployImageUrl = await getDownloadURL(employFileRef);
            const docRef = doc(db.db, "users", docSnap.id);
            await updateDoc(docRef, {
                faceImageUrl: realFaceImageUrl,
                bodyImageUrl: realBodyImageUrl,
                employImageUrl: realEmployImageUrl,
            });
            console.log("끝남");
        } else {
            console.log("No such document!");
        }
        // userList.forEach(
        //     async (user) => {
        //         const faceFileRef = ref(storage.storage, user.faceImageUrl)
        //         const bodyFileRef = ref(storage.storage, user.bodyImageUrl)
        //         const employFileRef = ref(storage.storage, user.employImageUrl)
        //         const realFaceImageUrl = await getDownloadURL(faceFileRef);
        //         const realBodyImageUrl = await getDownloadURL(bodyFileRef);
        //         const realEmployImageUrl = await getDownloadURL(employFileRef);
        //         const docRef = doc(db.db, "testFS", user.id);
        //         await updateDoc(docRef, {
        //             faceImageUrl: realFaceImageUrl,
        //             bodyImageUrl: realBodyImageUrl,
        //             employImageUrl: realEmployImageUrl,
        //         });
        //     }
        // )
        //2. 같은 이름의 파일을 storage에서 찾아서 URL 다운로드 하기
        //3. URL을 firestore 포맷에 맞게 올리기
    }

    const backUpData = async () => {
        // users 컬렉션에서 모든 정보를 가져와서
        const querySnapshot = await getDocs(collection(db.db, "users"))
        querySnapshot.forEach(
            // PleaseDontTouchMe 컬렉션에 모든 정보 추가
            async (docs) => {
                const docRef = doc(collection(db.db, 'PleaseDontTouchMe'), docs.id)
                await setDoc(docRef, docs.data());
            }
        )
    }

    function to4Digits(number) {
        const num = String(number).padStart(4, '0');
        return num;
    }

    const getLastUser = async () => {
        // 올해 가입한 고객 목록
        const users = [];
        const userSnapshot = await getDocs(collection(db.db, "users"));
        userSnapshot.forEach((doc) => {
            users.push(
                {
                    ...doc.data(),
                    id: doc.id
                }
            )
        }
        )
        const usersThisYear = users.filter(user => parseInt(user.createdAt.toDate().getFullYear()) === parseInt(new Date().getFullYear()))
        // 코드 마지막 4자리 중 가장 큰 숫자
        const codes = [];
        usersThisYear.forEach((user) => {
            codes.push(parseInt(user.code.slice(-4)));
        });
        const lastCode = Math.max(...codes)
        return lastCode
    };

    let order = 0;
    const addRegistrationOrder = async () => {
        try {
            function to4Digits(number) {
                const num = String(number).padStart(4, '0');
                return num;
            }
            // users 컬렉션에서 모든 정보를 가져와서
            // const querySnapshot = await getDocs(collection(db.db, "users").orderBy('createdAt'))
            const q = query(collection(db.db, 'users'), orderBy('createdAt', 'asc'));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(
                // createdAt 순서로 정렬
                async (docs) => {
                    order++;
                    const createdAt = docs.data().createdAt
                    const sex = docs.data().sex
                    const ref = doc(db.db, 'users', docs.id);
                    const inputCode = `${sex == '남성' ? 'M' : 'F'}${createdAt != undefined ? createdAt.toDate().getFullYear() : ''}${to4Digits(order)}`
                    // console.log(docs.data().name, createdAt.toDate(), order)
                    await updateDoc(ref, {
                        code: inputCode
                    });
                    console.log(inputCode)
                }
            )
            console.log('done')
        } catch (error) {
            console.log(error)
        }

    }

    const changeMsToTimestamp = async () => {
        // users 컬렉션에서 모든 정보를 가져와서
        const querySnapshot = await getDocs(collection(db.db, "users"))
        querySnapshot.forEach(
            async (docs) => {
                const ref = doc(db.db, 'users', docs.id);
                if (typeof docs.data().createdAt == 'number') { // 여기서 number(밀리초) -> 타임스탬프
                    const ts = new Timestamp(docs.data().createdAt / 1000, 100000000)
                    console.log(ts)
                    await updateDoc(ref, { createdAt: ts });
                }
            }
        )
    }

    const getCreatedAt = async () => {
        const user = []
        const docRef = doc(db.db, "users", 'YTvdvaIvLTH9aPoftJGP')
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            user.unshift(docSnap.data().createdAt)
        }
        const date = new Date()
        console.log(date.getFullYear())
    }

    return (
        <div>
            <Link to='../form'><button>신청하기</button></Link>
            <Link to='../input-code'><button>매칭 확인하기</button></Link>
            <button onClick={getCreatedAt}>테스트 버튼</button>
        </div>
    );
}


export function Child({ dataToForm }) {
    return (
        <input style={{ border: '1px solid black' }} type="text" onChange={e => dataToForm(e.target.value)} />
    );
}