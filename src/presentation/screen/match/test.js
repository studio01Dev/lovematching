import { Link } from "react-router-dom";
import "./main.css"

export default function Test() {
    return (
        <div style={{ height: "40vh" }}>
            <Link to='../form'><div className="selection">신청하기</div></Link>
            <Link to='../input-code'><div className="selection">매칭 확인하기</div></Link>
        </div>
    );
}