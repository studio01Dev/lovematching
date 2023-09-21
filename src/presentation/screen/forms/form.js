import ProgressBar from "../../component/input/progressBar";
import Form1 from "./form-1";
import Form2 from "./form-2";
import Form3 from "./form-3";
import Form4 from "./form-4";
import Form5 from "./form-5";
import FormDone from "./formDone";
import { useState, useEffect } from "react"; // Import useEffect
import User from "../../../domain/models/user";

export default function Form() {
    const newConsumer = new User();
    const [userData, setUserData] = useState(newConsumer);
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const [form, setForm] = useState(1);

    const nextForm = () => {
        setForm(form + 1);
    }

    switch (form) {
        case 1:
            return <div><ProgressBar progressStatus={1} />
                <div style={{ height: '80px' }} />
                <Form1 onClick={nextForm}
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
                <Form2 onClick={nextForm}
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
                <Form3 onClick={nextForm}
                    mbti={data => setUserData({ ...userData, mbti: data })}
                    strength={data => setUserData({ ...userData, strength: data })}
                    interest={data => setUserData({ ...userData, interest: data })}
                    dateType={data => setUserData({ ...userData, dateType: data })}
                /></div>;
        case 4:
            return <div><ProgressBar progressStatus={4} />
                <div style={{ height: '80px' }} />
                <Form4 onClick={nextForm}
                    faceImageData={data => setUserData({ ...userData, faceImageData: data })}
                    bodyImageData={data => setUserData({ ...userData, bodyImageData: data })}
                    employImageData={data => setUserData({ ...userData, employImageData: data })}
                /></div>;
        case 5:
            return <div><ProgressBar progressStatus={5} />
                <div style={{ height: '80px' }} />
                <Form5 onClick={nextForm} userData={userData}
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
