import React from 'react'
import { NavLink} from 'react-router-dom';
import {signOut} from "firebase/auth";
import {auth} from "../../firebaseConfig"
import {FiLogOut} from 'react-icons/fi'
import './SideBarWeb.css'


const SideBarWeb = ({dataSideBar, logout}) => {

     

  return (
    <div className='SideBarWeb'>
          {
               dataSideBar.map((data, index) => 
                    data.path === '' ? (
                         <NavLink 
                              to={data.path}
                              end 
                              className={({isActive}) =>
                                   isActive ? 'active sideBar__link my-3 d-flex align-items-center ps-md-2 ps-lg-4': 'sideBar__link my-3 d-flex align-items-center ps-md-2 ps-lg-4'
                              } 
                              key={index}
                         >
                              {data.icon}

                              
                              <p>{data.title}</p>
                         </NavLink>
                    ) : (
                         
                         
                              <NavLink 
                              to={data.path} 
                              className={({isActive}) =>
                                   isActive ? `active sideBar__link ${data.path === 'settings' && 'settings'} my-3 d-flex align-items-center ps-md-2 ps-lg-4`: `sideBar__link ${data.path === 'settings' && 'settings'} my-3 d-flex align-items-center ps-md-2 ps-lg-4`
                              } 
                              key={index}
                              >
                                   {data.icon}

                                   {/* <div className="nav-link"> */}
                                        {/* <Link to={data.path} className="nav-link ">{data.title}</Link> */}
                                   {/* </div> */}
                                   <p>{data.title}</p>
                              </NavLink>
                         
                    )
               )
          }

          <div className="logout d-flex align-items-center ps-md-2 ps-lg-4" onClick={logout}>
               <FiLogOut  />
               <p >Logout</p>
          </div>
          
    </div>
  )
}

export default SideBarWeb