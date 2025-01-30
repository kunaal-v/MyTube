// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './Components/SignUp.jsx'

const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/SignUp",
        element:<SignUp/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter}/>
);
