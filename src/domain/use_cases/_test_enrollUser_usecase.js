import TestUser from '../../models/_test_user';
// import { storage } from '../../firebase/index.js'
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db from '../../../firebase/index'
import { collection, addDoc } from 'firebase/firestore'


export default async function testEnrollUser(name) {

    // 인스턴스 만들기
    const newUser = new TestUser(name).toObject();

    console.log(newUser);

    const docRef = collection(db.db, 'testUsers2');

    try {
        await addDoc(docRef, newUser);
        alert('Data added successfully.');
    } catch (error) {
        console.error('Error:', error);
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
}



