import { Routes, Route } from "react-router-dom"
import IsAuth from './utils/isAuth.jsx'
import { useContext } from "react"

import './App.css'

import LoginPage from './components/Login/LoginPage.jsx'
import Home from './components/Home/Home.jsx'
import Playlist from './components/Home/Playlist/Playlist.jsx'
import Album from './components/Home/Album/Album.jsx'
import MySpace from './components/MySpace/MySpace.jsx'
import NewSong from './components/MySpace/NewSong.jsx'
import Logout from "./components/Login/Logout.jsx";
import NewAlbum from "./components/MySpace/NewAlbum.jsx";
import Show1Album from "./components/MySpace/Show1Album.jsx";
import Edit1Album from "./components/MySpace/Edit1Album.jsx";
import NewPlaylist from "./components/MySpace/NewPlaylist.jsx";
import Show1Playlist from "./components/MySpace/Show1Playlist.jsx";
import Edit1Playlist from "./components/MySpace/Edit1Playlist.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx"
import MediaPlayer from "./components/MediaPlayer/MediaPlayer.jsx"

function App() {
  
  return (
    <div className='app'>
      <div className="gridTemplate">

      {/* <IsAuth>
        <Sidebar />
      </IsAuth> */}
        <Routes>
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/logout' element={<Logout />} />
      
          {/* PROTECTED ROUTES */}
          <Route exact path='/' element={<IsAuth><Sidebar /><Home /><MediaPlayer /></IsAuth>} />
          {/* PLAYLISTS ROUTES */}
          <Route exact path="/playlist/:id" element={<IsAuth><Sidebar /><Playlist /><MediaPlayer /></IsAuth>} />
          {/* ALBUMS ROUTES */}
          <Route exact path="/album/:id" element={<IsAuth><Sidebar /><Album /><MediaPlayer /></IsAuth>} />

          {/* --------------------------------------------------------------------------------------------------------*/}

          {/* MYSPACE ROUTES */}
          <Route exact path='/myspace' element={<IsAuth><Sidebar /><MySpace /><MediaPlayer /></IsAuth>} />
            {/* MYSPACE SONGS ROUTES*/}
          <Route exact path='/myspace/addsong' element={<IsAuth><Sidebar /><NewSong /><MediaPlayer /></IsAuth>} />
            {/* MYSPACE ALBUMS ROUTES*/}
            <Route exact path="/myspace/album/:id" element={<IsAuth><Sidebar /><Show1Album /><MediaPlayer /></IsAuth>} />
            <Route exact path="/myspace/album/:id/edit" element={<IsAuth><Sidebar /><Edit1Album /><MediaPlayer /></IsAuth>} />
          <Route exact path='/myspace/addalbum' element={<IsAuth><Sidebar /><NewAlbum /><MediaPlayer /></IsAuth>} />
            {/* MYSPACE PLAYLISTS ROUTES*/}
          <Route exact path="/myspace/playlist/:id" element={<IsAuth><Sidebar /><Show1Playlist /><MediaPlayer /></IsAuth>} />
          <Route exact path="/myspace/playlist/:id/edit" element={<IsAuth><Sidebar /><Edit1Playlist /><MediaPlayer /></IsAuth>} />
          <Route exact path='/myspace/addplaylist' element={<IsAuth><Sidebar /><NewPlaylist /><MediaPlayer /></IsAuth>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
