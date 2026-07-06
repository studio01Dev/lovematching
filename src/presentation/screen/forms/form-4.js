import Button from "../../component/button/button";
import Upload from "../../component/input/input_upload";
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
                <div className="h5 m grey600">1년 이내에 촬영한 사진으로<br />
                    png, jpg, jpeg 형식으로 업로드 해주세요<br />
                    (*생성형 AI, 과도한 보정사진 제출 시 가입 반려)</div>
            </div>
            <div class="valign gap32 margin">
                <Upload labelText='인생샷 얼굴 사진(정면권장)' dataToForm={data => faceImageData(data)} defaultValue={userData.faceImageData} />
                <Upload labelText='인생샷 전신 사진' dataToForm={data => bodyImageData(data)} defaultValue={userData.bodyImageData} />
                <Upload
                    labelText={
                        <>
                            재직증명서 사진<br />
                            (재직증명서, 명함 등 제출 가입 시 증명 용도로만 활용됩니다.)
                        </>
                    }
                    dataToForm={data => employImageData(data)}
                    defaultValue={userData.employImageData}
                />
            </div>
            <div style={{ height: '80px' }} />
            <Button buttonText='다음으로' backText={'뒤로가기'} onClick={onClick} backClick={backClick} />
        </div>
    );
}