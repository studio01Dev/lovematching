// import CSS for all components
import './presentation/asset/App.css';
// import MUI
import { Container } from '@mui/material';
// import router
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Switch, Link, NavLink, useParams } from 'react-router-dom';
// import screens
import Form1 from "../src/presentation/screen/forms/form-1";
import Form2 from "../src/presentation/screen/forms/form-2";
import Form3 from "../src/presentation/screen/forms/form-3";
import Form4 from "../src/presentation/screen/forms/form-4";
import Form5 from "../src/presentation/screen/forms/form-5";
import FormDone from './presentation/screen/forms/formDone';
// import components
import Header from './presentation/component/header/header'
import ViewRequest from './presentation/screen/match/viewRequest'
import Test from './presentation/screen/match/test';
import InputCode from './presentation/screen/match/inputCode';
import Queue from './presentation/screen/match/queue';
import ReviewRequest from './presentation/screen/match/reviewRequest'
import MakeRequest from './presentation/screen/match/makeRequest';
import Profile from './presentation/screen/match/profile'
import ApproveRequest from './presentation/screen/match/approveRequest';
import Form from './presentation/screen/forms/form'

function App() {
  return (
    <div>
      <Header />
      <div style={{ width: '390px', margin: '0 auto' }}>
        <BrowserRouter>
          <Routes>
            {/* <Route index element={<Form />} /> */}
            <Route index element={<InputCode />} />
            <Route path='/input-code' element={<InputCode />} />
            <Route path='/queue' element={<Queue />} />
            <Route path='/view-request' element={<ViewRequest />} />
            <Route path='/review-request' element={<ReviewRequest />} />
            <Route path='/make-request' element={<MakeRequest />} />
            <Route path='/approve-request' element={<ApproveRequest />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;







// <Container disableGutters style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
//   <Header />
//   <div style={{ height: 60 }}></div>
//   <Container>
//     <ProgressBar />
//     <div style={{ height: 60 }}></div>
//     <InputRadio labelText='성별' name='sex' value1='남성' value2='여성'/>
//     <InputText labelText='idk' placeholder='입력 ㄱㄱ'/>
//     <Select labelText='idk' placeholder='입력 ㄱㄱ' />
//     <InputNumber labelText='idk' placeholder='숫자 입력 ㄱㄱ' />
//     <InputTel labelText='idk' placeholder='번호 입력 ㄱㄱ' />
//     <InputCheckbox labelText='성별'/>
//     <InputCheckboxNotMatter labelText='몰라' value='상관없음'/>
//     <Textarea labelText='몰라' />
//     <InputArea labelText='idk' placeholder='입력 ㄱㄱ' />
//   </Container>
// </Container>