import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
/* import App from './App.jsx' */
import './index.css'
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/registerPage';
import { HomePage } from './pages/HomePage';
import { CreateActivity } from './pages/CreateActivity';
import { ViewActivity } from './pages/ViewActivity';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/create-activity",
    element: <CreateActivity />,
  },
  {
    path: "/view-activity",
    element: <ViewActivity />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
