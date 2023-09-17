import '../input/input.css'

export default function InputArea({ district, area }) {
    return (
        <div class="input-comp">
            <div class="area-container">
                <div className='h6 m grey500 valign gap4'>
                    {district}
                    <div className='area-input'>
                        <div className='input-container halign gap4 calign'>
                            <select>
                                <option>서울특별시</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='h6 m grey500 valign gap4'>
                    {area}
                    <div className='area-input'>
                        <div className='input-container halign gap4 calign'>
                            <select>
                                <option>성북구</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}