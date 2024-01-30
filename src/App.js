// import CSS for all components
import './presentation/asset/App.css';
// import router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
            <Route index element={<Test />} />
            <Route path='/form' element={<Form />} />
            <Route path='/input-code' element={<InputCode />} />
            <Route path='/queue/:uid' element={<Queue />} />
            <Route path='/view-request/:uid' element={<ViewRequest />} />
            <Route path='/review-request/:uid' element={<ReviewRequest />} />
            <Route path='/make-request/:uid/:counterId' element={<MakeRequest />} />
            <Route path='/approve-request/:uid/:counterId' element={<ApproveRequest />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div style={{ height: '100px' }}></div>
    </div>
  );
}

export default App;