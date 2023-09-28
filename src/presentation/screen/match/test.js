import { useState } from "react";
import testEnrollUserUseCase from '../../../domain/use_cases/_test_enrollUser_usecase'
import { Link } from "react-router-dom";

export default function Test() {
    const [name, setName] = useState('')
    const [phoneNum, setPhoneNum] = useState('')



    const handleClick = () => {
        const user = {name, phoneNum}
        testEnrollUserUseCase(user)
    }



    return (
        <div>
            {/* <Child dataToForm={smth1 => setName(smth1)}/>
            <Child dataToForm={smth2 => setPhoneNum(smth2)}/>


            <button onClick={handleClick}>button</button> */}



            <Link to='../form'><button>신청하기</button></Link>
            <Link to='../input-code'><button>매칭 확인하기</button></Link>
        </div>
    );
}


export function Child({dataToForm}) {
    return(
        <input style={{ border: '1px solid black' }} type="text" onChange={e => dataToForm(e.target.value)} />
    );
}