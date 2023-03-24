import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../comp/Loading/Loading';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firebaseError, setFirebaseError] = useState('');

  // const navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // sign in and verified email
    // if (user) {
    //   if (user.emailVerified) {
    //     navigate('/');
    //   }
    // }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // sendEmailVerification
        sendEmailVerification(auth.currentUser).then(() => {
          console.log('Email verification sent!');
        });

        // updateProfile
        updateProfile(auth.currentUser, {
          displayName: username
        })
          .then(() => {
            // navigate('/');
          })
          .catch((error) => {
            console.log(error);
          });
        // navigate('/');
        // console.log('Congrats');
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/email-already-exists':
            setFirebaseError('Email Already Exists');
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

  // loading
  if (loading) {
    if (loading) {
      return (
        <>
          <Header />
          <Loading />
          <Footer />
        </>
      );
    }
  }

  // error
  if (error) {
    return (
      <>
        <Header />
        <main>
          <p>Error: {error}</p>
        </main>
        <Footer />
      </>
    );
  }

  // signin without email verification
  if (user) {
    return (
      <>
        <Header />
        <main>
          <div>
            <p>we send you an email to verify your account</p>
            <button
              className='del'
              onClick={() => {
                // sendEmailVerification
                sendEmailVerification(auth.currentUser).then(() => {
                  console.log('Email verification sent!');
                });
              }}
            >
              send again
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // not sign in
  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup</title>
        </Helmet>

        <Header />

        <main>
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: '23px', marginBottom: '22px' }}>
              Create a new account <span>🧡</span>{' '}
            </p>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type='text'
              placeholder='Username'
              required
            />
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
            <button type='submit'>Sign up</button>
            <p className='account'>
              Already hava an account <Link to='/signin'> Sign-in</Link>
            </p>

            {firebaseError !== '' ? <div id='error'>{firebaseError}</div> : null}
          </form>
        </main>
        <Footer />
      </>
    );
  }
};

export default Signup;
