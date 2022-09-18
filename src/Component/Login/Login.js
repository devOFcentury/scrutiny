import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import greenSpaceImg from "../../assets/images/greenSpace.png";
import logo from "../../assets/images/logo.png";
import "./Login.css"

const Login = () => {

  const navigate = useNavigate();


  const initialData = {
    email: '',
    password: '',
  }

  const [error, setError] = useState("");
  const [loading, setLoading] = useState( false);

  const [data, setData] = useState(initialData);

  const {email, password} = data

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if(!navigator.onLine) {
      return setError("Vérifier votre connexion internet");
    }

    if (email === "" || password === "") {
      return setError("Veuillez remplir les champs vides");
    }

    if (password.length < 6) {
      return setError("Mot de passe court (au moins 6 caracteres)");
    }


    try {
      setError('')
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      navigate('/admin');
      
    } catch (err) {
      setLoading(false)
      if(err.code === 'auth/invalid-email'){
        return setError(`L'adresse email est invalide !`)
      }
      if(err.code === 'auth/user-not-found'){
        return setError('Utilisateur introuvable !')
      }
      if(err.code === 'auth/wrong-password'){
        return setError('Email ou Mot de passe incorrecte')
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
                    <div className="mb-3">
                      <input 
                        type="text"
                        className='login-name'
                        placeholder='Login'
                        name='email'
                        value={email}
                        onChange={handleChange}  
                      />
                    </div>

                    <div className="mb-3">
                      <input 
                        type="password" 
                        className='login-password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3 space-between">
                      <label className='signin-label'>
                        <span className='label-text'>remember me</span>
                        <input type="checkbox" className='login-checkbox' />
                        <span className="checkmark"></span>
                      </label>

                      <Link to='/forgotpassword' className='link-forgot-password' >forgot password ?</Link>
                    </div>

                    <button className='signin-button'>
                      {
                        loading ? 'Login in progress...' : 'Login'
                      } 
                    </button>

                </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login