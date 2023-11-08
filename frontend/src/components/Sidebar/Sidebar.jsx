import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import getCookie from '../../utils/getCookie.js'

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([])

  const token = getCookie('TOKEN')

  const index = async () => {
    const response = await axios.get('http://localhost:8000/myspace/playlists', {
      headers: { Authorization: `Bearer ${token}` },
    })
    setPlaylists(response.data)
  }

  useEffect(() => {
    index();
  }, [])

  return(
    <div className='sidebarContainer'>
        {/* <h1>Quelle belle homepage!</h1> */}
      <Link to='/myspace'>Mon espace</Link>
      <div>
        <h1>Piguisfy</h1>
        <nav className='sidebarNav'>
          <h3 className='sidebarTitle'>Menu</h3>
          <section>
          <ul>
            <li>
              <div className='sideBar1Component'>
                <Link to='/'>Home</Link>
              </div>
            </li>
            <li>
              <div className='sideBar1Component'>
                <Link to='/likedSongs'>Liked Songs</Link>
              </div>
            </li>
          </ul>
          </section>
          <h3 className='sidebarTitle'>Playlists <Link to='/myspace/addplaylist'>Add</Link></h3>
          <ul>
            {playlists && playlists.map((playlist) => (
              <li key={playlist.id} className='sideBar1Component'>
                <Link to={`/myspace/playlist/${playlist.id}`}>
                  <img src={`http://localhost:8000/${playlist.image}`} alt={`${playlist.name} cover`} />
                  {playlist.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar