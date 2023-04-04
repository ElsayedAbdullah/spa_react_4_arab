import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

// firbase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';

// i18next
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { changeTheme } = useContext(ThemeContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className='myheader'>
      <header className='hide-when-mobile teal'>
        <h1>
          <Link to='/'>syd.dev</Link>
        </h1>
        <button onClick={() => changeTheme()} className='theme-btn'>
          <i className='fa-solid fa-sun'></i>
          <i className='fa-solid fa-moon'></i>
        </button>

        <ul className='flex'>
          <li className='main-list lang'>
            <p>{t('language')}</p>

            <ul className='lang-box'>
              <li
                dir='rtl'
                onClick={() => {
                  i18n.changeLanguage('ar');
                }}
              >
                <p> العربية</p>
                {i18n.language === 'ar' && <i className='fa-solid fa-check'></i>}
              </li>

              <li
                onClick={() => {
                  i18n.changeLanguage('en');
                }}
              >
                <p>English</p>
                {i18n.language === 'en' && <i className='fa-solid fa-check'></i>}
              </li>
            </ul>
          </li>
          {!user && (
            <>
              <li className='main-list'>
                <NavLink className='main-link' to='/signup'>
                  {t('signup')}
                </NavLink>
              </li>
              <li className='main-list'>
                <NavLink className='main-link' to='/signin'>
                  {t('signin')}
                </NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li
                className='main-list'
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      console.log('Sign-out successful.');
                      navigate('/signin');
                    })
                    .catch((error) => {
                      console.log('An error happened.');
                    });
                }}
              >
                <p className='main-link' style={{ cursor: 'pointer' }}>
                  {t('signout')}
                </p>
              </li>
              <li className='main-list'>
                <NavLink className='main-link' to='/profile'>
                  {t('profile')}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
