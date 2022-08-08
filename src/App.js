import SideBar from './Component/SideBar/SideBarWeb';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from './Component/Admin/Admin';
import './App.css';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Navigate to='/login'/>} />
          <Route path='admin/*' element={<Admin />} />
        </Routes>
    </div>
  );
}

export default App;
