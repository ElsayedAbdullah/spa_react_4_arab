import { db } from '../../firebase/config';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import Loading from '../../comp/Loading/Loading';
import { useRef } from 'react';

function EditTitle({ user, userId, updateTitle }) {
  const [value, loading] = useDocument(doc(db, user.uid, userId));
  const inputElement = useRef(null);

  const focusInput = () => {
    inputElement.current.focus();
  };

  if (loading) {
    return <Loading />;
  }

  if (value) {
    return (
      <section className='title center'>
        <h1>
          <input
            defaultValue={value.data().title}
            onChange={(e) => {
              updateTitle(e);
            }}
            ref={inputElement}
            className='title-input center'
            type='text'
            style={{ textDecoration: value.data().completed ? 'line-through' : 'none' }}
          />
          <i onClick={focusInput} className='fa-regular fa-pen-to-square'></i>
        </h1>
      </section>
    );
  }
}

export default EditTitle;
