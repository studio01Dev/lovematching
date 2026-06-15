import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import User from '../models/user';
import storage from '../../firebase/index';
import db from '../../firebase/index';
import MyResponse from '../models/MyResponse';
import { isSajuCustomer } from '../models/birthDate';

function normalizeUserInput(user) {
  const normalized = {
    ...user,
    name: user.name.trim(),
    phoneNum: String(user.phoneNum).replace(/[^0-9]/g, ''),
  };
  const saju = isSajuCustomer(normalized);

  return {
    ...normalized,
    saju,
    ...(saju
      ? {}
      : {
          birthHour: null,
          birthMinute: null,
          birthCalendarType: null,
        }),
  };
}

function prepareFirestoreData(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  );
}

async function findExistingUser(name, phoneNum) {
  const q = query(
    collection(db.db, 'users'),
    where('name', '==', name),
    where('phoneNum', '==', phoneNum)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const users = querySnapshot.docs.map((snapshot) => ({
    docRef: snapshot.ref,
    data: {
      ...snapshot.data(),
      id: snapshot.id,
    },
  }));

  const pickUser = (a, b) => {
    const aTime = a.data.createdAt?.toDate?.() ?? a.data.createdAt ?? 0;
    const bTime = b.data.createdAt?.toDate?.() ?? b.data.createdAt ?? 0;
    return aTime - bTime;
  };

  if (users.length === 1) {
    return users[0];
  }

  return users.sort(pickUser)[0];
}

function buildUserObject(user, imageUrls, serviceFields) {
  return new User(
    '',
    user.name,
    user.phoneNum,
    user.sex,
    user.yearOfBirth,
    user.birthMonth,
    user.birthDay,
    user.birthHour,
    user.birthMinute,
    user.birthCalendarType,
    user.saju,
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
    imageUrls.faceImageUrl,
    imageUrls.bodyImageUrl,
    imageUrls.employImageUrl,
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
    serviceFields.isMatched,
    serviceFields.createdAt,
    serviceFields.paymentStatus,
    serviceFields.firstSignUpStatus,
    serviceFields.blackConsumerStatus,
    serviceFields.consultingEndTime,
    serviceFields.code
  ).toObject();
}

function generateCode(user) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const today = `${currentYear}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
  const num = user.phoneNum.slice(7, 11);

  return `${user.sex === '남성' ? 'M' : 'F'}${today}${num}`;
}

export default async function EnrollUserUseCase(user) {
  try {
    const normalizedUser = normalizeUserInput(user);
    const existingUser = await findExistingUser(normalizedUser.name, normalizedUser.phoneNum);

    const [faceImageUrl, bodyImageUrl, employImageUrl] = await Promise.all([
      uploadImageToStorage(normalizedUser.faceImageData, 'face', normalizedUser.name, normalizedUser.phoneNum, normalizedUser.yearOfBirth.toString()),
      uploadImageToStorage(normalizedUser.bodyImageData, 'body', normalizedUser.name, normalizedUser.phoneNum, normalizedUser.yearOfBirth.toString()),
      uploadImageToStorage(normalizedUser.employImageData, 'employ', normalizedUser.name, normalizedUser.phoneNum, normalizedUser.yearOfBirth.toString()),
    ]);

    const imageUrls = { faceImageUrl, bodyImageUrl, employImageUrl };

    if (existingUser) {
      const existingData = existingUser.data;
      const now = new Date();
      const firstSignUpAt = existingData.firstSignUpAt ?? existingData.createdAt;

      const updatedUser = buildUserObject(normalizedUser, imageUrls, {
        isMatched: existingData.isMatched ?? false,
        createdAt: now,
        paymentStatus: existingData.paymentStatus ?? false,
        firstSignUpStatus: true,
        blackConsumerStatus: existingData.blackConsumerStatus ?? false,
        consultingEndTime: existingData.consultingEndTime ?? null,
        code: existingData.code,
      });

      const updateData = {
        ...updatedUser,
        firstSignUpAt,
        updatedAt: now,
      };

      if (existingData.declinedUsers !== undefined) {
        updateData.declinedUsers = existingData.declinedUsers;
      }

      delete updateData.id;

      await updateDoc(existingUser.docRef, prepareFirestoreData(updateData));

      const response = new MyResponse(
        true,
        { id: existingUser.docRef.id, ...updateData },
        '성공적으로 신청되었어요!'
      );
      return response;
    }

    const newUser = buildUserObject(normalizedUser, imageUrls, {
      isMatched: false,
      createdAt: new Date(),
      paymentStatus: false,
      firstSignUpStatus: false,
      blackConsumerStatus: false,
      consultingEndTime: null,
      code: generateCode(normalizedUser),
    });

    delete newUser.id;

    const docRef = collection(db.db, 'users');
    await addDoc(docRef, prepareFirestoreData(newUser));

    const response = new MyResponse(true, newUser, '성공적으로 신청되었어요!');
    return response;
  } catch (error) {
    console.error('Error:', error);
    const response = new MyResponse(false, false, '오류가 발생했어요. 고객센터로 연락주세요.');
    return response;
  }
}

async function uploadImageToStorage(imageData, typeOfImage, name, phoneNum, yearOfBirth) {
  const storageRef = ref(storage.storage, name + phoneNum + yearOfBirth + typeOfImage);
  await uploadBytes(storageRef, imageData);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
}
