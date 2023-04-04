import { db } from '../../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function DeleteTask({ user, userId, setShowData }) {
  const navigate = useNavigate();
  return (
    <div className='center mt-1'>
      <button
        className='del mt-1'
        onClick={async () => {
          setShowData(true);
          await deleteDoc(doc(db, user.uid, userId));
          navigate('/', { replace: true });
        }}
      >
        Delete task
      </button>
    </div>
  );
}

export default DeleteTask;
