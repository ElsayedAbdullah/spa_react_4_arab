import { Helmet } from 'react-helmet-async';
import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import './Home.css';

// firbase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/config';
import { Link } from 'react-router-dom';
import Loading from '../../comp/Loading/Loading';
import { useState } from 'react';
import Modal from '../../comp/Modal/Modal';
import { setDoc, doc } from 'firebase/firestore';
import { sendEmailVerification } from 'firebase/auth';

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState('');
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);

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
      {user && !user.emailVerified && (
        <main>
          <div>
            <h1>Welcome {user.displayName} ... 👋</h1>
            <p>Please verify your email to continue</p>
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
          {/* OPIONS (filtered data) */}
          <section className='parent-of-btns flex mtt'>
            <button className='active'>Newest first</button>

            <button>Oldest first</button>
            <select id='browsers'>
              <option value='all-tasks'> All Tasks </option>
              <option value='completed'> Completed </option>
              <option value='not-completed'> Not Completed </option>
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
            <Modal closeModal={closeModal}>
              <div style={{ textAlign: 'start' }}>
                <input
                  onChange={(eo) => {
                    setTitle(eo.target.value);
                  }}
                  placeholder='Add title'
                  type='text'
                  value={title}
                  required
                />

                <div className='flex' style={{ gap: '12px', alignItems: 'flex-start' }}>
                  <input
                    onChange={(eo) => {
                      setTask(eo.target.value);
                    }}
                    placeholder='details'
                    type='text'
                    value={task}
                  />

                  <button
                    type='button'
                    onClick={() => {
                      if (task) {
                        tasks.push(task);
                        setTask('');
                        console.log(tasks);
                      }
                    }}
                  >
                    Add
                  </button>
                </div>

                <ul className='tasks-list'>
                  {tasks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    const taskID = new Date().getTime();
                    try {
                      await setDoc(doc(db, user.uid, `${taskID}`), {
                        id: taskID,
                        title,
                        tasks
                      });
                      console.log('Data added');
                      setTitle('');
                      setTasks([]);
                    } catch (e) {
                      console.error('Error adding document: ', e);
                    }
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
