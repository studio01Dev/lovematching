import Button from "../../component/input/button";
import Upload from "../../component/input/upload";

export default function Form4({ onClick, faceImageData, bodyImageData, employImageData }) {
    return (
        <div>
            <div class="valign gap8 padding">
                <div className="h3 b">사진을 업로드해주세요</div>
                <div className="h5 m grey600">1년 이내에 촬영한 사진을,<br />
                    png, jpg, jpeg 형식으로 업로드 해주세요</div>
            </div>
            <div class="valign gap32 margin">
                <Upload labelText='인생샷 얼굴 사진(정면권장)' dataToForm={data => faceImageData(data)} />
                <Upload labelText='인생샷 전신 사진' dataToForm={data => bodyImageData(data)} />
                <Upload labelText='재직 증명 사진' dataToForm={data => employImageData(data)} />
            </div>
            <div style={{ height: '80px' }} />
            <Button buttonText='다음으로' onClick={onClick} />
        </div>
    );
}
