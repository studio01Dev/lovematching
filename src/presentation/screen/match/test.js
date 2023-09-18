import ListItem from "../../component/input/list-item";
import InputCode from "./inputCode";
import { Link } from "react-router-dom";

export default function Test() {
    return (
        <div>
            <Link to='../1'><button>신청하기</button></Link>
            <Link to='../input-code'><button>매칭 확인하기</button></Link>
        </div>
    );
}