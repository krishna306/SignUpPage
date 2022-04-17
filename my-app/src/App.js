// import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import Registration from './components/Registration';
import Emailforotp from './components/Emailforotp';

import Submitotp from './components/Submitotp';
// import { Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div className='App'>
      <Registration />
      <Emailforotp />
      <Submitotp />
      <Login/>
        {/* <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Routes> */}
  </div>
  );
}

export default App;
