// Components
import About from './pages/About/About';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';

// import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import EditTask from './pages/EditTask/EditTask';
// i18next
import { useTranslation } from 'react-i18next';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/edit-task/:userId',
    element: <EditTask />
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);

function App() {
  const { theme } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  return (
    <div className={`app ${theme} ${i18n.language}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
