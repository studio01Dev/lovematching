import React, { useState } from 'react';
import upload from '../../asset/images/upload.png';

export default function Upload({ labelText, dataToForm }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // if (file) {
    //   const imageUrl = URL.createObjectURL(file);
    //   setSelectedImage(imageUrl);
    // }
    dataToForm(file)
  };

  return (
    <div className="input-comp">
      <div className="h6 m grey500">{labelText}</div>
      <label>
        <div className="input">
          <div className="input-container halign gap4 calign sbalign">
            <input
              type="file"
              id="img"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <div htmlFor="img">아직 업로드되지 않음</div>
            <img style={{ width: '20px' }} src={upload} alt="Upload" />
          </div>
        </div>
      </label>
    </div>
  );
}
