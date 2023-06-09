import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import Loading from '../../comp/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { useEffect } from 'react';
import './Profile.css';
import { deleteUser } from 'firebase/auth';

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    !user && !loading && navigate('/');
    user && !user.emailVerified && navigate('/');
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
          <p>
            Error: <>{error}</>
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile Page</title>
          <meta name='description' content='Profile' />
        </Helmet>
        <Header />
        {user && user.emailVerified && (
          <main>
            <div className='profile-content'>
              {user.displayName && (
                <h1>
                  <strong>Username: </strong>
                  {user.displayName}
                </h1>
              )}

              <h1>
                <strong>Email: </strong>
                {user.email}
              </h1>
              <h1>
                <strong>Created At: </strong>
                <Moment fromNow date={user.metadata.creationTime} />
              </h1>
              <h1>
                <strong>Last Sign in: </strong>
                <Moment fromNow date={user.metadata.lastSignInTime} />
              </h1>
              <button
                className='del mt-2'
                onClick={() => {
                  const currentUser = auth.currentUser;
                  deleteUser(currentUser)
                    .then(() => {
                      // navigate('/signup');
                      console.log('User deleted');
                    })
                    .catch((error) => {
                      console.log('An error ocurred');
                    });
                }}
              >
                Delete Account
              </button>
            </div>
          </main>
        )}

        <Footer />
      </>
    );
  }
};

export default Profile;
