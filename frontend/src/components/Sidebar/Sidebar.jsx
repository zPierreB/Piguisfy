import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

import getCookie from '../../utils/getCookie.js'

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([])
  const [user, setUser] = useState(null)

  const token = getCookie('TOKEN')

  let urls = [
    'http://localhost:8000/myspace/playlists',
    'http://localhost:8000/connected-user',
  ]

  const index = async () => {
    const requests = urls.map(url => axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    }))

    await axios.all(requests)
    .then(axios.spread((...responses) => {
      setPlaylists(responses[0].data)
      setUser(responses[1].data.user)
    }))
    .catch(errors => {
      console.log(errors)
    })
  }

  useEffect(() => {
    index();
  }, [])

  return(
    <div className='sidebarContainer'>
      <section className='userIconContainer'>
        <Link to='/myspace'>
          <div className='iconContainer'>
            <img src={`http://localhost:8000/${user && user.profil_pic}`} alt={`${user && user.name} profile picture`} />
          </div>
        </Link>
        <h3 className='usernameContainer'>{user && user.username}</h3>
      </section>
      <div>
        <nav className='sidebarNav'>
          <section>
            <h3 className='sidebarTitle'>Menu</h3>
            <ul>
              <li>
                <div className='sidebar1Component'>
                  <Link to='/'>
                    <div className='sidebarIconContainer'>
                      <FontAwesomeIcon icon={faHouse} size="lg"/>
                    </div>
                    <h3>Home</h3>
                  </Link>
                </div>
              </li>
            </ul>
          </section>
          <section>
            <h3 className='sidebarTitle'>Playlists <Link to='/myspace/addplaylist'>Add</Link></h3>
            <ul>
              {playlists && playlists.map((playlist) => (
                <li key={playlist.id} className='sidebar1Component'>
                  <Link to={`/myspace/playlist/${playlist.id}`}>
                    <img src={`http://localhost:8000/${playlist.image}`} alt={`${playlist.name} cover`} />
                    <h3>{playlist.name}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar