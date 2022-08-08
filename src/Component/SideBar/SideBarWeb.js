import React from 'react'
import { Link } from 'react-router-dom';
import './SideBarWeb.css'


const SideBarWeb = ({dataSideBar}) => {
  return (
    <div className='SideBarWeb'>
          {
               dataSideBar.map((data, index) => (
                    <Link to={data.path} className='sideBar__link my-3 d-flex align-items-center ps-md-2 ps-lg-4' key={index}>
                         {data.icon}

                         {/* <div className="nav-link"> */}
                              {/* <Link to={data.path} className="nav-link ">{data.title}</Link> */}
                         {/* </div> */}
                         <p>{data.title}</p>
                    </Link>
               ))
          }
    </div>
  )
}

export default SideBarWeb