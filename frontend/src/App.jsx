import { Routes, Route } from "react-router-dom"
import IsAuth from './utils/isAuth.jsx'
import { useContext } from "react";
import { UserContext } from "./context/UserContext.jsx";

import './App.css'

import LoginPage from './components/Login/LoginPage.jsx'
import Home from './components/Home/Home.jsx'
import MySpace from './components/MySpace/MySpace.jsx'
import NewSong from './components/MySpace/NewSong.jsx'
import Logout from "./components/Login/Logout.jsx";
import NewAlbum from "./components/MySpace/NewAlbum.jsx";
import NewPlaylist from "./components/MySpace/NewPlaylist.jsx";


function App() {

  const { isLogged } = useContext(UserContext);

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
        <Route exact path='/myspace/addplaylist' element={<IsAuth isLogged={isLogged}><NewPlaylist /></IsAuth>} />
      </Routes>
    </div>
  )
}

export default App
