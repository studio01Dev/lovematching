import React from 'react';
import './loading_dialog.css'; // 스타일 파일을 불러옵니다.

function LoadingDialog() {
  return (
    <div className="loading-dialog">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default LoadingDialog;