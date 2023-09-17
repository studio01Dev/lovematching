import Button from "../../component/input/button";
import InputCheckbox from "../../component/input/input_checkbox";
import InputRadioNotMatter from "../../component/input/input_radio_notMatter";
import InputRange from "../../component/input/input_range";
import ProgressBar from "../../component/input/progressBar"
import { Link } from "react-router-dom";

export default function Form5() {
    return (
        <div>
            <ProgressBar />
            <div className="h3 b padding">원하는 상대방을 알려주세요</div>
            <div class="valign gap12 margin40">
                <div className="h4 b grey700 side-padding">기본 정보</div>
                <div class="valign gap32">
                    <InputCheckbox labelText='나이'/>
                    <InputCheckbox labelText='학력'/>
                    <InputCheckbox labelText='직종'/>
                    <InputRange labelText='연소득 (단위: 만 원)' placeholder1='최소' placeholder2='최대'/>
                    <InputCheckbox labelText='근무 형태'/>
                    <InputCheckbox labelText='키'/>
                    <InputCheckbox labelText='체형'/>
                    <InputCheckbox labelText='스타일'/>
                </div>
            </div>
            <div class="valign gap12">
                <div className="h4 b grey700 side-padding">라이프스타일</div>
                <div class="valign gap32 margin">
                    <InputRadioNotMatter labelText='자차 보유 여부' value1='있음' value2='없음'/>
                    <InputRadioNotMatter labelText='자가 보유 여부' value1='있음' value2='없음'/>
                    <InputCheckbox labelText='음주 횟수'/>
                    <InputRadioNotMatter labelText='흡연 여부' value1='있음' value2='없음'/>
                    <InputRadioNotMatter labelText='문신 여부' value1='있음' value2='없음'/>
                    <InputCheckbox labelText='종교'/>
                </div>
            </div>
            <Link to='../done'><Button buttonText='신청 완료하기' /></Link>
        </div>
    );
}
