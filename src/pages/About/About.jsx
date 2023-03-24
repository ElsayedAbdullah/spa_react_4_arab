import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import MainContent from '../../comp/MainContent/MainContent';
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

    if (user) {
      if (!user.emailVerified) {
        navigate('/');
      }
    }
  });

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
  }

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

  if (user) {
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>About Page</title>
          </Helmet>
          <Header />
          {user && <MainContent pageName='About Page' />}

          <Footer />
        </>
      );
    }
  }
};

export default About;
