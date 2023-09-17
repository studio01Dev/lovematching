import Button from "../../component/input/button";
import Upload from "../../component/input/upload";
import ProgressBar from "../../component/input/progressBar"
import { Link } from "react-router-dom";

export default function Form4() {
    return (
        <div>
            <ProgressBar />
            <div class="valign gap8 padding">
                <div className="h3 b">사진을 업로드해주세요</div>
                <div className="h5 m grey600">1년 이내에 촬영한 사진을,<br />
                    png, jpg, jpeg 형식으로 업로드 해주세요</div>
            </div>
            <div class="valign gap32 margin">
                <Upload labelText='인생샷 얼굴 사진(정면권장)'/>
                <Upload labelText='인생샷 전신 사진'/>
                <Upload labelText='재직 증명 사진'/>
            </div>
            <Link to='../5'><Button buttonText='다음으로' /></Link>
        </div>
    );
}
