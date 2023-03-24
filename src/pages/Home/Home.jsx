import { Helmet } from 'react-helmet-async';
import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';

// firbase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { Link } from 'react-router-dom';
import Loading from '../../comp/Loading/Loading';
import { sendEmailVerification } from 'firebase/auth';

const Home = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Header />
          <main>
            <div>
              <h1>Welcome {user.displayName} ... 👋</h1>
              <p>Please verify your email to continue</p>
              <button
                className='del'
                onClick={() => {
                  // sendEmailVerification
                  sendEmailVerification(auth.currentUser).then(() => {
                    console.log('Email verification sent!');
                  });
                }}
              >
                verify
              </button>
            </div>
          </main>
          <Footer />
        </>
      );
    }
    if (user.emailVerified) {
      return (
        <>
          <Header />
          <main>
            <h1>Welcome {user.displayName} ... 👋</h1>
          </main>
          <Footer />
        </>
      );
    }
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
        </Helmet>
        <Header />
        <main>
          <p className='signin-text'>
            Please <Link to='/signin'> sign in</Link> to Continue .... <span> 💜</span>
          </p>
        </main>
        <Footer />
      </>
    );
  }
};

export default Home;
