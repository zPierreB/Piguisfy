import { useState ,useEffect, useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import { UserContext } from '../../../context/UserContext.jsx'
import getCookie from '../../../utils/getCookie.js'
import { secondsToMinutesAndSeconds } from '../../../utils/getDuration.js'


const Playlist = () => {
  const [playlist, setPlaylist] = useState([])
  const [tracks, setTracks] = useState([])
  const token = getCookie('TOKEN')
  let { id } = useParams()
  const location = useLocation()

  const { changeCurrentTrack } = useContext(UserContext)
  
  const index = async () => {
    const response = await axios.get(`http://localhost:8000/playlist/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setPlaylist(response.data.playlist[0])
    setTracks(response.data.tracks)
  }

  useEffect(() => {
    index()
  }, [location])

  return (
    <div className='pageContainer'>
      <section className='homeList1Container'>
        <div className='show1PlaylistOrAlbumHeader'>
          <div className='show1PlaylistOrAlbumImage'>
            <img src={`http://localhost:8000/${playlist.image}`} alt={`${playlist.name}`} />
          </div>
          <div className='show1PlaylistOrImageText'>
            <h3>Playlist</h3>
            <h2>{playlist.name}</h2>
            <h3>{moment(playlist.created_at, ).format("YYYY")}<br />{tracks.length} titres</h3>
          </div>
        </div>
        <li className='trackPlaylistHeader'>
          <div className='trackPlaylistCell'>
            <p>#</p>
          </div>
          <div className='trackPlaylistCell'>
            <p>TITLE</p>
          </div>
          <div className='trackPlaylistCell'>
            <p>ALBUM</p>
          </div>
          <div className='trackPlaylistCell'>
            <p>DURATION</p>
          </div>
        </li>
        <ul>
          {tracks.map((track, index) => (
            <li key={index} className='trackPlaylistRow'>
              <div className='trackPlaylistCell'>
                <p className='trackPlaylistRowIndex'>{index + 1}</p>
                <div className='iconPlayTrackPlaylist'>
                  <FontAwesomeIcon icon={faPlay} onClick={() => changeCurrentTrack(track)}/>
                </div>
              </div>
              <div className='trackPlaylistCell'>
                <p className='trackPlaylistTitle'>{track.name}</p>
                <p>{track.artist_name}</p>
              </div>
              <div className='trackPlaylistCell'>
                <p>{track.album_name}</p>
              </div>
              <div className='trackPlaylistCell'>
                <p>{secondsToMinutesAndSeconds(track.duration)}</p>
              </div>
            </li>
          
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Playlist;