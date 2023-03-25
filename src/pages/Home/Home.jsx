import { Helmet } from 'react-helmet-async';
import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import './Home.css';

// firbase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { Link } from 'react-router-dom';
import Loading from '../../comp/Loading/Loading';
import { useState } from 'react';
import Modal from '../../comp/Modal/Modal';
// import { sendEmailVerification } from 'firebase/auth';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);

  // modal form submit
  const modalSubmit = (e) => {
    e.preventDefault();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      {/* Loading */}
      {loading && <Loading />}

      {/* Not Sign in */}
      {!user && (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>
          <main>
            <p className='signin-text'>
              Please <Link to='/signin'> sign in</Link> to Continue .... <span> 💜</span>
            </p>
          </main>
        </>
      )}

      {/* Sign in and not verified */}
      {/* {user && !user.emailVerified && (
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
      )} */}

      {/* Sign in and verified */}
      {user && (
        <main className='home'>
          {/* OPIONS (filtered data) */}
          <section className='parent-of-btns flex mtt'>
            <button className='active'>Newest first</button>

            <button>Oldest first</button>
            <select id='browsers'>
              <option value='ddddd'> All Tasks </option>
              <option value='dddddd'> Completed </option>
              <option value='dddddd'> Not Completed </option>
            </select>
          </section>

          {/* SHOW all tasks */}
          <section className='flex all-tasks mt'>
            <article dir='auto' className='one-task'>
              <Link to={'/edit-task'}>
                <h2> New Task </h2>
                <ul>
                  <li>Sub task 1 </li>
                  <li> Sub task 2</li>
                </ul>

                <p className='time'>a day ago</p>
              </Link>
            </article>
          </section>

          {/* Add new task BTN */}
          <section className='mt-1'>
            <button className='add-task-btn teal-btn' onClick={() => setShowModal(true)}>
              Add new task <i className='fa-solid fa-plus'></i>
            </button>
          </section>

          {showModal && (
            <Modal closeModal={closeModal} modalSubmit={modalSubmit}>
              <div style={{ textAlign: 'start' }}>
                <input onChange={(eo) => {}} placeholder='Add title' type='text' required />

                <div className='flex' style={{ gap: '12px', alignItems: 'flex-start' }}>
                  <input onChange={(eo) => {}} placeholder='details' type='text' required />

                  <button type='button'>Add</button>
                </div>

                <button
                  onClick={(eo) => {
                    eo.preventDefault();
                  }}
                >
                  Submit
                </button>
              </div>
            </Modal>
          )}
        </main>
      )}
      <Footer />
    </>
  );
};

export default Home;
