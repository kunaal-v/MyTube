import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './App.css'
import LogIn from './Components/LogIn'
import SignUp from './Components/SignUp'
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import MyVideos from "./Components/MyVideos";
import MyChannel from "./Components/MyChannel";
import UploadVideo from "./Components/UploadVideo";
import VideoDetails from "./Components/VideoDetails";
import CreateChannel from "./Components/CreateChannel";
import AllVideos from "./Components/AllVideos";

function App() {
const myRoutes=createBrowserRouter([
  {path:"/",element:<Dashboard/>},
  {path:"/signUp",element:<SignUp/>},
  {path:"/logIn",element:<LogIn/>},
  {path:"/CreateChannel",element:<CreateChannel/>},
  {path:"/dashboard",element:<Dashboard/>,children:[
    {path:"",element:<AllVideos/>},
    {path:"videoDetails/:id",element:<VideoDetails/>},
  ]},
  {path:"/profile",element:<Profile/>,children:[
    {path:"mychannel",element:<MyChannel/>},
    {path:"myvideos",element:<MyVideos/>},
    {path:"uploadvideo",element:<UploadVideo/>}
  ]},
  
]);
  return (
    <>
      <RouterProvider router={myRoutes} ></RouterProvider>
    </>
  )
}

export default App
