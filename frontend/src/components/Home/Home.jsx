import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import getCookie from '../../utils/getCookie.js'
const Home = () => {
  const [playlists, setPlaylists] = useState([])

  const token = getCookie('TOKEN')

  const index = async () => {
    const response = await axios.get('http://localhost:8000/playlists', {
      headers: { Authorization: `Bearer ${token}` },
    })
    setPlaylists(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    index();
  }, [])

  return(
      <div className='pageContainer'>
        <h1>Piguisfy</h1>
        <section className='homeList1Container'>
          <div className='titleListContainer'>
            <h2>Latest Playlists</h2>
          </div>
          <div className='playlistsContainer'>
            {playlists.map((playlist, index) => (
                <Link to={`/playlist/${playlist.id}`} key={index}>
                  <div className='imgList1Container'>
                    <img src={`http://localhost:8000/${playlist.image}`} alt={`${playlist.name} name`} />
                  </div>
                  <div className='textList1Container'>
                    <h3>{playlist.name}</h3>
                    <h3>Playlist</h3>
                  </div>
                </Link>
            ))}
          </div>
        </section>
      </div>
  )
}

export default Home