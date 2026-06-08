'use client';

import { usePathname } from 'next/navigation';
import logo from '../../asset/images/logo.svg';
import { useFormTest } from '../../context/FormTestContext';
import '../header/header.css';

export default function Header() {
  const pathname = usePathname();
  const formTest = useFormTest();
  const showTestButton =
    process.env.NODE_ENV === 'development' &&
    pathname === '/form' &&
    formTest;

  return (
    <div>
      <header>
        <div className="header">
          <div className="halign sb gap4">
            <img src={logo} style={{ width: '24px', height: '24px' }} alt="" />
            <div className="h5 sb">LoveMatching</div>
          </div>
          {showTestButton && (
            <button
              type="button"
              className="header-test-button h6 sb brand500"
              onClick={formTest.fillCurrentPage}
            >
              테스트 값 넣기
            </button>
          )}
        </div>
      </header>
      <div style={{ height: 60 }}></div>
    </div>
  );
}
