import { useState } from "react";
import testEnrollUserUseCase from '../../../domain/use_cases/_test_enrollUser_usecase'
import { Link } from "react-router-dom";
import { getDocs, collection, getDoc, setDoc, doc, Timestamp, updateDoc, orderBy, query } from 'firebase/firestore';
import { ref, getStorage, getDownloadURL } from "firebase/storage"
import db from '../../../firebase/index'
import storage from '../../../firebase/index'
import EnrollUserUseCase from "../../../domain/use_cases/enrollUser_usecase";
import TestEnrollUserUseCase from "../../../domain/use_cases/_test_enrollUser_usecase";
import LoadingDialog from "../../component/loading_dialog/loading_dialog";

export default function Test() {
    const [name, setName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [isLoading, setIsLoading] = useState(false);

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
            // console.log("끝남");
        } else {
            // console.log("No such document!");
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

    let maleOrder = 0;
    let femaleOrder = 0;
    let currentDay = null;

    const addRegistrationOrder = async () => {
        try {
            function to3Digits(number) {
                const num = String(number).padStart(3, '0');
                return num;
            }

            const q = query(collection(db.db, 'users'), orderBy('createdAt', 'asc'));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(
                async (docs) => {
                    const createdAt = docs.data().createdAt.toDate()
                    const sex = docs.data().sex
                    const ref = doc(db.db, 'users', docs.id);

                    // If we're on a new day or haven't set the currentDay yet...
                    if (!currentDay || (createdAt.getDate() !== currentDay.getDate() || createdAt.getMonth() !== currentDay.getMonth() || createdAt.getFullYear() !== currentDay.getFullYear())) {
                        // Reset order and update current day.
                        maleOrder = sex === "남성" ? 1 : 0;
                        femaleOrder = sex === "여성" ? 1 : 0;
                        currentDay = createdAt;
                    } else {
                        // Increment order for same day.
                        if (sex === "남성") maleOrder++;
                        else if (sex === "여성") femaleOrder++;
                    }

                    const year = createdAt.getFullYear();
                    const month = (createdAt.getMonth() + 1).toString().padStart(2, '0');
                    const day = (createdAt.getDate()).toString().padStart(2, '0');

                    // Use updated value of "order".
                    let inputCode =
                        `${sex == "남성" ? ("M" + year + month + day + to3Digits(maleOrder)) :
                            ("F" + year + month + day + to3Digits(femaleOrder))}`;

                    // console.log(inputCode)

                    // Update Firestore document with new code.
                    await updateDoc(ref, { code: inputCode });
                }
            )

            // console.log("done");
        } catch (error) {
            console.error(error);
        }
    }

    const date = new Date()
    const currentYear = date.getFullYear()

    const currentDate = `${currentYear}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    // console.log(currentDate)

    const changeMsToTimestamp = async () => {
        // users 컬렉션에서 모든 정보를 가져와서
        const querySnapshot = await getDocs(collection(db.db, "users"))
        querySnapshot.forEach(
            async (docs) => {
                const ref = doc(db.db, 'users', docs.id);
                if (typeof docs.data().createdAt == 'number') { // 여기서 number(밀리초) -> 타임스탬프
                    const ts = new Timestamp(docs.data().createdAt / 1000, 100000000)
                    // console.log(ts)
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
        // console.log(date.getFullYear())
    }

    const userData = {
        name: 'MALETEST2',
        phoneNum: '01071228287',
        sex: '남성',
    }

    const test = async () => {
        try {
            setIsLoading(true);
            const response = await TestEnrollUserUseCase(userData);
            if (response.success) {
                setIsLoading(false);
                alert('성공')
            } else {
                setIsLoading(false);
                alert('다시 시도해주세요!');
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error)
        }
    }

    const updateResidence = async () => {
        try {
            console.log('pass 0')
            const querySnapshot = await getDocs(collection(db.db, "users"))
            querySnapshot.forEach(
                async (docs) => {
                    console.log('pass 1')
                    const preference = docs.data().counterpartResidence
                    console.log('pass 2')
                    if (preference === undefined) {
                        console.log(docs.data().residence[0])
                        const ref = doc(db.db, "users", docs.id);
                        await updateDoc(ref, {
                            counterpartResidence: docs.data().residence[0]
                        });
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {isLoading && <LoadingDialog />}
            {!isLoading && (
                <div>
                    <Link to='../form'><button>신청하기</button></Link>
                    <Link to='../input-code'><button>매칭 확인하기</button></Link>
                    <button onClick={updateResidence}>테스트 버튼</button>
                </div>
            )}
        </div>
    );
}