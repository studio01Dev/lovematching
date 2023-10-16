import { collection, addDoc, getDocs } from 'firebase/firestore';
import TestUser from '../models/_test_user';
import db from '../../firebase/index';
import MyResponse from '../models/MyResponse';

export default async function TestEnrollUserUseCase(user) {
    try {

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

        const malesToday = users.filter(user =>
            user.createdAt.toDate().setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) &&
            user.sex === '남성'
        );
        const maleMaxCode = Math.max(...malesToday.map(user => parseInt(user.code.slice(-3))));
        const maleWithMaxCode = malesToday.find(user => parseInt(user.code.slice(-3)) === maleMaxCode);


        const femalesToday = users.filter(user =>
            user.createdAt.toDate().setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) &&
            user.sex === '여성'
        );
        const femaleMaxCode = Math.max(...femalesToday.map(user => parseInt(user.code.slice(-3))));
        const femaleWithMaxCode = femalesToday.find(user => parseInt(user.code.slice(-3)) === femaleMaxCode);

        const date = new Date()
        const currentYear = date.getFullYear()

        const today = `${currentYear}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
        let num;

        let maleCounter = 0;
        let femaleCounter = 0;

        if (user.sex === '남성') {
            maleCounter++;
            num = String(maleCounter).padStart(3, '0');
        } else {
            femaleCounter++;
            num = String(femaleCounter).padStart(3, '0');
        }

        const newCode = `${user.sex === '남성' ? 'M' : 'F'}${today}${num}`;


        // Create a new user object with download URLs
        const newUser = new TestUser(
            user.name,
            user.sex,
            new Date(),
            newCode,
        ).toObject();

        // Add the user document to Firestore
        const docRef = collection(db.db, 'testusers');
        await addDoc(docRef, newUser);

        const response = new MyResponse(true, newUser, '성공적으로 신청되었어요!');
        console.log(response)
        return response

    } catch (error) {
        console.error('Error:', error);
        const response = new MyResponse(false, false, '오류가 발생했어요. 고객센터로 연락주세요.');
        return response
    }
}