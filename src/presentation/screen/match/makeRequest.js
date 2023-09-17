import people from '../../asset/images/people.svg'
import arrow from '../../asset/images/back.png'
import { Link } from 'react-router-dom';
import ListItem from '../../component/input/list-item';
import sampleImage from '../../asset/images/sampleImage.png'

export default function MakeRequest({ name }) {
    return (
        <div>

            <div className="arrow-back">
                <Link style={{ textDecoration: 'none' }} to='../queue'><img src={arrow} style={{ width: '8px', height: '16px' }} /></Link>
            </div>


            {/* 님의 프로필 부분 */}
            <div class="valign padding gap8">
                <div className='h3 b grey900'>{name}님의 프로필</div>

                {/* carousel 부분 */}
                <div class="slider-wrapper">
                    <div className='slider halign gap20'>
                        <img id='slide-1' src={sampleImage} />
                        <img id='slide-2' src={sampleImage} />
                    </div>
                </div>


            </div>

        </div>
    );
}