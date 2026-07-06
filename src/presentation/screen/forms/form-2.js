import InputRadio from "../../component/input/input_radio";
import Select from "../../component/input/input_select";
import Button from "../../component/button/button";
import InputAreaCheckbox from "../../component/input/input_area_checkbox";
// import InputCheckbox from "../../component/input/input_checkbox";
import Upload from "../../component/input/input_upload";
import { useRef, useEffect } from "react";
import { drinkingFrequency as drinkingFrequencyOptions } from "../../../domain/models/questionnaires";

export default function Form2({ firstEmptyField, userData, residence, workPlace, onClick, backClick, haveCar, haveHouse, houseProofImageData, drinkingFrequency, tattoo, smoking, religion }) {

    const inputRef = {
        residence: useRef(),
        workPlace: useRef(),
        haveCar: useRef(),
        haveHouse: useRef(),
        houseProofImageData: useRef(),
        drinkingFrequency: useRef(),
        tattoo: useRef(),
        smoking: useRef(),
        religion: useRef(),
        // consultingType: useRef(),
      };

    useEffect(() => {
        if (inputRef[firstEmptyField] && inputRef[firstEmptyField].current) {
            inputRef[firstEmptyField].current.focus();
        }
    }, [firstEmptyField]);

    const showHouseProof = userData.haveHouse === '있음';

    return (
        <div>
            <div className="h3 b padding">라이프스타일을 작성해주세요</div>
            <div className="valign gap32 margin">
                <InputAreaCheckbox namePrefix="residence" labelText1='거주지 (도)' labelText2='거주지 (시·군·구)' dataToForm={data => residence(data)} defaultValue={userData.residence} inputRef={inputRef.residence} />
                <InputAreaCheckbox namePrefix="workPlace" labelText1='근무지 (도)' labelText2='근무지 (시·군·구)' dataToForm={data => workPlace(data)} defaultValue={userData.workPlace} inputRef={inputRef.workPlace} />
                <InputRadio displayNotMatter='none' name='haveCar' labelText='자차 보유 여부' id1='carYes' id2='carNo' value1='있음' value2='없음' dataToForm={data => haveCar(data)} defaultValue={userData.haveCar} />
                <InputRadio displayNotMatter='none' name='haveHouse' labelText='자가 보유 여부' id1='houseYes' id2='houseNo' value1='있음' value2='없음' dataToForm={data => haveHouse(data)} defaultValue={userData.haveHouse} />
                {showHouseProof && (
                    <Upload
                        labelText='자가 보유 증빙 서류'
                        dataToForm={data => houseProofImageData(data)}
                        defaultValue={userData.houseProofImageData}
                        inputRef={inputRef.houseProofImageData}
                        inputId="houseProofImage"
                        photoOnly
                    />
                )}
                <Select displayNotMatter={'none'} labelText='음주 횟수' values={drinkingFrequencyOptions} dataToForm={data => drinkingFrequency(data)} defaultValue={userData.drinkingFrequency} />
                <InputRadio displayNotMatter='none' name='tattoo' labelText='문신 여부' id1='tattooYes' id2='tattooNo' value1='있음' value2='없음' dataToForm={data => tattoo(data)} defaultValue={userData.tattoo} />
                <InputRadio displayNotMatter='none' name='smoking' labelText='흡연 여부' id1='smokingYes' id2='smokingNo' value1='흡연' value2='비흡연' dataToForm={data => smoking(data)} defaultValue={userData.smoking} />
                <Select displayNotMatter={'none'} labelText='종교' values={['무교', '기독교', '천주교', '불교', '기타']} dataToForm={data => religion(data)}  defaultValue={userData.religion}/>
                {/* <InputCheckbox displayNotMatter={'block'} labelText='선호하는 상담 방법' values={['카카오톡', '통화', '오프라인 상담']} number='3' dataToForm={data => consultingType(data)} defaultValue={userData.consultingType} /> */}
            </div>
            <div style={{ height: '80px' }} />
            <Button buttonText='다음으로' backText={'뒤로가기'} onClick={onClick} backClick={backClick} />
        </div>
    );
}
