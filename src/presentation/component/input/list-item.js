import sampleImage from '../../asset/images/sampleImage.png'

export default function ListItem({name, age, mbti, residence, job, source}) {
    return (
        <div className="item-container">
            <img style={{ minWidth: '100px', minHeight: '100px', maxWidth: '100px', maxHeight: '100px', borderRadius: '4px 0 0 4px', objectFit: 'cover' }} src={source}/>
            <div className='detail-container valign gap4'>
                <div className='halign gap8 calign'>
                    <div className='h4 b grey800'>{name}</div>
                    <div className='h6 sb brand500'>({age}세, {mbti})</div>
                </div>
                <div className='detail-grid'>
                    <div className='valign'>
                        <div className='h6 m grey500'>거주지</div>
                        <div className='h6 sb grey700'>{residence}</div>
                    </div>
                    <div className='valign'>
                        <div className='h6 m grey500'>직종</div>
                        <div className='h6 sb grey700'>{job}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}