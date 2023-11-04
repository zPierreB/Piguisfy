import { Routes, Route } from "react-router-dom"
import IsAuth from './utils/isAuth.jsx'
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import './App.css'

import LoginPage from './components/Login/LoginPage.jsx'
import Home from './components/Home/Home.jsx'
import MySpace from './components/MySpace/MySpace.jsx'
import NewSong from './components/MySpace/NewSong.jsx'
import Logout from "./components/Login/Logout.jsx";
import NewAlbum from "./components/MySpace/NewAlbum.jsx";


function App() {

  const { isLogged } = useContext(AuthContext);

  return (
    <div className='app'>
      <Routes>
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/logout' element={<Logout />} />

        {/* PROTECTED ROUTES */}
        <Route exact path='/' element={<IsAuth isLogged={isLogged}><Home /></IsAuth>} />
        <Route exact path='/myspace' element={<IsAuth isLogged={isLogged}><MySpace /></IsAuth>} />
        <Route exact path='/myspace/addsong' element={<IsAuth isLogged={isLogged}><NewSong /></IsAuth>} />
        <Route exact path='/myspace/addalbum' element={<IsAuth isLogged={isLogged}><NewAlbum /></IsAuth>} />
      </Routes>
    </div>
  )
}

export default App
