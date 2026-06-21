'use client';

// import { usePathname } from 'next/navigation';
// import logo from '../../asset/images/logo.svg';
// import { useFormTest } from '../../context/FormTestContext';
// import { isSajuCustomer } from '@/domain/models/birthDate';
import '../header/header.css';

export default function Header() {
  // const pathname = usePathname();
  // const formTest = useFormTest();
  // const showTestTools =
  //   process.env.NODE_ENV === 'development' &&
  //   pathname === '/form' &&
  //   formTest;
  // const isSaju = formTest?.devUserData ? isSajuCustomer(formTest.devUserData) : false;

  return (
    <div>
      <header>
        <div className="header">
          <div className="halign sb gap4">
            <div className="h5 sb">LoveMatching</div>
          </div>
          {/* {showTestTools && (
            <div className="header-dev-tools halign gap4 calign">
              <span className={`header-saju-hint h6 sb ${isSaju ? 'is-saju' : 'is-not-saju'}`}>
                사주 {isSaju ? 'O' : 'X'}
              </span>
              <button
                type="button"
                className="header-test-button h6 sb brand500"
                onClick={formTest.fillCurrentPage}
              >
                테스트 값 넣기
              </button>
            </div>
          )} */}
        </div>
      </header>
      <div style={{ height: 60 }}></div>
    </div>
  );
}
