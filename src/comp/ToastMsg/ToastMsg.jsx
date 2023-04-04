// i18next
import { useTranslation } from 'react-i18next';
import './ToastMsg.css';

function ToastMsg({ showMessage }) {
  const { t } = useTranslation();
  return (
    <div dir='auto' className='show-message' style={{ right: showMessage ? '20px' : '-100vw' }}>
      <i className='fa-regular fa-circle-check'></i>
      <p>{t('dataAddedSuccessfully')}</p>
    </div>
  );
}

export default ToastMsg;
