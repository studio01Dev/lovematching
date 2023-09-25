import Button from "../../component/input/button";
import InputCheckbox from "../../component/input/input_checkbox";
import InputRadio from "../../component/input/input_radio";
import EnrollUserUseCase from "../../../domain/use_cases/enrollUser_usecase";
import testEnrollUserUseCase from "../../../domain/use_cases/_test_enrollUser_usecase";
import React from 'react';


export default function Form5({ userData, onClick, backClick, counterpartAcademic, counterpartAge, counterpartBodyType, counterpartDrinkingFrequency, counterpartHaveCar, counterpartHaveHouse, counterpartHeight, counterpartHowWork, counterpartIncome, counterpartJob, counterpartReligion, counterpartSmoking, counterpartStyle, counterpartTattoo }) {
    return (
        <div>
            <div className="h3 b padding">원하는 상대방을 알려주세요</div>
            <div class="valign gap12 margin40">
                <div className="h4 b grey700 side-padding">기본 정보</div>
                <div class="valign gap32">
                    <InputCheckbox labelText='나이' values={['20~25', '26~30', '31~35', '36~40']} dataToForm={data => counterpartAge(data)} />
                    <InputCheckbox labelText='학력' values={['고졸 이하', '전문대', '4년제 대학', '해외 대학', '석사', '박사']} dataToForm={data => counterpartAcademic(data)} />
                    <InputCheckbox labelText='직종' values={['전문직', '대기업', '중견기업', '중소기업', '공무원', '자영업', '공기업', '연구소', '스타트업', '프리랜서', '외국계']} dataToForm={data => counterpartJob(data)} />
                    <InputCheckbox labelText='연소득 (단위: 만 원)' values={['1,000~2,000', '2,000~3,000', '3,000~4,000', '4,000~5,000', '5,000~6,000','6,000~7,000','8,000 이상']} dataToForm={data => counterpartIncome(data)} />
                    <InputCheckbox labelText='근무 형태' values={['주 5일', '교대근무']} dataToForm={data => counterpartHowWork(data)} />
                    <InputCheckbox labelText='키' values={['145~150', '151~155', '156~160', '161~165', '166~170', '171~175', '176~180', '181~185', '186~190']} dataToForm={data => counterpartHeight(data)} />
                    <InputCheckbox labelText='체형' values={['마름', '날씬', '보통', '통통', '근육질']} dataToForm={data => counterpartBodyType(data)} />
                    <InputCheckbox labelText='스타일' values={['귀여움', '지적임', '듬직함', '평범함', '건강미', '청순함', '세련됨', '선한 인상']} dataToForm={data => counterpartStyle(data)} />
                </div>
            </div>
            <div class="valign gap12">
                <div className="h4 b grey700 side-padding">라이프스타일</div>
                <div class="valign gap32 margin">
                    <InputRadio name='counterpartHaveCar' id1='counterpartCarYes' id2='counterpartCarNo' labelText='자차 보유 여부' value1='있음' value2='없음' dataToForm={data => counterpartHaveCar(data)} defaultValue={userData.counterpartHaveCar}/>
                    <InputRadio name='counterpartHaveHouse' id1='counterpartHouseYes' id2='counterpartHouseNo' labelText='자가 보유 여부' value1='있음' value2='없음' dataToForm={data => counterpartHaveHouse(data)} defaultValue={userData.counterpartHaveHouse}/>
                    <InputCheckbox labelText='음주 횟수' values={['주 4회 이상', '주 2~3회', '월 2~4회', '월 1회 이하', '마시지 않음']} dataToForm={data => counterpartDrinkingFrequency(data)} />
                    <InputRadio name='counterpartSmoking' id1='counterpartSmokingYes' id2='counterpartSmokingNo' labelText='흡연 여부' value1='흡연' value2='비흡연' dataToForm={data => counterpartSmoking(data)} defaultValue={userData.counterpartSmoking}/>
                    <InputRadio name='counterpartTattoo' id1='counterpartTattooYes' id2='counterpartTattooNo' labelText='문신 여부' value1='있음' value2='없음' dataToForm={data => counterpartTattoo(data)} defaultValue={userData.counterpartTattoo}/>
                    <InputCheckbox labelText='종교' values={['무교', '기독교', '천주교', '불교', '기타']} dataToForm={data => counterpartReligion(data)} />
                </div>
            </div>
            <div style={{ height: '80px' }} />
            <Button buttonText='신청 완료하기' onClick={() => {  EnrollUserUseCase(userData); onClick(); }} backClick={backClick}/>
        </div>
    );
}
