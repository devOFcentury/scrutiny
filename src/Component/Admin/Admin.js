import React, {useRef} from 'react';
import { Route, Routes } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi'
import SideBarWeb from '../SideBar/SideBarWeb';
import SideBarMobile from '../SideBar/SideBarMobile';
import {dataSideBar} from "../../RoutesJson/dataSideBar";
import flag from "../../assets/images/flag.png";
import logo from "../../assets/images/logo.png"
import mercedes from "../../assets/images/Ellipse_mercedes.png"
import DashboardAdmin from './DashboardAdmin';
import Retard from './Retard';
import Absences from './Absences';
import './Admin.css'

const Admin = () => {
     const sideBarMobileRef = useRef();
     

     const displaySideBar = (e) => {
          sideBarMobileRef.current.style.width = '35%';
          sideBarMobileRef.current.style.position = 'absolute';
     }
  return (
    <div>
          {/* header */}
          <header className='shadow d-flex  flex-md-row justify-content-md-between align-items-center'>

                    <div className="burger-menu d-md-none align-self-center ms-2">
                         <GiHamburgerMenu size={25} onClick={displaySideBar}  />
                    </div>

                    <div className="logo align-self-center mx-md-0 ms-md-5">
                         <img  src={logo} alt="logo" />
                    </div>
                    <div className="flag d-none d-md-block">
                         <img src={flag} alt="Point me flag" />
                    </div>
                    <div className="status d-none d-md-flex me-md-5">
                         <div className="status__mercedes">
                              <img src={mercedes} alt="mercedes" />
                         </div>
                         <div className="status__info">
                              <p>Vincent COLY</p>
                              <p>Admin</p>
                         </div>
                    </div>
                    
          </header>
     <div className="body d-flex">
          <SideBarWeb dataSideBar={dataSideBar} />
          <SideBarMobile ref={sideBarMobileRef} dataSideBar={dataSideBar} />
          <Routes>
               <Route path='' element={<DashboardAdmin />} />
               <Route path='/retards' element={<Retard/>} />
               <Route path='/absences' element={<Absences/>} />
          </Routes>
     </div>
          
    </div>
  )
}

export default Admin