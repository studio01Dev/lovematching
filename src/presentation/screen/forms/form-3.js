import Select from "../../component/input/select";
import Button from "../../component/input/button";
import InputText from "../../component/input/input_text";
import ProgressBar from "../../component/input/progressBar"
import { Link } from "react-router-dom";

export default function Form3() {
    return (
        <div>
            <ProgressBar />
            <div className="h3 b padding">성격을 작성해주세요</div>
            <div class="valign gap32 margin">
                <Select labelText='MBTI' placeholder='MBTI를 선택해주세요'/>
                <InputText labelText='매력 (예. 좋은 피부와 밝은 성격, 자기관리 등 )' placeholder='회원님의 내적, 외적 매력을 입력해주세요'/>
                <InputText labelText='취미/관심사' placeholder='취미나 관심사를 입력해주세요'/>
                <InputText labelText='선호하는 데이트' placeholder='선호하는 데이트를 입력해주세요'/>
            </div>
            <Link to='../4'><Button buttonText='다음으로'/></Link>
        </div>
    );
}
