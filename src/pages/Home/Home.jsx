import { Helmet } from 'react-helmet-async';
import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import './Home.css';

// firbase
import { Link } from 'react-router-dom';
import Loading from '../../comp/Loading/Loading';

import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';

import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { sendEmailVerification } from 'firebase/auth';
import HomeModal from './HomeModal';
import AllTasks from './AllTasks';

// i18next
import { useTranslation } from 'react-i18next';
import ToastMsg from 'comp/ToastMsg/ToastMsg';

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const [task, setTask] = useState('');
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();

  // functions of modal
  const closeModal = () => {
    setShowModal(false);
    setTitle('');
    setTasks([]);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeDetails = (e) => {
    setTask(e.target.value);
  };

  const addDetailsButton = (e) => {
    e.preventDefault();
    if (task) {
      if (!tasks.includes(task)) {
        tasks.push(task);
      }
      setTask('');
    }
  };

  const submitDataButton = async (e) => {
    e.preventDefault();
    if (title) {
      const taskID = new Date().getTime();

      setShowLoading(true);

      // add data
      try {
        await setDoc(doc(db, user.uid, `${taskID}`), {
          id: taskID,
          title,
          tasks,
          completed: false
        });
        setTitle('');
        setTasks([]);

        setShowLoading(false);
        setShowModal(false);

        setShowMessage(true);
      } catch (e) {
        console.error('Error adding document: ', e);
      }

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <>
      <Header />
      {/* Loading */}
      {loading && <Loading />}

      {/* Error */}
      {error && (
        <main>
          <p>Error:{error.message}</p>
        </main>
      )}

      {/* Not Sign in */}
      {!user && (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>
          <main dir='auto'>
            <p className='signin-text'>
              {t('please')} <Link to='/signin'> {t('signin')}</Link> {t('toContinue')} .... <span> 💜</span>
            </p>
          </main>
        </>
      )}

      {/* Sign in and not verified */}
      {user && !user.emailVerified && (
        <main dir='auto'>
          <div>
            <h1>
              {t('welcome')} {user.displayName} ... 👋
            </h1>
            <p>{t('verifyEmail')}</p>
            <button
              className='del mt-2'
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
      )}

      {/* Sign in and verified */}
      {user && user.emailVerified && (
        <main className='home'>
          {/* SHOW all tasks */}
          <AllTasks user={user} />

          {/* Add new task BTN */}
          <section className='mt-2' dir='auto'>
            <button className='add-task-btn teal-btn' onClick={() => setShowModal(true)}>
              {t('addNewTask')} <i className='fa-solid fa-plus'></i>
            </button>
          </section>

          {showModal && <HomeModal closeModal={closeModal} changeTitle={changeTitle} changeDetails={changeDetails} addDetailsButton={addDetailsButton} submitDataButton={submitDataButton} title={title} tasks={tasks} showLoading={showLoading} task={task} />}

          {/* Toast Message */}
          <ToastMsg showMessage={showMessage} />
        </main>
      )}

      <Footer />
    </>
  );
};

export default Home;
