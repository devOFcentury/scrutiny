import React, {useRef, forwardRef} from 'react';
import { Link } from 'react-router-dom';
import './SideBarMobile.css'


const SideBarMobile = forwardRef(({dataSideBar}, ref) => {

     const hideSideBar = () => {
          ref.current.style.width = '0%';
     }
     
  return (
    <div className='SideBarMobile' ref={ref}>
          <div className='cross' onClick={hideSideBar}>&times;</div>
          
          <div className="SideBarMobile__Link">
               {
                    dataSideBar.map((data, index) => (
                         <Link to={data.path} onClick={hideSideBar} className='nav__Link' key={index}>
                              {data.title}
                         </Link>
                    ))
               }
          </div>
          

    </div>
  )
})



export default SideBarMobile