import React, {useState, useEffect} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, addDoc, getDoc, setDoc} from "firebase/firestore"
import {auth, db} from "../../firebaseConfig" 
import { Link, useNavigate } from 'react-router-dom';
import greenSpaceImg from "../../assets/images/greenSpace.png";
import logo from "../../assets/images/logo.png";
import "./Signup.css";

const Signup = () => {

  const navigate = useNavigate();

  const initialData = {
    lastName: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState( false);

  const [adminStatus, setadminStatus] = useState("");

  let superAdmin = false;

  const [data, setData] = useState(initialData);

  const {lastName, firstName, email, password, confirmPassword} = data;


  useEffect(() => {
    const getSuperAdmin = async () => {
      const docSnap = await getDoc(doc(db, "admins", "superadmin"));
      if (docSnap.exists()) {
        // Convert to admin object
        const admin = docSnap.data();
        setadminStatus(admin.status)
        // Use a admin instance method
        // console.log(admin.toString());
      } 
      // else {
        
      // }
      // querySnapshot.forEach((doc) => {
      //   setAuth(
      //     querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      //   );
      // });
    };
    getSuperAdmin();
  }, [])
  

  const handleChange = (e) => {
      setData({...data, [e.target.name]: e.target.value});
  }


  

  const handeSubmit = async (e) => {
    e.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return setError("Veuillez remplir les champs vides");
    }

    if (password.length < 6) {
      return setError("Mot de passe court (au moins 6 caracteres)");
    }
    if (password !== confirmPassword) {
      return setError("Les mots de passe doivent correspondre !");
    }

    try {

      setLoading(true);
      setError("");
      if(adminStatus === "superadmin") {
        superAdmin = true;
      }

      if(superAdmin) {
        setLoading(false);
        setData(initialData);
        return setError("Impossible d'avoir un autre admin !");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "admins", "superadmin"), {
          firstName,
          lastName,
          email,
          password,
          status: 'superadmin'
        });

        setSuccess("Inscription reussie !");

        setTimeout(() => {
          navigate("/login");
        }, 1500);

      }
      
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/email-already-in-use") {
        return setError(
          `L'adresse e-mail fournie est déjà utilisée par un utilisateur existant !`
        );
      }
      if (err.code === "auth/invalid-email") {
        return setError(
          `La valeur fournie pour la propriété d'utilisateur de email n'est pas valide !`
        );
      }
    }
    
    setLoading(false);
  }


  return (
    <div className='container-fluid'>
        <div className="row">
          <div className="col-12 col-lg-6 p-0 image-part">
            <img src={greenSpaceImg} className='greenSpace' alt="espace vert" />
          </div>
          <div className=" col-12 col-lg-6 p-0 form-part d-flex align-items-center justify-content-center">
            <div className="signup ">
                <div className="signup__logo">
                  <img src={logo} alt="logo" />
                </div>
                <h1 className='text-center'>Sign up</h1>
                <p className='text-center'>Sign up and start managing your candidates</p>
                <form onSubmit={handeSubmit}>
                    {
                      error !== '' &&
                      <div className="mb-3 border border-danger p-2 rounded text-center text-danger">
                        {error}
                        <span className=''>veuillez recharger la page si vous avez déjà changer d'identifiant</span>
                      </div> 
                    }
                    {
                      success !== '' &&
                      <div className="mb-3 border border-success p-2 rounded text-center text-success">
                        {success}
                      </div> 
                    }
                    <div className="mb-3">
                      <input 
                        type="text" 
                        placeholder='Last name'
                        name='lastName'
                        value={lastName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <input 
                        type="text" 
                        placeholder='First name' 
                        name='firstName'
                        value={firstName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <input 
                        type="email" 
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <input 
                        type="password" 
                        placeholder='Confirm password' 
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                      />
                    </div>

                    <button className='signup-button'>
                      {
                        loading ? 'Checking in progress...': 'Sign up'
                      }
                    </button>
                    <Link className='route-to-login' to='/login'>Sign in</Link>

                </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Signup



// import React from 'react';
// import '../Signup/Signup.css';

// const Signup = () => {
//   return (
//     <div>Signup</div>
//   )
// }

// export default Signup