import User from '../../models/user';
// import { storage } from '../../firebase/index.js'
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import db from '../../../firebase/index'
import { collection, addDoc } from 'firebase/firestore'
import { ref } from 'firebase/storage';
import storage from '../../../firebase/index'
import { uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { MyResponse } from "../models/MyResponse"


export default async function enrollUser(
    name,
    phoneNum,
    sex,
    yearOfBirth,
    academicCareer,
    job,
    income,
    company,
    jobDetail,
    howWork,
    //
    height,
    bodyType,
    style,
    residence,
    workPlace,
    haveCar,
    haveHouse,
    drinkingFrequency,
    smoking,
    tattoo,
    religion,
    //
    mbti,
    strength,
    interest,
    dateType,
    faceImageData,
    bodyImageData,
    employImageData,
    //
    counterpartAge,
    counterpartAcademic,
    counterpartJob,
    counterpartIncome,
    counterpartHowWork,
    counterpartHeight,
    counterpartBodyType,
    counterpartStyle,
    counterpartHaveCar,
    counterpartHaveHouse,
    counterpartDrinkingFrequency,
    counterpartSmoking,
    counterpartTattoo,
    counterpartReligion,
    consultingType,
    //
    paymentStatus,
    newConsumerStatus,
    firstSignUpStatus,
    blackConsumerStatus,
    nowConsultingStatus,
    consultingEndTime,
    ) {

    // 사진 업로드
    const faceStorageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "face");
    const bodyStorageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "body");
    const employStorageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "employ");
    await uploadBytes(faceStorageRef, faceImageData)
    await uploadBytes(bodyStorageRef, bodyImageData)
    await uploadBytes(employStorageRef, employImageData)

    // 사진 경로 받아오기
    const faceImageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "face")
    const bodyImageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "body")
    const employImageRef = ref(storage, newUser.name + newUser.phoneNum + newUser.yearOfBirth + "employ")
    const faceImageUrl = await getDownloadURL(faceImageRef);
    const bodyImageUrl = await getDownloadURL(bodyImageRef);
    const employImageUrl = await getDownloadURL(employImageRef);

    // 인스턴스 만들기
    const newUser = new User( // 인스턴스 만들기
        name,
        phoneNum,
        sex,
        yearOfBirth,
        academicCareer,
        job,
        income,
        company,
        jobDetail,
        howWork,
        //
        height,
        bodyType,
        style,
        residence,
        workPlace,
        haveCar,
        haveHouse,
        drinkingFrequency,
        smoking,
        tattoo,
        religion,
        //
        mbti,
        strength,
        interest,
        dateType,
        faceImageUrl,
        bodyImageUrl,
        employImageUrl,
        //
        counterpartAge,
        counterpartAcademic,
        counterpartJob,
        counterpartIncome,
        counterpartHowWork,
        counterpartHeight,
        counterpartBodyType,
        counterpartStyle,
        counterpartHaveCar,
        counterpartHaveHouse,
        counterpartDrinkingFrequency,
        counterpartSmoking,
        counterpartTattoo,
        counterpartReligion,
        consultingType,
        //
        paymentStatus,
        newConsumerStatus,
        firstSignUpStatus,
        blackConsumerStatus,
        nowConsultingStatus,
        consultingEndTime,
        ).toObject();

        console.log(newUser)

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