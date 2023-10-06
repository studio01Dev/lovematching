import Button from "../../component/input/button";
import Doodle from "../../asset/images/LovingDoodle.svg"
import info from "../../asset/images/info.svg"

export default function FormDone({name}) {
    return (
        <div>
            <div class="valign calign">
                <img src={Doodle} style={{
                    padding: '60px 20px 20px 20px',
                    width: '200px',
                    transform: 'translateX(-10px)'
                }}/>
                <div className="valign gap8 text-calign padding">
                    <div className="h5 m main500">신청 완료!</div>
                    <div className="h3 b grey900">{name}님,<br />좋은 분을 찾아드릴게요!</div>
                </div>
                <div className="padding">
                    <div className="message gap8">
                        <div className="halign gap4 calign">
                            <img src={info} style={{ width: '18px' }}/>
                            <div className="h6 sb brand500">사용 방법</div>
                        </div>
                        <ul>
                            <li>러브매칭 매니저가 회원님께 꼭 맞는 인연을 찾고, 상대방의 프로필 카드를 보내드려요.</li>
                            <li>프로필 카드를 보고, 매칭을 수락하거나 거절할 수 있어요.</li>
                            <li>작성한 개인 정보는 외부에 절대 유출되지 않아요.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ height: '80px' }} />
            <button className='main-button' style={{ width: '350px' }} onClick={''}>
                <div className="h5 sb">홈으로 돌아가기</div>
            </button>
        </div>
    );
}
