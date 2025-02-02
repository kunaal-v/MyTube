
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Components/Header';
import Body from './Components/Body.jsx'
import { useState } from 'react';

function App() {

  const [toggle,setToggle]=useState(false);
  function handleToggle()
  {
    setToggle(!toggle);
  }
  return (
    <>
      <Header toggleFunction={handleToggle}/>
      <Body toggleValue={toggle}/>
      <Outlet/>
    </>
  )
}

export default App
