import React, {useState, useEffect} from 'react';
import { db } from '../../../firebaseConfig';
import {signOut, onAuthStateChanged} from 'firebase/auth';
import {where, onSnapshot, query, collection, getDocs} from "firebase/firestore"
import { auth } from '../../../firebaseConfig';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi'
import SideBarWeb from '../../SideBar/SideBarWeb';
import SideBarMobile from '../../SideBar/SideBarMobile';
import {dataSideBar} from "../../../RoutesJson/dataSideBar";
import flag from "../../../assets/images/flag.png";
import logo from "../../../assets/images/logo.png"
import mercedes from "../../../assets/images/Ellipse_mercedes.png"
import Acceuil from '../Acceuil/Acceuil';
import Retard from '../Retard/Retard';
import Absences from '../Absences/Absences';
import Compteur from '../Compteur/Compteur';
import Settings from '../Settings/Settings';
import './Admin.css'

const Admin = () => {
     // const sideBarMobileRef = useRef();
     const navigate = useNavigate();
     const [shouldBeDisplay, setShouldBeDisplay] = useState(false);
     const [userSession, setUserSession] = useState(null);
     const [userData, setUserData] = useState([]);

     useEffect(() => {
          
          let listener = onAuthStateChanged(auth,user => {
               user ? setUserSession(user) : navigate("/");
          });

          const getUserInfo = async () => {
               const q = query(collection(db, "admins"), where("email", "==", `${userSession.email}`));
               const querySnapshot = await getDocs(q);
               querySnapshot.forEach((doc) => {
               setUserData(
                    querySnapshot.docs.map((doc) => ({ ...doc.data() }))
               )
               });
          }    

          if(!!userSession) {

               getUserInfo();
          }
     
       return () => {
         listener();
       }
     }, [userSession])
     


     const logout = () => {
          signOut(auth)
          .then(() => navigate('/'))
          .catch((err) => console.log('OOOPS une erreur: ' + err));
     }
     

     const displaySideBar = (e) => {
          // sideBarMobileRef.current.style.width = '35%';
          // sideBarMobileRef.current.style.position = 'absolute';
          setShouldBeDisplay(!shouldBeDisplay);
     }
  return userSession === null ? (
     <div className="loading-auth"></div>
  ):
  (
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
                              <p>{userData.length !== 0 ? `${userData[0]?.firstName} ${userData[0]?.lastName}`: 'Loading...'}</p>
                              <p>{userData.length !== 0 ? `${userData[0]?.status}`: 'Loading...'}</p>
                         </div>
                    </div>
                    
          </header>
          <div className="body">
               <SideBarWeb logout={logout} dataSideBar={dataSideBar} />
               <SideBarMobile 
                    logout={logout}
                    shouldBeDisplay={shouldBeDisplay} 
                    setShouldBeDisplay={setShouldBeDisplay} 
                    dataSideBar={dataSideBar}
               />
               <Routes>
                    <Route path='/' element={<Acceuil />} />
                    <Route path='/retards' element={<Retard/>} />
                    <Route path='/absences' element={<Absences/>} />
                    <Route path='/compteur' element={<Compteur/>} />
                    <Route path='/settings' element={<Settings/>} />
                    
               </Routes>
          </div>
          
    </div>
  )
}

export default Admin