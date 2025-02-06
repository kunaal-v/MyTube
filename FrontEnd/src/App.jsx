import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.css'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'

function App() {
const myRoutes=createBrowserRouter([
  {path:"/",element:<SignUp/>},
  {path:"/signUp",element:<SignUp/>},
  {path:"/logIn",element:<LogIn/>}
]);
  return (
    <>
      <RouterProvider router={myRoutes} ></RouterProvider>
    </>
  )
}

export default App
