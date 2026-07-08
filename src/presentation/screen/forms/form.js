import ProgressBar from "../../component/progressBar/progressBar";
import Form1 from "./form-1";
import Form2 from "./form-2";
import Form3 from "./form-3";
import Form4 from "./form-4";
import Form5 from "./form-5";
import FormDone from "./formDone";
import { useState, useEffect, useRef } from "react";
import User from "../../../domain/models/user";
import EnrollUserUseCase from "../../../domain/use_cases/enrollUser_usecase";
import LoadingDialog from "../../component/loading_dialog/loading_dialog";
import { useFormTest } from "../../context/FormTestContext";
import { isValidBirthDate } from "../../../domain/models/birthDate";

export default function Form() {
    const formTest = useFormTest();
    const remountKey = formTest?.remountKey ?? 0;
    const [formDataPage1, setFormDataPage1] = useState({});
    const [formDataPage2, setFormDataPage2] = useState({});
    const [formDataPage3, setFormDataPage3] = useState({});
    const [formDataPage4, setFormDataPage4] = useState({});
    const [formDataPage5, setFormDataPage5] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [firstEmptyField, setFirstEmptyField] = useState(null)
    const [form, setForm] = useState(1);

    const newConsumer = new User();
    const [userData, setUserData] = useState(newConsumer);
    const formRef = useRef(form);
    const userDataRef = useRef(userData);

    formRef.current = form;
    userDataRef.current = userData;

    useEffect(() => {
        if (!formTest?.registerFormApi) {
            return undefined;
        }

        formTest.registerFormApi({
            getForm: () => formRef.current,
            getUserData: () => userDataRef.current,
            setUserData,
        });

        return () => formTest.registerFormApi(null);
    }, [formTest]);

    useEffect(() => {
        formTest?.syncUserData?.(userData);
    }, [formTest, userData]);

    const fieldTranslations = {
        name: '성함',
        phoneNum: '연락처',
        sex: '성별',
        yearOfBirth: '출생연도',
        birthMonth: '월',
        birthDay: '일',
        academicCareer: '최종 학력',
        job: '직장 유형',
        income: '연소득',
        company: '직장명',
        jobDetail: '상세직종',
        howWork: '근무 형태',
        height: '키',
        bodyType: '체형',
        style: '스타일',
        residence: '거주지',
        workPlace: '근무지',
        haveCar: '자차 보유 여부',
        haveHouse: '자가 보유 여부',
        houseProofImageData: '자가 보유 증빙 서류',
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
        employImageData: '재직증명서 사진',
        counterpartAge: '상대방 나이',
        counterpartAcademic: '상대방 최종학력',
        counterpartJob: '상대방 직업',
        counterpartIncome: '상대방 소득',
        counterpartHowWork: '상대방 근무 형태',
        counterpartHeight: '상대방 키',
        counterpartStrength: '상대방 매력',
        counterpartBodyType: '상대방 체형',
        counterpartStyle: '상대방 스타일',
        counterpartHaveCar: '상대방 자차 보유 여부',
        counterpartHaveHouse: '상대방 자가 보유 여부',
        counterpartDrinkingFrequency: '상대방 음주 횟수',
        counterpartSmoking: '상대방 흡연 여부',
        counterpartTattoo: '상대방 문신 여부',
        counterpartReligion: '상대방 종교',
        counterpartResidences: '상대방 거주지',
        counterpartStrength: '원하시는 상대방',
        // consultingType: '선호하는 상담 방법',
    };

    const requiredFields = {
        1: ['name', 'phoneNum', 'yearOfBirth', 'birthMonth', 'birthDay', 'income', 'academicCareer', 'company', 'job', 'jobDetail', 'howWork', 'height', 'bodyType', 'style'],
        2: ['residence', 'workPlace', 'haveCar', 'haveHouse', 'drinkingFrequency', 'tattoo', 'smoking', 'religion'],
        3: ['mbti', 'strength', 'interest', 'dateType'],
        4: ['faceImageData', 'bodyImageData', 'employImageData'],
        5: ['counterpartAge', 'counterpartAcademic', 'counterpartJob', 'counterpartIncome', 'counterpartHowWork', 'counterpartHeight', 'counterpartBodyType', 'counterpartStyle', 'counterpartHaveCar', 'counterpartHaveHouse', 'counterpartDrinkingFrequency', 'counterpartSmoking', 'counterpartTattoo', 'counterpartReligion', 'counterpartStrength']
    };

    // const [users, setUsers] = useState();
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             setIsLoading(true);
    //             const users = [];
    //             const startOfToday = new Date();
    //             startOfToday.setHours(0, 0, 0, 0);

    //             // Create a promise that resolves after 1 second (adjust as needed)
    //             const timeoutPromise = new Promise((resolve) => {
    //                 setTimeout(() => resolve(null), 1000); // 1 second
    //             });

    //             // Use Promise.race to wait for either getDocs or the timeout to resolve
    //             const result = await Promise.race([getDocs(collection(db.db, 'users'), where("createdAt", ">=", startOfToday)), timeoutPromise]);

    //             if (result === null) {
    //                 // Timeout occurred
    //                 console.log('Timeout exceeded. Reloading the page...');
    //                 window.location.reload();
    //             } else {
    //                 // Data was fetched successfully
    //                 result.forEach((doc) => {
    //                     users.push({
    //                         ...doc.data(),
    //                         id: doc.id,
    //                     });
    //                 });

    //                 setUsers(users);
    //                 setIsLoading(false);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching users:", error);
    //             window.location.reload();
    //         }
    //     };

    //     fetchUsers();
    // }, []);

    const isFieldMissing = (field, value) => {
        if (!value || value.length === 0) {
            return true;
        }
        if (field === 'residence' || field === 'workPlace') {
            return !value[0] || !value[1];
        }
        return false;
    };

    const getMissingFields = (page) => {
        const missingFields = requiredFields[page].filter((field) => isFieldMissing(field, userData[field]));

        if (page === 2 && userData.haveHouse === '있음' && isFieldMissing('houseProofImageData', userData.houseProofImageData)) {
            missingFields.push('houseProofImageData');
        }

        return missingFields;
    };

    const nextForm = async () => {
        const missingFields = getMissingFields(form);
        const translateField = missingFields.map(field => fieldTranslations[field]);

        if (form === 1 && missingFields.length === 0 && !isValidBirthDate(userData.yearOfBirth, userData.birthMonth, userData.birthDay)) {
            alert('올바른 생년월일을 입력해주세요.');
            return;
        }

        if (form === 5) {
            if (missingFields.length > 0) {
                alert(`${translateField.join(', ')} 항목을 입력해주세요!`);
                setFirstEmptyField(`${missingFields[0]}`);
            } else {
                try {
                    setIsLoading(true);
                    const response = await EnrollUserUseCase(userData);
                    if (response.success) {
                        setForm(form + 1);
                        window.scrollTo(0, 0);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                        alert('다시 시도해주세요!');
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.log(error);
                }
            }
        } else {
            if (missingFields.length > 0) {
                alert(`${translateField.join(', ')} 항목을 입력해주세요!`);
                setFirstEmptyField(`${missingFields[0]}`);
            } else {
                setForm(form + 1);
                window.scrollTo(0, 0);
            }
        }
    };

    // const nextForm = () => {
    //     setForm(form + 1);
    // }
    const prevForm = () => {
        setForm(form - 1);
    }

    switch (form) {
        case 1:
            return <div>
                {isLoading && <LoadingDialog />}
                {!isLoading && (<div>
                    <ProgressBar progressStatus={1} />
                    <div style={{ height: '80px' }} />
                    <Form1 key={remountKey} onClick={nextForm} backClick={''} setFormData={setFormDataPage1} userData={userData}
                        name={data => setUserData({ ...userData, name: data })}
                        phoneNum={data => setUserData({ ...userData, phoneNum: data })}
                        sex={data => setUserData({ ...userData, sex: data })}
                        yearOfBirth={data => setUserData({ ...userData, yearOfBirth: data })}
                        birthMonth={data => setUserData({ ...userData, birthMonth: data })}
                        birthDay={data => setUserData({ ...userData, birthDay: data })}
                        birthHour={data => setUserData({ ...userData, birthHour: data || undefined })}
                        birthMinute={data => setUserData({ ...userData, birthMinute: data || undefined })}
                        birthCalendarType={data => setUserData({ ...userData, birthCalendarType: data || undefined })}
                        income={data => setUserData({ ...userData, income: data })}
                        academicCareer={data => setUserData({ ...userData, academicCareer: data })}
                        company={data => setUserData({ ...userData, company: data })}
                        job={data => setUserData({ ...userData, job: data })}
                        jobDetail={data => setUserData({ ...userData, jobDetail: data })}
                        howWork={data => setUserData({ ...userData, howWork: data })}
                        height={data => setUserData({ ...userData, height: data })}
                        bodyType={data => setUserData({ ...userData, bodyType: data })}
                        style={data => setUserData({ ...userData, style: data })}
                        firstEmptyField={firstEmptyField}
                    />
                </div>)}
            </div>;
        case 2:
            return <div><ProgressBar progressStatus={2} />
                <div style={{ height: '80px' }} />
                <Form2 key={remountKey} onClick={nextForm} backClick={prevForm} setFormData={setFormDataPage2} userData={userData}
                    residence={data => setUserData({ ...userData, residence: data })}
                    workPlace={data => setUserData({ ...userData, workPlace: data })}
                    haveCar={data => setUserData({ ...userData, haveCar: data })}
                    haveHouse={data => setUserData({
                        ...userData,
                        haveHouse: data,
                        ...(data === '없음' ? { houseProofImageData: undefined } : {}),
                    })}
                    houseProofImageData={data => setUserData({ ...userData, houseProofImageData: data })}
                    drinkingFrequency={data => setUserData({ ...userData, drinkingFrequency: data })}
                    tattoo={data => setUserData({ ...userData, tattoo: data })}
                    smoking={data => setUserData({ ...userData, smoking: data })}
                    religion={data => setUserData({ ...userData, religion: data })}
                    // consultingType={data => setUserData({ ...userData, consultingType: data })}
                    firstEmptyField={firstEmptyField}
                /></div>;
        case 3:
            return <div><ProgressBar progressStatus={3} />
                <div style={{ height: '80px' }} />
                <Form3 key={remountKey} onClick={nextForm} backClick={prevForm} setFormData={setFormDataPage3} userData={userData}
                    mbti={data => setUserData({ ...userData, mbti: data })}
                    strength={data => setUserData({ ...userData, strength: data })}
                    strengthText={data => setUserData({ ...userData, strengthText: data })}
                    interest={data => setUserData({ ...userData, interest: data })}
                    dateType={data => setUserData({ ...userData, dateType: data })}
                    firstEmptyField={firstEmptyField}
                /></div>;
        case 4:
            return <div><ProgressBar progressStatus={4} />
                <div style={{ height: '80px' }} />
                <Form4 key={remountKey} onClick={nextForm} backClick={prevForm} setFormData={setFormDataPage4} userData={userData}
                    faceImageData={data => setUserData({ ...userData, faceImageData: data })}
                    bodyImageData={data => setUserData({ ...userData, bodyImageData: data })}
                    employImageData={data => setUserData({ ...userData, employImageData: data })}
                    firstEmptyField={firstEmptyField}
                /></div>;
        case 5:
            return <div><ProgressBar progressStatus={5} />
                <div style={{ height: '80px' }} />
                <Form5 key={remountKey} isLoading={isLoading} onClick={nextForm} userData={userData} backClick={prevForm} setFormData={setFormDataPage5}
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
                    counterpartStrength={data => setUserData({ ...userData, counterpartStrength: data })}
                    counterpartDrinkingFrequency={data => setUserData({ ...userData, counterpartDrinkingFrequency: data })}
                    counterpartSmoking={data => setUserData({ ...userData, counterpartSmoking: data })}
                    counterpartTattoo={data => setUserData({ ...userData, counterpartTattoo: data })}
                    counterpartReligion={data => setUserData({ ...userData, counterpartReligion: data })}
                    counterpartResidences={data => setUserData({ ...userData, counterpartResidences: data })}
                    firstEmptyField={firstEmptyField}
                /></div>;
        case 6:
            return <div><FormDone name={userData.name} onClick={nextForm} /></div>;
    }
}