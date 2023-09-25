import Select from "../../component/input/select";
import Button from "../../component/input/button";
import InputText from "../../component/input/input_text";

export default function Form3({ userData, onClick, backClick, mbti, strength, interest, dateType }) {
    return (
        <div>
            <div className="h3 b padding">성격을 작성해주세요</div>
            <div class="valign gap32 margin">
                <Select labelText='MBTI' values={['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ']} dataToForm={data => mbti(data)} defaultValue={userData.mbti}/>
                <InputText labelText='매력 (예. 좋은 피부와 밝은 성격, 자기관리 등 )' placeholder='회원님의 내적, 외적 매력을 입력해주세요' dataToForm={data => strength(data)} defaultValue={userData.strength}/>
                <InputText labelText='취미/관심사' placeholder='취미나 관심사를 입력해주세요' dataToForm={data => interest(data)} defaultValue={userData.interest}/>
                <InputText labelText='선호하는 데이트' placeholder='선호하는 데이트를 입력해주세요' dataToForm={data => dateType(data)} defaultValue={userData.dateType}/>
            </div>
            <div style={{ height: '80px' }} />
            <Button buttonText='다음으로' onClick={onClick} backClick={backClick}/>
        </div>
    );
}
