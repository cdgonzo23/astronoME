import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Error from './pages/Signup.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup.jsx';
import Community from './pages/Community.jsx';
import BlogpostForm from './pages/BlogpostForm.jsx';
import SingleBlogpost from './pages/SingleBlogpost.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/user/:username',
        element: <Profile />
      },
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: '/community',
        element: <Community />
      },
      {
        path: '/community/:blogpostId',
        element: <SingleBlogpost />
      },
      {
        path: '/blogpostform',
        element: <BlogpostForm />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
