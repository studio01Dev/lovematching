import people from '../../asset/images/people.svg'
import arrow from '../../asset/images/back.png'
import { Link } from 'react-router-dom';
import ListItem from '../../component/input/list-item';

export default function ViewRequest({ suggestList }) {
    return (
        <div>

            <div className="arrow-back">
                <Link style={{ textDecoration: 'none' }} to='../queue'><img src={arrow} style={{ width: '8px', height: '16px' }} /></Link>
            </div>


            {/* 내가 매칭 신청하기 부분 */}
            <div class="valign padding gap8">

                <div className='halign sbalign'>
                    <div className='h3 b grey900'>내가 매칭 신청하기</div>
                    <div class="halign calign gap2">
                        <img src={people} style={{ width: '20px' }} />
                        <div className='h6 sb brand500'>{suggestList}6</div>
                    </div>
                </div>

                <div className='h5 m grey600'>
                    프로필 카드를 클릭하면,<br />
                    해당 유저에게 매칭 신청을 할 수 있어요
                </div>

            </div>


            <div class="valign gap20 padding">
                <Link style={{ textDecoration: 'none' }} to='../make-request'><ListItem name='변범수' age='23' residence='서울 성북구' job='자영업' mbti='INTJ'/></Link>
                <Link style={{ textDecoration: 'none' }} to='../make-request'><ListItem name='변범수' age='23' residence='서울 성북구' job='자영업' mbti='INTJ'/></Link>
                <Link style={{ textDecoration: 'none' }} to='../make-request'><ListItem name='변범수' age='23' residence='서울 성북구' job='자영업' mbti='INTJ'/></Link>
                <Link style={{ textDecoration: 'none' }} to='../make-request'><ListItem name='변범수' age='23' residence='서울 성북구' job='자영업' mbti='INTJ'/></Link>

            </div>

        </div>
    );
}