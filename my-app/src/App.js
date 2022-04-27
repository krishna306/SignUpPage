// import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import Registration from './components/Registration';
import Emailforotp from './components/Emailforotp';
import Nav from './widgets/Nav'
import Submitotp from './components/Submitotp';
import { Routes,Route,Link} from 'react-router-dom';
function App() {
  return (
    <div className='App'>
        <Nav/>
        <Routes>
          <Route path='/submitotp' element={<Submitotp />} />
          <Route path='/emailsend' element={<Emailforotp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
  </div>
  );
}

export default App;
