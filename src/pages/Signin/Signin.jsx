import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useState } from 'react';
import './Signin.css';
import Modal from '../../comp/Modal/Modal';
import ReactLoading from 'react-loading';

// i18next
import { useTranslation } from 'react-i18next';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firebaseError, setFirebaseError] = useState('');

  const [showCheckingText, setShowCheckingText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  const { t } = useTranslation();

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
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

    setShowLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main dir='auto'>
        {/* Modal */}
        {showModal && (
          <Modal closeModal={closeModal}>
            <input
              onChange={(e) => {
                setResetEmail(e.target.value);
              }}
              type='email'
              placeholder={t('email')}
              required
            />
            <button
              onClick={(e) => {
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
              {t('resetPassword')}
            </button>
            {showCheckingText && <p className='check-email'>Please check your email to reset your password.</p>}
          </Modal>
        )}

        <form onSubmit={handleSubmit}>
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
          <button style={{ display: 'flex', justifyContent: 'center' }}>{showLoading ? <ReactLoading type={'spin'} color={'white'} height={20} width={20} /> : t('signin')}</button>
          <p className='account'>
            {t('dont-have-account')} <Link to='/signup'> {t('signup')}</Link>
          </p>
          <p
            className='forgot-pass'
            onClick={() => {
              setShowModal(true);
            }}
          >
            {t('forgotPassword')}
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
};

export default Signin;
