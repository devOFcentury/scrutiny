import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import greenSpaceImg from "../../assets/images/greenSpace.png";
import logo from "../../assets/images/logo.png";
import './ForgotPassword.css'

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  

  const handleSubmit = async e => {
    e.preventDefault();
      
    try {
      setError("");
      setSuccess("");
      await sendPasswordResetEmail(auth, email);
      setSuccess(`Consultez votre email ${email} pour changer le mot de passe`);
      setEmail("");

      setTimeout(() => {
        navigate("/login")
      }, 5000);

    } catch (err) {
      setError(err);
      setEmail("");
    }
   
  }

  const disabled = email === "";

  
  return (
    <div className='container-fluid'>
        <div className="row">
          <div className="col-12 col-lg-6 p-0 image-part">
            <img src={greenSpaceImg} className='greenSpace' alt="espace vert" />
          </div>
          <div className=" col-12 col-lg-6 p-0 form-part d-flex align-items-center justify-content-center">
            <div className="signin ">
                <div className="signin__logo">
                  <img src={logo} alt="logo" />
                </div>
                <h1 className='text-center'>Sign in</h1>
                <p className='text-center'>Sign ing and start managing your candidates</p>
                <form onSubmit={handleSubmit}>
                    {
                      error !== '' &&
                      <div className="mb-3 border border-danger p-2 rounded text-center text-danger">
                        {error}
                        
                      </div> 
                    }
                    {
                      success !== '' &&
                      <div className="mb-3 border border-success p-2 rounded text-center text-success">
                        {success}
                      </div> 
                    }
                    <h4 className='text-center mb-3'>MOT DE PASSE OUBLIÉ</h4>
                    <div className="mb-3">
                      <input 
                        type="text" 
                        className='forgotPassword-email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <button className={`signin-button ${disabled && `button-forgotPassword-disabled`}`} disabled={disabled}>Recuperer</button>
                    <Link to='/login' className='route-to-login'>Déjà inscrit ? Connectez-vous</Link>
                </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login




// import React from 'react'

// const ForgotPassword = () => {
//   return (
//     <div>ForgotPassword</div>
//   )
// }

// export default ForgotPassword