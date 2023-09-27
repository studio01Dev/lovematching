import React, { useState } from 'react';
import Button from "../../component/input/button";
import InputText from "../../component/input/input_text";
import { Link, useNavigate } from "react-router-dom";
import response from '../../../domain/models/MyResponse';
import InputCodeUseCase from '../../../domain/use_cases/inputCode_usecase';

export default function InputCode() {
    // InputText에서 입력값을 저장할 상태 변수
    const [code, setCode] = useState('');
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 함수 가져오기

    // InputText의 값을 변경할 때 호출되는 함수
    const handleCodeChange = (value) => {
        setCode(value);
    }

    // 버튼 클릭 시 조건 검사 후 페이지 이동
    const handleButtonClick = async () => {
        try {
            const inputCodeUseCase = new InputCodeUseCase();
            var response = await inputCodeUseCase.validateUser(code);
            if (response.success === true) {
                if(response.data === 'absence') {
                    alert(response.message)
                } else {
                    if(response.data === 'not-consulting-time') {
                        alert(response.message)
                    } else {
                        const uid = response.data
                        navigate(`../queue/${uid}`); // 특정 조건을 만족할 때 페이지 이동   
                    }
                    
                }
            } else {
                // 조건을 만족하지 않을 때 처리
                alert(response.message);
            }
        } catch(error) {
            console.error(error);
        }
    }

    return(
        <div>
            <div className="padding pt40 h3 b grey900">상담 때 안내 받은<br/>코드를 입력해주세요</div>
            <div className="valign gap20">
                <InputText labelText='코드' dataToForm={handleCodeChange} />
                {/* <div className="side-padding">
                    <button className="text-back h6 sb grey700">이전으로 돌아가기</button>
                </div> */}
                {code && <p>입력한 코드: {code}</p>} {/* 코드가 입력되었을 때만 표시 */}
            </div>
            <Button buttonText='러브매칭 이용하기' onClick={handleButtonClick} />
            {/* <Link to='../queue'><Button buttonText='러브매칭 이용하기'/></Link> */}
        </div>
    );
}