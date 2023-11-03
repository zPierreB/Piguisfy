import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
    const [playlists, setPlaylists] = useState([])

    // const index = async () => {
    //     const response = await axios.get('http://localhost:8000/playlists')
    //     setPlaylists(response.data.playlists)
    // }

    return(
        <>
            {/* <h1>Quelle belle homepage!</h1> */}
          <Link to='/myspace'>Mon espace</Link>
          <div>
            <h1>Piguisfy</h1>
            <nav className='pulse'>
              <h3>Menu</h3>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/likedSongs'>Liked Songs</Link>
                </li>
              </ul>
              <h3>Playlists</h3>
              <ul>
                {playlists.map((playlist) => (
                  <li key={playlist.id}>
                    <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
    )
}

export default Home