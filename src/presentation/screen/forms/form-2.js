import InputRadio from "../../component/input/input_radio";
import Select from "../../component/input/select";
import Button from "../../component/input/button";
import InputArea from "../../component/input/input-area";
import InputCheckbox from "../../component/input/input_checkbox";

export default function Form2({ residence, workPlace, onClick, haveCar, haveHouse, drinkingFrequency, tattoo, smoking, religion, consultingType }) {
    return (
        <div>
            <div className="h3 b padding">라이프스타일을 작성해주세요</div>
            <div class="valign gap32 margin">
                <InputArea labelText1='거주지 (도)' labelText2='거주지 (시·군·구)' dataToForm={data => residence(data)} />
                <InputArea labelText1='근무지 (도)' labelText2='근무지 (시·군·구)' dataToForm={data => workPlace(data)} />
                <InputRadio name='haveCar' labelText='자차 보유 여부' id1='carYes' id2='carNo' value1='있음' value2='없음' dataToForm={data => haveCar(data)} />
                <InputRadio name='haveHouse' labelText='자가 보유 여부' id1='houseYes' id2='houseNo' value1='있음' value2='없음' dataToForm={data => haveHouse(data)} />
                <Select labelText='음주 횟수' values={['주 4회 이상', '주 2~3회', '월 2~4회', '월 1회 이하', '마시지 않음']} dataToForm={data => drinkingFrequency(data)} />
                <InputRadio name='tattoo' labelText='문신 여부' id1='tattooYes' id2='tattooNo' value1='있음' value2='없음' dataToForm={data => tattoo(data)} />
                <InputRadio name='smoking' labelText='흡연 여부' id1='smokingYes' id2='smokingNo' value1='흡연' value2='없음' dataToForm={data => smoking(data)} />
                <Select labelText='종교' values={['무교', '기독교', '천주교', '불교', '기타(직접입력)']} dataToForm={data => religion(data)} />
                <InputCheckbox labelText='선호하는 상담 방법' values={['카카오톡', '통화', '오프라인 상담']} number='3' dataToForm={data => consultingType(data)} />
            </div>
            <div style={{ height: '80px' }} />
            <Button buttonText='다음으로' onClick={onClick} />
        </div>
    );
}
