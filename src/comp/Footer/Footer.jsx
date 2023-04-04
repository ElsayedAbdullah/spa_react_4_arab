import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { i18n } = useTranslation();
  return (
    <div className='myfooter'>
      <footer className='teal' dir='auto'>
        {i18n.language === 'en' && (
          <p>
            <a href='https://sayedaladway.com/'>sayedaladway.com</a> &copy; 2023 All Rights Reserved.
          </p>
        )}
        {i18n.language === 'ar' && (
          <p>
            <a href='https://sayedaladway.com/'>sayedaladway.com</a> &copy; 2023 جميع الحقوق محفوظة
          </p>
        )}

        <span> 💛</span>
      </footer>
    </div>
  );
};

export default Footer;
