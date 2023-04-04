import { Link } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Loading from '../../comp/Loading/Loading';
import Moment from 'react-moment';
import { useState } from 'react';

// i18next
import { useTranslation } from 'react-i18next';

function AllTasks({ user }) {
  const allTasks = query(collection(db, user.uid), orderBy('id', 'desc'));
  const completedTasks = query(collection(db, user.uid), where('completed', '==', true));
  const notCompletedTasks = query(collection(db, user.uid), where('completed', '==', false));
  const [intialData, setIntialData] = useState(allTasks);
  const [value, loading, error] = useCollection(intialData);
  const [active, setActive] = useState(true);
  const [filtered, setFiltered] = useState('all');

  const { t } = useTranslation();

  const handleSelectChange = (e) => {
    setFiltered(e.target.value);
    if (e.target.value === 'all') {
      setActive(true);
      setIntialData(allTasks);
    }
    if (e.target.value === 'completed') {
      setIntialData(completedTasks);
    }
    if (e.target.value === 'not-completed') {
      setIntialData(notCompletedTasks);
    }
  };

  // error
  if (error) {
    return (
      <main>
        <p>Error:{error.message}</p>
      </main>
    );
  }
  // loading
  if (loading) {
    return <Loading />;
  }

  if (value) {
    return (
      <>
        <section className='parent-of-btns flex mtt'>
          {filtered === 'all' && (
            <>
              <button
                className={`${active ? 'active' : ''}`}
                onClick={() => {
                  setActive(true);
                  setIntialData(query(collection(db, user.uid), orderBy('id', 'desc')));
                }}
              >
                {t('newestFirst')}
              </button>

              <button
                className={`${active ? '' : 'active'}`}
                onClick={() => {
                  setActive(false);
                  setIntialData(query(collection(db, user.uid), orderBy('id', 'asc')));
                }}
              >
                {t('oldestFirst')}
              </button>
            </>
          )}
          <select
            dir='auto'
            onChange={(e) => {
              handleSelectChange(e);
            }}
            value={filtered}
          >
            <option value='all'>{t('allTasks')}</option>
            <option value='completed'>{t('completed')}</option>
            <option value='not-completed'>{t('notCompleted')}</option>
          </select>
        </section>

        <section className='flex all-tasks mt'>
          {value.docs.length ? (
            value.docs.map((item) => {
              return (
                <article key={item.data().id} dir='auto' className='one-task'>
                  <Link to={`/edit-task/${item.data().id}`}>
                    <h2> {item.data().title} </h2>
                    <ul>
                      {item.data().tasks.map((task, index) => {
                        return index <= 1 ? <li key={task}>{task} </li> : null;
                      })}
                    </ul>

                    <p className='time'>{<Moment fromNow>{item.data().id}</Moment>}</p>
                  </Link>
                </article>
              );
            })
          ) : (
            <p className='mt-2'>{t('noTasks')}</p>
          )}
        </section>
      </>
    );
  }
}

export default AllTasks;
