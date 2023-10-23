import { collection, addDoc, getDocs, where } from 'firebase/firestore';
import TestUser from '../models/_test_user';
import db from '../../firebase/index';
import MyResponse from '../models/MyResponse';

export default async function TestEnrollUserUseCase(user) {

  try {
    const date = new Date()
    const currentYear = date.getFullYear()

    const today = `${currentYear}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    const num = user.phoneNum.slice(7,11)

    const newCode = `${user.sex === '남성' ? 'M' : 'F'}${today}${num}`;

    const newUser = new TestUser(
      user.name,
      user.sex,
      new Date(),
      newCode,
    ).toObject();

    // Add the user document to Firestore
    const docRef = collection(db.db, 'users');
    await addDoc(docRef, newUser);

    const response = new MyResponse(true, newUser, '성공적으로 신청되었어요!');
    // console.log(response)
    return response

  } catch (error) {
    console.error('Error:', error);
    const response = new MyResponse(false, false, '오류가 발생했어요. 고객센터로 연락주세요.');
    return response
  }
}
