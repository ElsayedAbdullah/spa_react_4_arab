import './EditTask.css';

import { Helmet } from 'react-helmet-async';
import Header from '../../comp/Header/Header';
import Footer from '../../comp/Footer/Footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import Loading from 'comp/Loading/Loading';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditTitle from './EditTitle';
import EditSubTasks from './EditSubTasks';
import DeleteTask from './DeleteTask';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  const [showData, setShowData] = useState(false);

  const navigate = useNavigate();
  let { userId } = useParams();

  // updateTitle
  const updateTitle = async (e) => {
    await updateDoc(doc(db, user.uid, userId), {
      title: e.target.value
    });
  };

  // updateCompleted
  const updateCompleted = async (bool) => {
    await updateDoc(doc(db, user.uid, userId), {
      completed: !bool
    });
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  });

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

  if (user) {
    return (
      <div>
        <Helmet>
          <title>edit task Page</title>
        </Helmet>

        <Header />

        {showData ? (
          <Loading />
        ) : (
          <div className='edit-task'>
            {/* Title */}
            <EditTitle user={user} userId={userId} updateTitle={updateTitle} />

            {/* Sub-tasks section */}
            <EditSubTasks user={user} userId={userId} updateCompleted={updateCompleted} />

            {/* Add-more BTN && Delete BTN */}
            <DeleteTask user={user} userId={userId} setShowData={setShowData} />
          </div>
        )}

        <Footer />
      </div>
    );
  }
};

export default EditTask;
