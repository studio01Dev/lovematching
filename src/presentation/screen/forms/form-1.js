import InputText from "../../component/input/input_text";
import InputTel from "../../component/input/input_tel";
import InputRadio from "../../component/input/input_radio";
import InputNumber from "../../component/input/input_number"
import Select from "../../component/input/input_select";
import Button from "../../component/button/button";
import InputIncome from "../../component/input/input_income";
import InputCheckbox from "../../component/input/input_checkbox";
import { useRef, useEffect } from "react";

const monthOptions = Array.from({ length: 12 }, (_, index) => String(index + 1));
const dayOptions = Array.from({ length: 31 }, (_, index) => String(index + 1));
const hourOptions = Array.from({ length: 24 }, (_, index) => String(index));
const minuteOptions = Array.from({ length: 60 }, (_, index) => String(index));


export default function Form1({ userData, view, onClick, firstEmptyField, name, phoneNum, sex, yearOfBirth, birthMonth, birthDay, birthHour, birthMinute, birthCalendarType, income, academicCareer, company, job, jobDetail, howWork, height, bodyType, style }) {
    const toHome = () => {
        window.location.href = 'https://www.lovematching.kr/';
    }

    const inputRef = {
        name: useRef(),
        phoneNum: useRef(),
        yearOfBirth: useRef(),
        birthMonth: useRef(),
        birthDay: useRef(),
        birthHour: useRef(),
        birthMinute: useRef(),
        birthCalendarType: useRef(),
        income: useRef(),
        academicCareer: useRef(),
        company: useRef(),
        job: useRef(),
        jobDetail: useRef(),
        howWork: useRef(),
        height: useRef(),
        bodyType: useRef(),
        style: useRef(),
    };

    useEffect(() => {
        if (inputRef[firstEmptyField] && inputRef[firstEmptyField].current) {
            inputRef[firstEmptyField].current.focus();
        }
    }, [firstEmptyField]);

    useEffect(() => {
        // console.log(userData.income)
    }, [userData.income])

    return (
        <div style={{ display: `${view}` }}>
            <div className="h3 b padding">기본 정보를 작성해주세요</div>
            <div class="valign gap32 margin">
                <InputText inputRef={inputRef.name} labelText='성함' placeholder='성함을 입력해주세요' dataToForm={data => name(data)} defaultValue={userData.name} />
                <InputTel inputRef={inputRef.phoneNum} labelText='연락처' placeholder='연락처를 입력해주세요' dataToForm={data => phoneNum(data)} defaultValue={userData.phoneNum} />
                <InputRadio inputRef={inputRef.sex} displayNotMatter='none' labelText='성별' name='sex' id1='male' id2='female' value1='남성' value2='여성' dataToForm={data => sex(data)} defaultValue={userData.sex} />
                <InputNumber inputRef={inputRef.yearOfBirth} maxDigit={4} labelText='출생연도 (예. 1990 / 숫자 외 입력 불가)' placeholder='출생연도를 입력해주세요.' dataToForm={data => yearOfBirth(data)} defaultValue={userData.yearOfBirth} />
                <div className="birth-date-row">
                    <Select displayNotMatter={'none'} inputRef={inputRef.birthMonth} labelText='월' values={monthOptions} dataToForm={data => birthMonth(data)} defaultValue={userData.birthMonth} />
                    <Select displayNotMatter={'none'} inputRef={inputRef.birthDay} labelText='일' values={dayOptions} dataToForm={data => birthDay(data)} defaultValue={userData.birthDay} />
                </div>
                <div className="birth-time-section">
                    <div className="birth-time-notice h6 m brand500">사주소개팅 상품을 구매하신 분만 양력·음력과 시·분을 입력해 주세요.</div>
                    <InputRadio allowDeselect inputRef={inputRef.birthCalendarType} displayNotMatter='none' labelText='양력·음력 (선택)' name='birthCalendarType' id1='solarCalendar' id2='lunarCalendar' value1='양력' value2='음력' dataToForm={data => birthCalendarType(data || undefined)} defaultValue={userData.birthCalendarType} />
                    <div className="birth-date-row">
                        <Select displayNotMatter={'none'} inputRef={inputRef.birthHour} labelText='시' values={hourOptions} dataToForm={data => birthHour(data || undefined)} defaultValue={userData.birthHour ?? ''} />
                        <Select displayNotMatter={'none'} inputRef={inputRef.birthMinute} labelText='분' values={minuteOptions} dataToForm={data => birthMinute(data || undefined)} defaultValue={userData.birthMinute ?? ''} />
                    </div>
                </div>
                <InputIncome inputRef={inputRef.income} labelText='연소득 (단위: 만 원, 세전 연봉 / 숫자 외 입력 불가)' placeholder='연소득을 입력해주세요.' dataToForm={data => income(data)} defaultValue={userData.income} />
                <Select displayNotMatter={'none'} inputRef={inputRef.academicCareer} labelText='최종 학력' values={['고졸 이하', '전문대', '4년제대학', '해외대학', '석사', '박사']} dataToForm={data => academicCareer(data)} defaultValue={userData.academicCareer} />
                <Select displayNotMatter={'none'} inputRef={inputRef.job} labelText='직장 유형' values={['전문직', '보건/의료직(전문직 외)', '대기업', '중견기업', '중소기업/스타트업', '공무원', '자영업', '공기업', '연구소', '프리랜서', '외국계']} dataToForm={data => job(data)} defaultValue={userData.job} />
                <InputText inputRef={inputRef.company} labelText='직장명' placeholder='직장명을 입력해주세요' dataToForm={data => company(data)} defaultValue={userData.company} />
                <InputText inputRef={inputRef.jobDetail} labelText='상세직종 (예. 경영지원팀 / 대리)' placeholder='직장명을 입력해주세요' dataToForm={data => jobDetail(data)} defaultValue={userData.jobDetail} />
                <Select displayNotMatter={'none'} inputRef={inputRef.howWork} labelText='근무 형태' values={['주 5일', '교대근무', '기타']} dataToForm={data => howWork(data)} defaultValue={userData.howWork} />
                <InputNumber inputRef={inputRef.height} maxDigit={3} labelText='키 (단위: cm)' placeholder='키를 입력해주세요.' dataToForm={data => height(data)} defaultValue={userData.height} />
                <Select displayNotMatter={'none'} inputRef={inputRef.bodyType} labelText='체형' values={['마름', '날씬', '보통', '통통', '근육질']} dataToForm={data => bodyType(data)} defaultValue={userData.bodyType} />
                <InputCheckbox inputRef={inputRef.style} maxValues={2} displayNotMatter={false} labelText='스타일 (최대 2개 선택 가능)' values={['귀여움', '지적임', '듬직함', '평범함', '건강미', '청순함', '세련됨', '선한 인상']} dataToForm={data => style(data)} defaultValue={userData.style} />
            </div>
            <div style={{ height: '80px' }} />
            <Button buttonText='다음으로' backText={'뒤로가기'} onClick={onClick} backClick={toHome} />
        </div>
    );
}
