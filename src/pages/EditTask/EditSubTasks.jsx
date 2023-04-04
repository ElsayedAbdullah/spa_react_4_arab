import { db } from '../../firebase/config';
import { useDocument } from 'react-firebase-hooks/firestore';
import Loading from '../../comp/Loading/Loading';
import Moment from 'react-moment';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';

function EditSubTasks({ user, userId, updateCompleted }) {
  const ref = useRef(null);
  const [value, loading] = useDocument(doc(db, user.uid, userId));
  const [showAddNewTask, setShowAddNewTask] = useState(false);
  const [newTask, setNewTask] = useState('');

  const handleFocus = () => {
    ref.current.focus();
  };

  if (loading) {
    return <Loading />;
  }

  if (value) {
    return (
      <section className='sub-task mt-2'>
        <div className='parent-time'>
          <p className='time'>
            Created: <Moment fromNow>{value.data().id}</Moment>
          </p>
          <div>
            <input
              onChange={() => {
                updateCompleted(value.data().completed);
              }}
              id='checkbox'
              type='checkbox'
              checked={value.data().completed}
            />
            <label htmlFor='checkbox'>Completed </label>
          </div>
        </div>

        <ul>
          {value.data().tasks.map((item) => {
            return (
              <li key={item} className='card-task flex'>
                <p> {item} </p>
                <i
                  className='fa-solid fa-trash'
                  onClick={async () => {
                    await updateDoc(doc(db, user.uid, userId), {
                      tasks: arrayRemove(item)
                    });
                  }}
                ></i>
              </li>
            );
          })}
        </ul>

        {showAddNewTask && (
          <form
            className='add-new-task'
            onSubmit={async (e) => {
              e.preventDefault();
              if (newTask) {
                handleFocus();
                setNewTask('');
                await updateDoc(doc(db, user.uid, userId), {
                  tasks: arrayUnion(newTask)
                });
              }
            }}
          >
            <input
              autoFocus
              type='text'
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
              ref={ref}
              value={newTask}
            />
            <button className='teal-btn'>Add</button>
            <button
              type='button'
              className='teal-btn'
              onClick={() => {
                setShowAddNewTask(false);
              }}
            >
              Cancel
            </button>
          </form>
        )}

        <div className='center mt-2'>
          <button
            className='add-more-btn teal-btn'
            onClick={() => {
              setShowAddNewTask(true);
            }}
          >
            Add more <i className='fa-solid fa-plus'></i>
          </button>
        </div>
      </section>
    );
  }
}

export default EditSubTasks;
