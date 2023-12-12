import InputText from "../../component/input/input_text";
import InputTel from "../../component/input/input_tel";
import InputRadio from "../../component/input/input_radio";
import InputNumber from "../../component/input/input_number"
import Select from "../../component/input/select";
import Button from "../../component/input/button";
import InputIncome from "../../component/input/input_income";
import InputCheckbox from "../../component/input/input_checkbox";
import { useRef, useEffect } from "react";


export default function Form1({ userData, view, onClick, firstEmptyField, name, phoneNum, sex, yearOfBirth, income, academicCareer, company, job, jobDetail, howWork, height, bodyType, style }) {
    const toHome = () => {
        window.location.href = 'https://www.lovematching.kr/';
    }

    const inputRef = {
        name: useRef(),
        phoneNum: useRef(),
        yearOfBirth: useRef(),
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
                <InputIncome inputRef={inputRef.income} labelText='연소득 (단위: 만 원, 세전 연봉 / 숫자 외 입력 불가)' placeholder='연소득을 입력해주세요.' dataToForm={data => income(data)} defaultValue={userData.income} />
                <Select displayNotMatter={'none'} inputRef={inputRef.academicCareer} labelText='최종 학력' values={['고졸 이하', '전문대', '4년제대학', '해외대학', '석사', '박사']} dataToForm={data => academicCareer(data)} defaultValue={userData.academicCareer} />
                <Select displayNotMatter={'none'} inputRef={inputRef.job} labelText='직장 유형' values={['전문직', '보건/의료직(전문직 외)', '대기업', '중견기업', '중소기업/스타트업', '공무원', '자영업', '공기업', '연구소', '스타트업', '프리랜서', '외국계']} dataToForm={data => job(data)} defaultValue={userData.job} />
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
