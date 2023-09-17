import '../input/input.css';

export default function InfoCard({dataName, value}) {
    return(
    <div className='valign gap4'>
        <div className='h6 sb grey500'>{dataName}</div>
        <div className='h5 m grey700'>{value}</div>
        <div></div>
    </div>
    );
}