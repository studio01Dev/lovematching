import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, where } from 'firebase/firestore';
import User from '../models/user';
import storage from '../../firebase/index';
import db from '../../firebase/index';
import MyResponse from '../models/MyResponse';

export default async function EnrollUserUseCase(user) {

  try {
    const [faceImageUrl, bodyImageUrl, employImageUrl] = await Promise.all([
      uploadImageToStorage(user.faceImageData, 'face', user.name, user.phoneNum, user.yearOfBirth.toString()),
      uploadImageToStorage(user.bodyImageData, 'body', user.name, user.phoneNum, user.yearOfBirth.toString()),
      uploadImageToStorage(user.employImageData, 'employ', user.name, user.phoneNum, user.yearOfBirth.toString()),
    ]);

    const date = new Date()
    const currentYear = date.getFullYear()

    const today = `${currentYear}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    const num = user.phoneNum.slice(7, 11)

    const newCode = `${user.sex === '남성' ? 'M' : 'F'}${today}${num}`;

    const newUser = new User(
      '',
      user.name,
      user.phoneNum,
      user.sex,
      user.yearOfBirth,
      user.income,
      user.academicCareer,
      user.company,
      user.job,
      user.jobDetail,
      user.howWork,
      user.height,
      user.bodyType,
      user.style,
      user.residence,
      user.workPlace,
      user.haveCar,
      user.haveHouse,
      user.drinkingFrequency,
      user.smoking,
      user.tattoo,
      user.religion,
      user.mbti,
      user.strength,
      user.interest,
      user.dateType,
      faceImageUrl,
      bodyImageUrl,
      employImageUrl,
      user.counterpartAge,
      user.counterpartAcademic,
      user.counterpartJob,
      user.counterpartIncome,
      user.counterpartHowWork,
      user.counterpartHeight,
      user.counterpartBodyType,
      user.counterpartStyle,
      user.counterpartResidence,
      user.counterpartHaveCar,
      user.counterpartHaveHouse,
      user.counterpartDrinkingFrequency,
      user.counterpartSmoking,
      user.counterpartTattoo,
      user.counterpartReligion,
      user.counterpartStrength,
      user.consultingType,
      false,
      new Date(),
      false,
      false,
      false,
      null,
      newCode
    ).toObject();

    // Add the user document to Firestore
    const docRef = collection(db.db, 'users');
    await addDoc(docRef, newUser);

    const response = new MyResponse(true, newUser, '성공적으로 신청되었어요!');
    return response

  } catch (error) {
    console.error('Error:', error);
    const response = new MyResponse(false, false, '오류가 발생했어요. 고객센터로 연락주세요.');
    return response
  }
}

async function uploadImageToStorage(imageData, typeOfImage, name, phoneNum, yearOfBirth) {
  const storageRef = ref(storage.storage, name + phoneNum + yearOfBirth + typeOfImage);
  await uploadBytes(storageRef, imageData);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
}
