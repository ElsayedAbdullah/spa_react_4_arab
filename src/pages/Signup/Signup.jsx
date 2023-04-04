import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../../comp/Loading/Loading';

import ReactLoading from 'react-loading';

// i18next
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const [showLoading, setShowLoading] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    // sign in and verified email
    if (user) {
      if (user.emailVerified) {
        navigate('/');
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(auth.currentUser).then(() => {
          console.log('Email verification sent!');
        });

        updateProfile(auth.currentUser, {
          displayName: username
        })
          .then(() => {
            console.log('username added');
          })
          .catch((error) => {
            console.log(error.code);
          });
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
    setShowLoading(false);
  };

  // loading
  if (loading) {
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
  }

  // error
  if (error) {
    return (
      <>
        <Header />
        <main>
          <p>Error:{error.message}</p>
        </main>
        <Footer />
      </>
    );
  }

  // signin without email verification
  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Header />
          <main>
            <div>
              <p>we send you an email to verify your account</p>
              <button
                className='del mt-2'
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
          <form onSubmit={handleSubmit} dir='auto'>
            <p style={{ fontSize: '23px', marginBottom: '22px' }}>
              {t('create-account')} <span>🧡</span>{' '}
            </p>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type='text'
              placeholder={t('username')}
              required
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type='email'
              placeholder={t('email')}
              required
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type='password'
              placeholder={t('password')}
              required
            />
            <button type='submit' style={{ display: 'flex', justifyContent: 'center' }}>
              {showLoading ? <ReactLoading type={'spin'} color={'white'} height={20} width={20} /> : t('signup')}
            </button>
            <p className='account'>
              {t('have-account')} <Link to='/signin'> {t('signin')}</Link>
            </p>

            {firebaseError !== '' ? (
              <h5 style={{ color: '#FF5722' }} className='mt-2' id='error'>
                {firebaseError}
              </h5>
            ) : null}
          </form>
        </main>
        <Footer />
      </>
    );
  }
};

export default Signup;
