import TestUser from '../models/_test_user';
// import { storage } from '../../firebase/index.js'
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db from '../../firebase/index'
import { collection, addDoc } from 'firebase/firestore'
import MyResponse from '../models/MyResponse';


export default async function testEnrollUserUseCase(user) {

    // 인스턴스 만들기
    const newUser = new TestUser(user.name, user.phoneNum).toObject();

    console.log(newUser);

    const docRef = collection(db.db, 'testUsers2');

    try {
        await addDoc(docRef, newUser);
        var response = new MyResponse(true, newUser, "요청이 성공적으로 처리되었습니다.");
        alert(response.message);
    } catch (error) {
        console.error('Error:', error);
        var response = new MyResponse(false, false, "잘못된 요청입니다.");
        alert(response.message);
    }
}



