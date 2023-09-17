import Button from "../../component/input/button";
import InputText from "../../component/input/input_text";
import { Link } from "react-router-dom";

export default function InputCode() {
    return(
        <div>
            <div className="padding pt40 h3 b grey900">상담 때 안내 받은<br/>코드를 입력해주세요</div>
            <div className="valign gap20">
                <InputText labelText='코드'/>
                <div className="side-padding">
                    <button className="text-back h6 sb grey700">이전으로 돌아가기</button>
                </div>
            </div>
            <Link to='../queue'><Button buttonText='러브매칭 이용하기'/></Link>
        </div>
    );
}