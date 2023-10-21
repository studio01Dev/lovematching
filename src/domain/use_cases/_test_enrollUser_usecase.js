import { collection, addDoc, getDocs, where } from 'firebase/firestore';
import TestUser from '../models/_test_user';
import db from '../../firebase/index';
import MyResponse from '../models/MyResponse';

export default async function TestEnrollUserUseCase(user) {

  async function fetchUserDocs(startOfToday) {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const result = await getDocs(collection(db.db, 'users'), where("createdAt", ">=", startOfToday));
        return result;
      } catch (error) {
        console.error(`Error fetching user docs: ${error}. Retrying...`);
        retries++;
      }
    }

    throw new Error('네트워크 문제가 발생했어요. 관리자에게 문의주세요.');
  }

  try {
    const userList = [];
    const now = new Date();
    let yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const startOfToday = yesterday.setHours(0, 0, 0, 0);
    console.log(startOfToday)
    const result = await getDocs(collection(db.db, 'users'), where("createdAt", ">=", startOfToday))
    console.log('result')
    result.forEach((doc) => {
      userList.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    let maxCode
    if (user.sex === '남성') {

      // 오늘 가입한 남성 유저 배열 생성 후 마지막 코드 가져오기
      const malesToday = userList.filter(user =>
        user.createdAt.toDate() === startOfToday &&
        user.sex === '남성'
      );
      maxCode = malesToday.length === 0
        ? 0
        : Math.max(...malesToday.map(user => parseInt(user.code.slice(-3))));
    }
    // else {

    //   // 오늘 가입한 여성 유저 배열 생성 후 마지막 코드 가져오기
    //   const femalesToday = userList.filter(user =>
    //     user.createdAt.toDate().setHours(0, 0, 0).getTime() == new Date().setHours(0, 0, 0).getTime() &&
    //     user.sex === '여성'
    //   )
    //   maxCode = femalesToday.length === 0
    //     ? 0
    //     : Math.max(...femalesToday.map(user => parseInt(user.code.slice(-3))));
    // }

    const date = new Date()
    const currentYear = date.getFullYear()

    const today = `${currentYear}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    const num = String(maxCode + 1).padStart(3, '0');

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
