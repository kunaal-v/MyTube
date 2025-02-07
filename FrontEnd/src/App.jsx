import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.css'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import MyVideos from "./Components/MyVideos";
import MyChannel from "./Components/MyChannel";
import UploadVideo from "./Components/UploadVideo";
import Logout from "./Components/Logout";
import VideoDetails from "./Components/VideoDetails";

function App() {
const myRoutes=createBrowserRouter([
  {path:"/",element:<Dashboard/>},
  {path:"/signUp",element:<SignUp/>},
  {path:"/logIn",element:<LogIn/>},
  {path:"/dashboard",element:<Dashboard/>},
  {path:"/profile",element:<Profile/>,children:[
    {path:"mychannel",element:<MyChannel/>},
    {path:"myvideos",element:<MyVideos/>},
    {path:"uploadvideo",element:<UploadVideo/>},
    {path:"logout",element:<Logout/>}
  ]},
  {path:"/videoDetails/:id",element:<VideoDetails/>}
]);
  return (
    <>
      <RouterProvider router={myRoutes} ></RouterProvider>
    </>
  )
}

export default App
