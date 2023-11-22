import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

import getCookie from '../../utils/getCookie.js'
import HamburgerIcon from './HamburgerIcon.jsx'

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([])
  const [user, setUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const token = getCookie('TOKEN')
  const navigate = useNavigate()

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    index();
  }, [])

  return(
    
    <div className={`sidebarContainer`}>
      <HamburgerIcon toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
      <section className={`userIconContainer ${isSidebarOpen ? 'headerNavMobile' : ''}`}>
        <Link to='/myspace' onClick={() => toggleSidebar()}>
          <div className='iconContainer'>
            <img src={`http://localhost:8000/${user && user.profil_pic}`} alt={`${user && user.name} profile picture`} />
          </div>
        </Link>
        <h3 className='usernameContainer'>{user && user.username}</h3>
        <div className="btnContainer">
          <button className='cancelBtn' onClick={() => navigate('/logout')}>Log out</button>
        </div>
        <span className='seperateBar'></span>
        <div className='menuLinkMobile'>
          <ul>
            <li>
              <div className='sidebar1RowNavMobile'>
                <Link to='/' onClick={() => toggleSidebar()}>
                  <h3>Home</h3>
                </Link>
              </div>
            </li>
            <li>
              <div className='sidebar1RowNavMobile'>
                <Link to='/logout' onClick={() => toggleSidebar()}>
                  <h3>Logout</h3>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <div className='listMenu'>
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