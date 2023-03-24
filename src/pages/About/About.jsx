// @ts-nocheck
import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import { Helmet } from 'react-helmet-async';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../../comp/Loading/Loading';

const About = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    !user && !loading && navigate('/');

    // if (user) {
    //   if (!user.emailVerified) {
    //     navigate('/');
    //   }
    // }
  });

  return (
    <>
      <Header />
      {/* Loading */}
      {loading && <Loading />}

      {/* error */}
      {error && (
        <>
          <main>
            <div>Error: {error}</div>
          </main>
        </>
      )}

      {/* Sign in and verified */}
      {user && (
        <>
          <Helmet>
            <title>About Page</title>
          </Helmet>
          {user && <main>About Page</main>}
        </>
      )}

      <Footer />
    </>
  );
};

export default About;
