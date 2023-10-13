import Button from "../../component/input/button";
import Upload from "../../component/input/upload";
import { useRef, useEffect } from "react";

export default function Form4({ firstEmptyField, userData, onClick, backClick, faceImageData, bodyImageData, employImageData }) {
    const inputRef = {
        faceImageData: useRef(),
        bodyImageData: useRef(),
        employImageData: useRef(),
    };

    useEffect(() => {
        if (inputRef[firstEmptyField] && inputRef[firstEmptyField].current) {
            inputRef[firstEmptyField].current.focus();
        }
    }, [firstEmptyField]);

    return (
        <div>
            <div class="valign gap8 padding">
                <div className="h3 b">사진을 업로드해주세요</div>
                <div className="h5 m grey600">1년 이내에 촬영한 사진을,<br />
                    png, jpg, jpeg 형식으로 업로드 해주세요</div>
            </div>
            <div class="valign gap32 margin">
                <Upload labelText='인생샷 얼굴 사진(정면권장)' dataToForm={data => faceImageData(data)} defaultValue={userData.faceImageData} />
                <Upload labelText='인생샷 전신 사진' dataToForm={data => bodyImageData(data)} defaultValue={userData.bodyImageData} />
                <Upload labelText='재직 증명 사진' dataToForm={data => employImageData(data)} defaultValue={userData.employImageData} />
            </div>
            <div style={{ height: '80px' }} />
            <Button buttonText='다음으로' onClick={onClick} backClick={backClick} />
        </div>
    );
}