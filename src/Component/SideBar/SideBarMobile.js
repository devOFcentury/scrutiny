import React, {useRef, forwardRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './SideBarMobile.css'


const SideBarMobile = forwardRef(({dataSideBar, shouldBeDisplay, setShouldBeDisplay, logout}, ref) => {

     const sideBarMobileRef= useRef();

     useEffect(() => {
          if(shouldBeDisplay){
               sideBarMobileRef.current.style.width = '35%';
               sideBarMobileRef.current.style.position = 'absolute';
          }
          else{
               sideBarMobileRef.current.style.width = '0%';
          }
     }, [shouldBeDisplay])

     const hideSideBar = () => setShouldBeDisplay(!shouldBeDisplay);
     
  return (
    <div className='SideBarMobile' ref={sideBarMobileRef}>
          <div className='cross' onClick={hideSideBar}>&times;</div>
          
          <div className="SideBarMobile__Link">
               {
                    dataSideBar.map((data, index) => (
                         <Link to={data.path} onClick={hideSideBar} className='nav__Link mb-3' key={index}>
                              {data.title}
                         </Link>
                    ))
               }

               <div onClick={logout}>
                    <p>Logout</p>
               </div>
          </div>
          

    </div>
  )
})



export default SideBarMobile