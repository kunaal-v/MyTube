import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import SignUp from './Components/SignUp.jsx'
import CreateChannel from './Components/CreateChannel.jsx'
const appRouter=createBrowserRouter(
  [
    {
      path:"/",
      element:<App/>
    },
    {
      path:"/home",
      element:<App/>
    },
    {
      path:"/signUp",
      element:<SignUp/>
    }
    ,{
      path:"/CreateChannel",
      element:<CreateChannel/>
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter}/>
)
