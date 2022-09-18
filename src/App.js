import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from './Component/Admin/Dashboard/Admin';
import Login from './Component/Login/Login';
import Signup from './Component/Signup/Signup';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';

import './App.css';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Navigate to='/login'/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/admin/*' element={<Admin />} />
        </Routes>
    </div>
  );
}

export default App;
