import './presentation/asset/App.css';
// import MUI
import { Container, Input } from '@mui/material';
// import screens

// import components
import Header from './presentation/component/header/header'
import InputRadio from './presentation/component/input/input_radio'
import InputText from './presentation/component/input/input_text'
import Select from './presentation/component/input/select';
import InputNumber from './presentation/component/input/input_number';
import InputCheckbox from './presentation/component/input/input_checkbox';
import InputCheckboxNotMatter from './presentation/component/input/input_checkbox_notMatter';
import Textarea from './presentation/component/input/textarea'



function App() {
  console.clear();
  return (
    <Container disableGutters>
      <Header />
      <div style={{ height: 60 }}></div>
      <InputRadio labelText='성별' name='sex' value1='남성' value2='여성'/>
      <InputText labelText='idk' placeholder='입력 ㄱㄱ'/>
      <Select labelText='idk' placeholder='입력 ㄱㄱ' />
      <InputNumber labelText='idk' placeholder='숫자 입력 ㄱㄱ' />
      <InputCheckbox labelText='성별'/>
      <InputCheckboxNotMatter labelText='몰라' value='상관없음'/>
      <Textarea labelText='몰라' />
    </Container>
  );
}


export default App;