// Components
import About from './pages/About/About';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';

// import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>SORROY.........</h1>
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
  return (
    <div className={`app ${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
