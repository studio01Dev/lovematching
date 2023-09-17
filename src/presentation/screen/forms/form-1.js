import InputText from "../../component/input/input_text";
import InputTel from "../../component/input/input_tel";
import InputRadio from "../../component/input/input_radio";
import InputNumber from "../../component/input/input_number"
import Select from "../../component/input/select";
import Button from "../../component/input/button";
import ProgressBar from "../../component/input/progressBar"
import { Link } from "react-router-dom";

export default function Form1() {
    return (
        <div>
            <ProgressBar />
            <div className="h3 b padding">기본 정보를 작성해주세요</div>
            <div class="valign gap32 margin">
                <InputText labelText='성함' placeholder='성함을 입력해주세요'/>
                <InputTel labelText='연락처' placeholder='연락처를 입력해주세요'/>
                <InputRadio labelText='성별' value1='남자' value2='여자'/>
                <InputNumber labelText='출생연도 (예. 1990 / 숫자 외 입력 불가)' placeholder='출생연도를 입력해주세요.'/>
                <InputNumber labelText='연소득 (단위: 만 원, 세전 연봉 / 숫자 외 입력 불가)' placeholder='연소득을 입력해주세요.'/>
                <InputText labelText='직장명' placeholder='직장명을 입력해주세요'/>
                <InputText labelText='상세직종 (예. 경영지원팀 / 대리)' placeholder='직장명을 입력해주세요'/>
                <Select labelText='근무 형태' placeholder='근무 형태를 입력해주세요'/>
                <InputNumber labelText='키 (단위: cm)' placeholder='키를 입력해주세요.'/>
                <Select labelText='체형' placeholder='체형을 입력해주세요'/>
                <Select labelText='스타일' placeholder='스타일을 입력해주세요'/>
            </div>
            <Link to='../2'><Button buttonText='다음으로' /></Link>
        </div>
    );
}
