import React, {useState, useEffect} from 'react';
import {collection, getDocs, updateDoc, doc} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import {BsFillTelephoneFill} from 'react-icons/bs'
import './pointMeForm.css';

const PointMeForm = () => {

     const [phoneNumber, setPhoneNumber] = useState("");
     const [error, setError] = useState("");
     const [loading, setLoading] = useState(false);

     const handleChange = e => {
          setError("");
          if(/^[0-9]*$/.test(e.target.value) && e.target.value.length < 10) {
               setPhoneNumber(e.target.value);
          }
          else {
               return 0;
          } 
     }
     
     const handleSubmit = async e => {
          e.preventDefault();
          setLoading(true);
          const newDate = new Date();
          const date = newDate.getDate();
          const month = newDate.getMonth();
          const year = newDate.getFullYear();
          const dateLocale = new Date().toLocaleDateString('en-US');
          // cela mettra en format 24 heures au lieu de 12 heures(AM/PM)
          const heureLocale =  new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
          // on destructure le tableau en mettant l'heure dans h et les minutes dans m
          const [h, m] = heureLocale.split(':');
          const hour = Number(h);
          const minutes = Number(m);
          const HourInminutes = hour * 60;
          const totalMinutes = HourInminutes + minutes;
          const ecart =  totalMinutes - 480;

          if(totalMinutes < 360 || totalMinutes > 1080){
               setLoading(false);
               setPhoneNumber("");
               return setError("Vous ne pouvez pas pointer à cette heure");
          }

          function datas(cummul) {
               return  ecart > 0 ? {
                    date: `${month + 1}/${date}/${year}`,
                    heures: heureLocale,
                    pointage: 'ok',
                    retard: Math.abs(ecart),
                    cummul: Number(cummul) + Math.abs(ecart)
               } : {
                    date: `${month + 1}/${date}/${year}`,
                    heures: heureLocale,
                    pointage: 'ok',
               };
          }
          
          // on recupère tous les données des employers et des admins et on les met dans le tableau allElements avec la méthode push
          const allElements = [];

          const querySnapshotEmployers = await getDocs(collection(db, "employers"));
          querySnapshotEmployers.forEach((doc) => {
               allElements.push({...doc.data(), id: doc.id})
          });

          const querySnapshotAdmins = await getDocs(collection(db, "admins"));
          querySnapshotAdmins.forEach((doc) => {
               allElements.push({...doc.data(), id: doc.id})
          });
          
          const noNumber = [];
          const pointOk = [];
          allElements.forEach(async obj => {
               if(obj.type === "admin" || obj.type === "employer"){
                    if(obj.telephone === phoneNumber){
                         if(obj.pointage === 'ok'){
                              pointOk.push(obj.pointage);
                              return null;
                         }
                         noNumber.push(obj.telephone);
                         if(obj.type === 'admin'){
                              const docRef = doc(db, "admins", obj.id);
                              await updateDoc(docRef, datas(obj.cummul));
                         }
                         else{
                              const docRef = doc(db, "employers", obj.id);
                              await updateDoc(docRef, datas(obj.cummul));
                         }
                    }
               }
          });

          if(pointOk.length !== 0){
               setLoading(false);
               setPhoneNumber('');
               return setError("Ce numéro a déjà pointé !!!");
          }

          if(noNumber.length === 0){
               setLoading(false);
               setPhoneNumber('');
               return setError("Ce numéro n'existe pas !!!");
          }

          setPhoneNumber('');
          setLoading(false);

     }

     const disabled = phoneNumber === '';

  return (
     <>
          <form className='pointMeForm-form' onSubmit={handleSubmit}>
               <h2 className='pointMeForm-h2'>Point Me</h2>
               <p className='pointMeForm-para'>Employers / admin</p>
               {
                    error && <div className='bg-danger text-center rounded mx-4 py-2'>{error}</div>
               }
               <div className="my-2 container-input">
                    <div className="pointMeForm-input-icon">
                         <i className="pointMeForm-icon">
                              <BsFillTelephoneFill  size={20}/>
                         </i>
                         <input 
                              type="tel"
                              className='pointMeForm-input' 
                              placeholder='777777777'
                              pattern="^(77|78|70|76)[0-9]{3}[0-9]{2}[0-9]{2}"
                              value={phoneNumber}
                              onChange={handleChange}
                         />
                    </div>
                    <button className='pointMeForm-button' disabled={disabled}>
                         {
                              loading ? <div className="loading"></div> : 'Point me'
                         }
                    </button>
               </div>
          </form>
     </>
  )
}

export default PointMeForm