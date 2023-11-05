import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import getCookie from '../../utils/getCookie.js'

const Home = () => {
    const [playlists, setPlaylists] = useState([])

    const index = async () => {
        const response = await axios.get('http://localhost:8000/myspace/playlists', {
          headers: { Authorization: getCookie("Authorization") }
        })
        console.log(response.data)
        setPlaylists(response.data)
    }

    useEffect(() => {
      index()
    }, [])

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
              <h3>Playlists <Link to='/myspace/addplaylist'>Add</Link></h3>
              <ul>
                {playlists && playlists.map((playlist) => (
                  <li key={playlist.id}>
                    <img src={`http://localhost:8000/${playlist.image}`} alt={`${playlist.name} cover`} width='50px' height='50px' />
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