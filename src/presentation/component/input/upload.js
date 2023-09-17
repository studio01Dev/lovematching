import '../input/input.css'
import upload from '../../asset/images/upload.png'

export default function Upload({ labelText, image }) {
    return (
        <div class="input-comp">
            <div className='h6 m grey500'>{labelText}</div>
            <label for={image}>
                <div className='input'>
                    <div htmlFor='img' className='input-container halign gap4 calign sbalign'>
                        <input type='file' id='img' value={image} style={{ display: 'none' }}/>
                        <label htmlFor='img'>아직 업로드되지 않음</label>
                        <img htmlFor='img' style={{ width: '20px' }} src={upload}/>
                    </div>
                </div>
            </label>
        </div>
    );
}