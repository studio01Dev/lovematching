import React, { useState, useEffect } from 'react';
import upload from '../../asset/images/upload.png';
import check from '../../asset/images/brand-check.svg'

export default function Upload({ labelText, dataToForm, defaultValue }) {
  const [image, setImage] = useState(defaultValue);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    dataToForm(file);
  };

  const [uploaded, setUploaded] = useState(false)
  const [text, setText] = useState('아직 업로드되지 않음');

  useEffect(() => {
    if (image !== undefined) {
      setText('이미지 업로드됨')
    } else {
      setText('이미지 업로드되지 않음')
    }
  })

  useEffect(() => {
    if (image !== undefined) {
      setUploaded(true)
    } else {
      setUploaded(false)
    }
  }, [image])

  return (
    <div className="input-comp">
      <div className="h6 m grey500">{labelText}</div>
      <label>
        {
          uploaded
            ?
            <div className='image-success'>
              <div className="input-container halign gap4 calign sbalign">
                <input
                  type="file"
                  id="img"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <div htmlFor="img" className='h5 r brand500'>{text}</div>
                <img style={{ width: '20px' }} src={check} alt="Upload" />
              </div>
            </div>
            :
            <div className="input">
              <div className="input-container halign gap4 calign sbalign">
                <input
                  type="file"
                  id="img"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <div htmlFor="img" className='h5 r grey700'>{text}</div>
                <img style={{ width: '20px' }} src={upload} alt="Upload" />
              </div>
            </div>
        }
      </label>
    </div>
  );
}
