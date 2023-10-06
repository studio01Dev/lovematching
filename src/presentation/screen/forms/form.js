import ProgressBar from "../../component/input/progressBar";
import Form1 from "./form-1";
import Form2 from "./form-2";
import Form3 from "./form-3";
import Form4 from "./form-4";
import Form5 from "./form-5";
import FormDone from "./formDone";
import { useState, useEffect } from "react";
import User from "../../../domain/models/user";

export default function Form() {
    const [formDataPage1, setFormDataPage1] = useState({});
    const [formDataPage2, setFormDataPage2] = useState({});
    const [formDataPage3, setFormDataPage3] = useState({});
    const [formDataPage4, setFormDataPage4] = useState({});
    const [formDataPage5, setFormDataPage5] = useState({});

    const newConsumer = new User();
    const [userData, setUserData] = useState(newConsumer);

    const fieldTranslations = {
        name: '성함',
        phoneNum: '연락처',
        sex: '성별',
        yearOfBirth: '출생연도',
        academicCareer: '최종 학력',
        job: '직업',
        income: '소득',
        company: '회사',
        jobDetail: '직무',
        howWork: '근무 형태',
        height: '키',
        bodyType: '체형',
        style: '스타일',
        residence: '거주지',
        workPlace: '근무지',
        haveCar: '자차 보유 여부',
        haveHouse: '자가 보유 여부',
        drinkingFrequency: '음주 횟수',
        smoking: '흡연 여부',
        tattoo: '문신 여부',
        religion: '종교',
        mbti: 'MBTI',
        strength: '장점',
        interest: '취미/관심사',
        dateType: '선호하는 데이트',
        faceImageData: '얼굴 정면 사진',
        bodyImageData: '전신 사진',
        employImageData: '재직 증명 사진',
        counterpartAge: '상대방 나이',
        counterpartAcademic: '상대방 최종학력',
        counterpartJob: '상대방 직업',
        counterpartIncome: '상대방 소득',
        counterpartHowWork: '상대방 근무 형태',
        counterpartHeight: '상대방 키',
        counterpartBodyType: '상대방 체형',
        counterpartStyle: '상대방 스타일',
        counterpartHaveCar: '상대방 자차 보유 여부',
        counterpartHaveHouse: '상대방 자가 보유 여부',
        counterpartDrinkingFrequency: '상대방 음주 횟수',
        counterpartSmoking: '상대방 흡연 여부',
        counterpartTattoo: '상대방 문신 여부',
        counterpartReligion: '상대방 종교',
        consultingType: '선호하는 상담 방법',
    };

    const requiredFields = {
        1: ['name', 'phoneNum', 'yearOfBirth', 'income', 'academicCareer', 'company', 'job', 'jobDetail', 'howWork', 'height', 'bodyType', 'style'],
        2: ['residence', 'workPlace', 'haveCar', 'haveHouse', 'drinkingFrequency', 'tattoo', 'smoking', 'religion', 'consultingType'],
        3: ['mbti', 'strength', 'interest', 'dateType'],
        4: ['faceImageData', 'bodyImageData', 'employImageData'],
        5: ['counterpartAge', 'counterpartAcademic', 'counterpartJob', 'counterpartIncome', 'counterpartHowWork', 'counterpartHeight', 'counterpartBodyType', 'counterpartStyle', 'counterpartHaveCar', 'counterpartHaveHouse', 'counterpartDrinkingFrequency', 'counterpartSmoking', 'counterpartTattoo', 'counterpartReligion']
    };

    const [form, setForm] = useState(1);
    const nextForm = () => {
        const currentRequiredFields = requiredFields[form];
        const missingFields = currentRequiredFields
            .filter(field => !userData[field])
            .map(field => fieldTranslations[field]);

        if (missingFields.length > 0) {
            alert(`${missingFields.join(', ')} 항목을 입력해주세요!`);
        } else {
            setForm(form + 1);
            window.scrollTo(0, 0);
        }
    };
    // const nextForm = () => {
    //     setForm(form + 1);
    // }
    const prevForm = () => {
        setForm(form - 1);
    }

    useEffect(() => {
        console.log(userData.residence)
    }, [userData])

    switch (form) {
        case 1:
            return <div><ProgressBar progressStatus={1} />
                <div style={{ height: '80px' }} />
                <Form1 onClick={nextForm} backClick={''} setFormData={setFormDataPage1} userData={userData}
                    name={data => setUserData({ ...userData, name: data })}
                    phoneNum={data => setUserData({ ...userData, phoneNum: data })}
                    sex={data => setUserData({ ...userData, sex: data })}
                    yearOfBirth={data => setUserData({ ...userData, yearOfBirth: data })}
                    income={data => setUserData({ ...userData, income: data })}
                    academicCareer={data => setUserData({ ...userData, academicCareer: data })}
                    company={data => setUserData({ ...userData, company: data })}
                    job={data => setUserData({ ...userData, job: data })}
                    jobDetail={data => setUserData({ ...userData, jobDetail: data })}
                    howWork={data => setUserData({ ...userData, howWork: data })}
                    height={data => setUserData({ ...userData, height: data })}
                    bodyType={data => setUserData({ ...userData, bodyType: data })}
                    style={data => setUserData({ ...userData, style: data })}
                /></div>;
        case 2:
            return <div><ProgressBar progressStatus={2} />
                <div style={{ height: '80px' }} />
                <Form2 onClick={nextForm} backClick={prevForm} setFormData={setFormDataPage2} userData={userData}
                    residence={data => setUserData({ ...userData, residence: data })}
                    workPlace={data => setUserData({ ...userData, workPlace: data })}
                    haveCar={data => setUserData({ ...userData, haveCar: data })}
                    haveHouse={data => setUserData({ ...userData, haveHouse: data })}
                    drinkingFrequency={data => setUserData({ ...userData, drinkingFrequency: data })}
                    tattoo={data => setUserData({ ...userData, tattoo: data })}
                    smoking={data => setUserData({ ...userData, smoking: data })}
                    religion={data => setUserData({ ...userData, religion: data })}
                    consultingType={data => setUserData({ ...userData, consultingType: data })}
                /></div>;
        case 3:
            return <div><ProgressBar progressStatus={3} />
                <div style={{ height: '80px' }} />
                <Form3 onClick={nextForm} backClick={prevForm} setFormData={setFormDataPage3} userData={userData}
                    mbti={data => setUserData({ ...userData, mbti: data })}
                    strength={data => setUserData({ ...userData, strength: data })}
                    interest={data => setUserData({ ...userData, interest: data })}
                    dateType={data => setUserData({ ...userData, dateType: data })}
                /></div>;
        case 4:
            return <div><ProgressBar progressStatus={4} />
                <div style={{ height: '80px' }} />
                <Form4 onClick={nextForm} backClick={prevForm} setFormData={setFormDataPage4} userData={userData}
                    faceImageData={data => setUserData({ ...userData, faceImageData: data })}
                    bodyImageData={data => setUserData({ ...userData, bodyImageData: data })}
                    employImageData={data => setUserData({ ...userData, employImageData: data })}
                /></div>;
        case 5:
            return <div><ProgressBar progressStatus={5} />
                <div style={{ height: '80px' }} />
                <Form5 onClick={nextForm} userData={userData} backClick={prevForm} setFormData={setFormDataPage5}
                    counterpartAge={data => setUserData({ ...userData, counterpartAge: data })}
                    counterpartAcademic={data => setUserData({ ...userData, counterpartAcademic: data })}
                    counterpartJob={data => setUserData({ ...userData, counterpartJob: data })}
                    counterpartIncome={data => setUserData({ ...userData, counterpartIncome: data })}
                    counterpartHowWork={data => setUserData({ ...userData, counterpartHowWork: data })}
                    counterpartHeight={data => setUserData({ ...userData, counterpartHeight: data })}
                    counterpartBodyType={data => setUserData({ ...userData, counterpartBodyType: data })}
                    counterpartStyle={data => setUserData({ ...userData, counterpartStyle: data })}
                    counterpartHaveCar={data => setUserData({ ...userData, counterpartHaveCar: data })}
                    counterpartHaveHouse={data => setUserData({ ...userData, counterpartHaveHouse: data })}
                    counterpartDrinkingFrequency={data => setUserData({ ...userData, counterpartDrinkingFrequency: data })}
                    counterpartSmoking={data => setUserData({ ...userData, counterpartSmoking: data })}
                    counterpartTattoo={data => setUserData({ ...userData, counterpartTattoo: data })}
                    counterpartReligion={data => setUserData({ ...userData, counterpartReligion: data })}
                /></div>;
        case 6:
            return <div><FormDone name={userData.name} onClick={nextForm} /></div>;
    }
}
