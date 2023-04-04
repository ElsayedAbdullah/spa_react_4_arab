import Modal from 'comp/Modal/Modal';
// loading
import ReactLoading from 'react-loading';
// i18next
import { useTranslation } from 'react-i18next';

function HomeModal({ closeModal, changeTitle, changeDetails, addDetailsButton, title, task, submitDataButton, tasks, showLoading }) {
  const { t } = useTranslation();
  return (
    <Modal closeModal={closeModal}>
      <div style={{ textAlign: 'start' }} dir='auto' className='modal-content'>
        <div>
          <input onChange={changeTitle} placeholder={t('addTitle')} type='text' value={title} required />

          <div className='flex' style={{ gap: '12px', alignItems: 'flex-start' }}>
            <input onChange={changeDetails} placeholder={t('details')} type='text' value={task} />

            <button type='button' onClick={addDetailsButton}>
              {t('add')}
            </button>
          </div>

          <ul className='tasks-list'>
            {tasks.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <button type='button' onClick={submitDataButton} className='submit-btn'>
            {showLoading ? (
              <>
                Submitting... <ReactLoading type={'spin'} color={'white'} height={20} width={20} />
              </>
            ) : (
              t('submit')
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default HomeModal;
