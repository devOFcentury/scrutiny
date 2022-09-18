import React, {useState, useEffect, Fragment} from 'react';
import { createUserWithEmailAndPassword, updateCurrentUser } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';

import './AjoutMembre.css';

const AjoutMembre = ({setAddMember}) => {

     const initialData = {
          lastName: '',
          firstName: '',
          email: '',
          type: '',
          status: '',
          telephone: '',
          password: '',
          confirmPassword: ''
     }

     const adminCurrentUser = auth.currentUser;

     const [error, setError] = useState("");
     const [success, setSuccess] = useState("");
     const [loading, setLoading] = useState( false);


     const [data, setData] = useState(initialData);
     const {lastName, firstName, email, type, status, telephone, password, confirmPassword} = data;

     useEffect(() => {
       
          if(type === "admin"){
               setData({...data, status: ''});
          }
      
     }, [type])
     

     const handleChange = (e) => {
          setError("");
          setSuccess("");
                  
          if(e.target.name === "telephone") {
               if(/^[0-9]*$/.test(e.target.value) && e.target.value.length < 10) {
                    setData({...data, [e.target.name]: e.target.value});
               }
               else {
                    return 0;
               }
          }

          if(type === 'admin'){
               setData({...data, status: ''});
          }
          
          setData({...data, [e.target.name]: e.target.value});
     }



     const handleSubmit = async e => {
          e.preventDefault();
          setLoading(true);



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
          const noEmail = [];
          allElements.forEach(obj => {
               if(obj.type === 'admin' || obj.type === 'employer'){
                    if(obj.email === email){
                         noEmail.push(obj.email)
                    }
                    if(obj.telephone === telephone){
                         noNumber.push(obj.telephone);
                    }
               }
          })

          if (noEmail.length !== 0) {
               setLoading(false);
               return setError("L'adresse e-mail fournie est déjà utilisée par un utilisateur existant !")
          }
          
          if (noNumber.length !== 0) {
               setLoading(false);
               return setError("Le numéro de téléphone fourni est déjà utilisée par un utilisateur existant !")
          }
     
         
          

          if (type === "admin") {
               if (password.length < 6) {
                    setLoading(false)
                    return setError("Mot de passe court (au moins 6 caracteres)");
               }
               if (password !== confirmPassword) {
                    setLoading(false)
                    return setError("Les mots de passe doivent correspondre !");
               }
          }


          try {
               setLoading(true);
               setError("");

               if(type === "admin")
                    await createUserWithEmailAndPassword(auth, email, password);

               await updateCurrentUser(auth, adminCurrentUser);

               const user ={
                    firstName,
                    lastName,
                    email,
                    type,
                    telephone,
                    absences: 0,
                    cummul: 0,
                    date: "",
                    heures: "",
                    pointage: "",
                    retard: 0,
               } 


               if(type === "admin")
                    await addDoc(collection(db, "admins"), {...user, password: password})
               else
                    await addDoc(collection(db, "employers"), {...user, status: status,})


               setSuccess("Ajout reussi !");
               setData(initialData);
               
          } catch (err) {
               setLoading(false);
               if (err.code === "auth/email-already-in-use")
                    return setError(`L'adresse e-mail fournie est déjà utilisée par un utilisateur existant !`);
               if (err.code === "auth/invalid-email")
                    return setError(`L'adresse email est invalide !`);
               if (err.code === "auth/wrong-password")
                    return setError("Email ou Mot de passe incorrecte");
          }

          setLoading(false);
     }

  return (
    <div className='overlay'>
          <div className="modal-form">
               <div className='AjoutMembre-cross' onClick={()=> setAddMember(false)}>&times;</div>
               <form onSubmit={handleSubmit} className="AjoutMembre-form">
                    <h3 className='text-center mb-3'>Ajouter un Membre</h3>
                    {
                         error !== '' &&
                         <div 
                              className="mb-3 border border-danger p-2 rounded text-center text-danger" 
                              style={{width: '85%', margin: '0px auto'}}
                         >
                              {error}
                         </div> 
                    }
                    {
                         success !== '' &&
                         <div
                              className="mb-3 border border-success p-2 rounded text-center text-success"
                              style={{width: '85%', margin: '0px auto'}}
                         >
                              {success}
                         </div> 
                    }
                    <div className="mb-3">
                         <input 
                         type="text"
                         className='AjoutMembre-text'
                         placeholder='Last name'
                         name='lastName'
                         value={lastName}
                         onChange={handleChange}
                         required
                         />
                    </div>

                    <div className="mb-3">
                         <input 
                         type="text" 
                         className='AjoutMembre-text'
                         placeholder='First name' 
                         name='firstName'
                         value={firstName}
                         onChange={handleChange}
                         required
                         />
                    </div>

                    <div className="mb-3">
                         <input 
                         type="email" 
                         className='AjoutMembre-email'
                         placeholder='Email'
                         name='email'
                         value={email}
                         onChange={handleChange}
                         required
                         />
                    </div>

                    <div className="mb-3">
                         <select
                              className='AjoutMembre-type'
                              name='type'
                              value={type}
                              onChange={handleChange}
                              required
                         >
                              <option value="" disabled>Selectionnnez le type</option>
                              <option value="admin">Admin</option>
                              <option value="employer">Employers</option>
                         </select>
                    </div>

                    {
                         type === 'employer' &&
                         <div className="mb-3">
                              <input 
                                   type="text"
                                   placeholder='Statut'
                                   name="status" 
                                   className="AjoutMembre-status"
                                   value={status}
                                   onChange={handleChange}
                                   required
                              />
                         </div>
                    }
                    
                    <div className="mb-3">
                         <input
                         type="tel"
                         className='AjoutMembre-tel'
                         placeholder='777777777'
                         pattern="^(77|78|70|76)[0-9]{3}[0-9]{2}[0-9]{2}"
                         name='telephone'
                         value={telephone}
                         onChange={handleChange}
                         required
                         />
                    </div>

                    {
                         type === 'admin' &&
                         <Fragment>
                              <div className="mb-3">
                                   <input
                                   type="password"
                                   className='AjoutMembre-password'
                                   placeholder='Password'
                                   name='password'
                                   value={password}
                                   onChange={handleChange}
                                   required
                                   />
                              </div>

                              <div className="mb-3">
                                   <input 
                                   type="password" 
                                   className='AjoutMembre-password'
                                   placeholder='Confirm password' 
                                   name='confirmPassword'
                                   value={confirmPassword}
                                   onChange={handleChange}
                                   required
                                   />
                              </div>
                         </Fragment>
                    }



                    <button className='AjoutMembre-button'>
                         {
                              loading ? 'Checking in progress...': 'Add'
                         }
                    </button>    

               </form>
          </div>
    </div>
  )
}

export default AjoutMembre;