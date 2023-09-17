import InputRadio from "../../component/input/input_radio";
import Select from "../../component/input/select";
import Button from "../../component/input/button";
import InputArea from "../../component/input/input-area";
import InputCheckbox from "../../component/input/input_checkbox";
import ProgressBar from "../../component/input/progressBar"
import { Link } from "react-router-dom";

export default function Form2() {
    return (
        <div>
            <ProgressBar />
            <div className="h3 b padding">라이프스타일을 작성해주세요</div>
            <div class="valign gap32 margin">
                <InputArea district='거주지 (도)' area='거주지 (시·군·구)' />
                <InputArea district='근무지 (도)' area='근무지 (시·군·구)' />
                <InputRadio labelText='자차 보유 여부' value1='있음' value2='없음' />
                <InputRadio labelText='자가 보유 여부' value1='있음' value2='없음' />
                <Select labelText='음주 횟수' placeholder='음주 횟수를 선택해주세요' />
                <InputRadio labelText='문신 여부' value1='있음' value2='없음' />
                <Select labelText='종교' placeholder='종교를 입력해주세요' />
                <InputCheckbox labelText='선호하는 상담 방법' />
            </div>
            <Link to='../3'><Button buttonText='다음으로' /></Link>
        </div>
    );
}
