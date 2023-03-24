import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useState } from 'react';
import './Signin.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firebaseError, setFirebaseError] = useState('');

  const [showCheckingText, setShowCheckingText] = useState(false);
  const [showForgotForm, setShowForgotForm] = useState('');

  const navigate = useNavigate();

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            setFirebaseError('User Not Found');
            break;
          case 'auth/invalid-email':
            setFirebaseError('Invalid Email');
            break;
          case 'auth/invalid-password':
            setFirebaseError('Invalid Password');
            break;
          default:
            setFirebaseError(errorCode);
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
        <form
          className={`forgot-password ${showForgotForm}`}
          onSubmit={(e) => {
            e.preventDefault();
            sendPasswordResetEmail(auth, resetEmail)
              .then(() => {
                setShowCheckingText(true);
                console.log('Password reset email sent!');
              })
              .catch((error) => {
                console.log(error.code);
                // ..
              });
          }}
        >
          <div
            className='close'
            onClick={() => {
              setShowForgotForm('');
            }}
          >
            <i className='fa-solid fa-xmark'></i>
          </div>

          <input
            onChange={(e) => {
              setResetEmail(e.target.value);
            }}
            type='email'
            placeholder='Email'
            required
          />
          <button>Reset Password</button>
          {showCheckingText && <p className='check-email'>Please check your email to reset your password.</p>}
        </form>

        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type='email'
            placeholder='Email'
            required
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type='password'
            placeholder='Password'
            required
          />
          <button>Sign in</button>
          <p className='account'>
            Don't hava an account <Link to='/signup'> Sign-up</Link>
          </p>
          <p
            className='forgot-pass'
            onClick={() => {
              setShowForgotForm('show');
            }}
          >
            forgot Password?
          </p>
          {firebaseError !== '' ? <div id='error'>{firebaseError}</div> : null}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
