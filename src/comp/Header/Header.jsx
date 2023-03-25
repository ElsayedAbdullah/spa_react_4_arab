import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

// firbase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';

import { signOut } from 'firebase/auth';

const Header = () => {
  const { changeTheme } = useContext(ThemeContext);
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

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
          {!user && (
            <>
              <li className='main-list'>
                <NavLink className='main-link' to='/signup'>
                  Sign up
                </NavLink>
              </li>
              <li className='main-list'>
                <NavLink className='main-link' to='/signin'>
                  Sign in
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
                  Sign out
                </p>
              </li>
              <li className='main-list'>
                <NavLink className='main-link' to='/about'>
                  About
                </NavLink>
              </li>
              <li className='main-list'>
                <NavLink className='main-link' to='/profile'>
                  Profile
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
