import { Routes, Route } from "react-router-dom"
import IsAuth from './utils/isAuth.jsx'
import { useContext } from "react"

import './App.css'

import LoginPage from './components/Login/LoginPage.jsx'
import Home from './components/Home/Home.jsx'
import MySpace from './components/MySpace/MySpace.jsx'
import NewSong from './components/MySpace/NewSong.jsx'
import Logout from "./components/Login/Logout.jsx";
import NewAlbum from "./components/MySpace/NewAlbum.jsx";
import NewPlaylist from "./components/MySpace/NewPlaylist.jsx";
import Show1Playlist from "./components/MySpace/Show1Playlist.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx"

import { UserContext } from "./context/UserContext.jsx"


function App() {
  const { isLogged } = useContext(UserContext)
  console.log(isLogged)
  return (
    <div className='app'>
      <IsAuth>
        <Sidebar />
      </IsAuth>
      <Routes>
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/logout' element={<Logout />} />

        {/* PROTECTED ROUTES */}
        <Route exact path='/' element={<IsAuth><Home /></IsAuth>} />
        <Route exact path='/myspace' element={<IsAuth><MySpace /></IsAuth>} />
        {/* SONGS ROUTES*/}
        <Route exact path='/myspace/addsong' element={<IsAuth><NewSong /></IsAuth>} />
        {/* ALBUMS ROUTES*/}
        <Route exact path='/myspace/addalbum' element={<IsAuth><NewAlbum /></IsAuth>} />
        {/* PLAYLISTS ROUTES*/}
        <Route exact path="/myspace/playlist/:id" element={<IsAuth><Show1Playlist /></IsAuth>} />
        <Route exact path='/myspace/addplaylist' element={<IsAuth><NewPlaylist /></IsAuth>} />
      </Routes>
    </div>
  )
}

export default App
