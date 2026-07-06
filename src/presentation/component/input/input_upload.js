import React, { useState, useEffect } from 'react';
import upload from '../../asset/images/upload.png';
import check from '../../asset/images/brand-check.svg'

const PHOTO_MIME_TYPES = ['image/jpeg', 'image/png'];
const DEFAULT_ACCEPT = '.jpg,.jpeg,.png,.svg';
const PHOTO_ACCEPT = 'image/jpeg,image/png,.jpg,.jpeg,.png';

export default function Upload({ labelText, dataToForm, defaultValue, inputRef, inputId = 'img', photoOnly = false }) {
  const [image, setImage] = useState(defaultValue);
  const accept = photoOnly ? PHOTO_ACCEPT : DEFAULT_ACCEPT;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (photoOnly && !PHOTO_MIME_TYPES.includes(file.type)) {
      alert('jpg, jpeg, png 사진만 업로드할 수 있어요.');
      e.target.value = '';
      return;
    }

    setImage(file);
    dataToForm(file);
  };

  const [uploaded, setUploaded] = useState(false)
  const [text, setText] = useState('아직 업로드되지 않음');

  useEffect(() => {
    if (image !== undefined) {
      setText('업로드됨')
    } else {
      setText('아직 업로드되지 않음')
    }
  }, [image])

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
                  ref={inputRef}
                  id={inputId}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  accept={accept}
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
                  ref={inputRef}
                  id={inputId}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                  accept={accept}
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
