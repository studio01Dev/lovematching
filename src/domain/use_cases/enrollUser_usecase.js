// import User from '../models/user';
// import storage from '../../firebase/index'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import db from '../../firebase/index'
// import { collection, addDoc } from 'firebase/firestore'
// import MyResponse from "../models/MyResponse"


// // export default async function EnrollUserUseCase(
// //     name,
// //     phoneNum,
// //     sex,
// //     yearOfBirth,
// //     academicCareer,
// //     job,
// //     income,
// //     company,
// //     jobDetail,
// //     howWork,
// //     //
// //     height,
// //     bodyType,
// //     style,
// //     residence,
// //     workPlace,
// //     haveCar,
// //     haveHouse,
// //     drinkingFrequency,
// //     smoking,
// //     tattoo,
// //     religion,
// //     //
// //     mbti,
// //     strength,
// //     interest,
// //     dateType,
// //     // faceImageData,
// //     // bodyImageData,
// //     // employImageData,
// //     //
// //     counterpartAge,
// //     counterpartAcademic,
// //     counterpartJob,
// //     counterpartIncome,
// //     counterpartHowWork,
// //     counterpartHeight,
// //     counterpartBodyType,
// //     counterpartStyle,
// //     counterpartHaveCar,
// //     counterpartHaveHouse,
// //     counterpartDrinkingFrequency,
// //     counterpartSmoking,
// //     counterpartTattoo,
// //     counterpartReligion,
// //     consultingType,
// //     //
// //     // createdAt,
// //     // paymentStatus,
// //     // newConsumerStatus,
// //     // firstSignUpStatus,
// //     // blackConsumerStatus,
// //     // nowConsultingStatus,
// //     // consultingEndTime,
// // ) {
// //     // 인스턴스 만들기
// //     const newUser = new User( // 인스턴스 만들기
// //         name,
// //         phoneNum,
// //         sex,
// //         yearOfBirth,
// //         academicCareer,
// //         job,
// //         income,
// //         company,
// //         jobDetail,
// //         howWork,
// //         //
// //         height,
// //         bodyType,
// //         style,
// //         residence,
// //         workPlace,
// //         haveCar,
// //         haveHouse,
// //         drinkingFrequency,
// //         smoking,
// //         tattoo,
// //         religion,
// //         //
// //         mbti,
// //         strength,
// //         interest,
// //         dateType,
// //         // faceImageUrl,
// //         // bodyImageUrl,
// //         // employImageUrl,
// //         //
// //         counterpartAge,
// //         counterpartAcademic,
// //         counterpartJob,
// //         counterpartIncome,
// //         counterpartHowWork,
// //         counterpartHeight,
// //         counterpartBodyType,
// //         counterpartStyle,
// //         counterpartHaveCar,
// //         counterpartHaveHouse,
// //         counterpartDrinkingFrequency,
// //         counterpartSmoking,
// //         counterpartTattoo,
// //         counterpartReligion,
// //         consultingType,
// //         //
// //         // new Date,
// //         // '미결제',
// //         // '신규',
// //         // '첫가입',
// //         // false,
// //         // false,
// //         // null,
// //     ).toObject();

// //     // // 사진 업로드
// //     // const faceStorageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "face");
// //     // const bodyStorageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "body");
// //     // const employStorageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "employ");
// //     // await uploadBytes(faceStorageRef, faceImageData)
// //     // await uploadBytes(bodyStorageRef, bodyImageData)
// //     // await uploadBytes(employStorageRef, employImageData)

// //     // // 사진 경로 받아오기
// //     // const faceImageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "face")
// //     // const bodyImageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "body")
// //     // const employImageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "employ")
// //     // const faceImageUrl = await getDownloadURL(faceImageRef);
// //     // const bodyImageUrl = await getDownloadURL(bodyImageRef);
// //     // const employImageUrl = await getDownloadURL(employImageRef);

// //     const docRef = collection(db.db, 'testUsers2');

// //     try {
// //         await addDoc(docRef, newUser);
// //         var response = new MyResponse(true, newUser, "요청이 성공적으로 처리되었습니다.");
// //         alert(response.message);
// //     } catch (error) {
// //         console.error('Error:', error);
// //         var response = new MyResponse(false, false, "잘못된 요청입니다.");
// //         alert(response.message);
// //     }
// // }

// export default async function EnrollUserUseCase(user) {
//     // 인스턴스 만들기
//     const newUser = new User( // 인스턴스 만들기
//         user.name,
//         user.phoneNum,
//         user.sex,
//         user.yearOfBirth,
//         user.income,
//         user.academicCareer,
//         user.company,
//         user.job,
//         user.jobDetail,
//         user.howWork,
//         //
//         user.height,
//         user.bodyType,
//         user.style,
//         user.residence,
//         user.workPlace,
//         user.haveCar,
//         user.haveHouse,
//         user.drinkingFrequency,
//         user.smoking,
//         user.tattoo,
//         user.religion,
//         //
//         user.mbti,
//         user.strength,
//         user.interest,
//         user.dateType,
//         user.faceImageData,
//         user.bodyImageData,
//         user.employImageData,
//         user.faceImageUrl,
//         user.bodyImageUrl,
//         user.employImageUrl,
//         //
//         user.counterpartAge,
//         user.counterpartAcademic,
//         user.counterpartJob,
//         user.counterpartIncome,
//         user.counterpartHowWork,
//         user.counterpartHeight,
//         user.counterpartBodyType,
//         user.counterpartStyle,
//         user.counterpartHaveCar,
//         user.counterpartHaveHouse,
//         user.counterpartDrinkingFrequency,
//         user.counterpartSmoking,
//         user.counterpartTattoo,
//         user.counterpartReligion,
//         user.consultingType,

//         new Date,
//         '미결제',
//         '신규',
//         '첫가입',
//         false,
//         false,
//         null,
//     ).toObject();

//     // 사진 업로드
//     const faceStorageRef = ref(storage.storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "face");
//     const bodyStorageRef = ref(storage.storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "body");
//     const employStorageRef = ref(storage.storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "employ");
//     await uploadBytes(faceStorageRef, user.faceImageData)
//     await uploadBytes(bodyStorageRef, user.bodyImageData)
//     await uploadBytes(employStorageRef, user.employImageData)

//     // 사진 경로 받아오기
//     const faceImageRef = ref(storage.storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "face")
//     const bodyImageRef = ref(storage.storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "body")
//     const employImageRef = ref(storage.storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "employ")
//     const faceImageUrl = await getDownloadURL(faceImageRef);
//     const bodyImageUrl = await getDownloadURL(bodyImageRef);
//     const employImageUrl = await getDownloadURL(employImageRef);

//     const uploadUser = {
//         ...newUser,
//         faceImageUrl: faceImageUrl,
//         bodyImageUrl: bodyImageUrl,
//         employImageUrl: employImageUrl
//     };

//     const docRef = collection(db.db, 'users');

//     try {
//         await addDoc(docRef, newUser);
//         var response = new MyResponse(true, newUser, "요청이 성공적으로 처리되었습니다.");
//         alert(response.message);
//     } catch (error) {
//         console.error('Error:', error);
//         var response = new MyResponse(false, false, "잘못된 요청입니다.");
//         alert(response.message);
//     }
// }





import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import User from '../models/user';
import storage from '../../firebase/index';
import db from '../../firebase/index';
import MyResponse from '../models/MyResponse';

export default async function EnrollUserUseCase(user) {
  try {
    // Upload images to Firebase Storage and get download URLs
    const [faceImageUrl, bodyImageUrl, employImageUrl] = await Promise.all([
      uploadImageToStorage(user.faceImageData),
      uploadImageToStorage(user.bodyImageData),
      uploadImageToStorage(user.employImageData),
    ]);

    // Create a new user object with download URLs
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
      user.counterpartHaveCar,
      user.counterpartHaveHouse,
      user.counterpartDrinkingFrequency,
      user.counterpartSmoking,
      user.counterpartTattoo,
      user.counterpartReligion,
      user.consultingType,
      false,
      new Date(),
      '미결제',
      '첫가입',
      false,
      null
    ).toObject();

    // Add the user document to Firestore
    const docRef = collection(db.db, 'users');
    await addDoc(docRef, newUser);

    const response = new MyResponse(true, newUser, '요청이 성공적으로 처리되었습니다.');
    alert(response.message);
  } catch (error) {
    console.error('Error:', error);
    const response = new MyResponse(false, false, '잘못된 요청입니다.');
    alert(response.message);
  }
}

async function uploadImageToStorage(imageData) {
  const storageRef = ref(storage.storage, `newUser.name + newUser.phoneNum + newUser.yearOfBirth`);
  await uploadBytes(storageRef, imageData);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
}
