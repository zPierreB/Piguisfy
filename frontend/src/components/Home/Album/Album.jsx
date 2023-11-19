import { useState ,useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import getCookie from '../../../utils/getCookie.js'
import { secondsToMinutesAndSeconds } from '../../../utils/getDuration.js'


const Playlist = () => {
  const [album, setAlbum] = useState([])
  const [tracks, setTracks] = useState([])
  const token = getCookie('TOKEN')
  let { id } = useParams()
  const location = useLocation()
  
  const index = async () => {
    const response = await axios.get(`http://localhost:8000/album/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setAlbum(response.data.album[0])
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
            <img src={`http://localhost:8000/${album.image}`} alt={`${album.name}`} />
          </div>
          <div className='show1PlaylistOrImageText'>
            <h3>Album</h3>
            <h2>{album.name}</h2>
            <h3>{moment(album.created_at).format("YYYY")}<br />{tracks.length} titres</h3>
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
          </div>
          <div className='trackPlaylistCell'>
            <p>DURATION</p>
          </div>
        </li>
        <ul>
          {tracks.map((track, index) => (
            <li key={index} className='trackPlaylistRow'>
              <div className='trackPlaylistCell'>
                <p>{index + 1}</p>
              </div>
              <div className='trackPlaylistCell'>
                <p className='trackPlaylistTitle'>{track.name}</p>
                <p>{track.artist_name}</p>
              </div>
              <div className='trackPlaylistCell'>
              </div>
              <div className='trackPlaylistCell'>
                <p>{secondsToMinutesAndSeconds(track.duration)}</p>
              </div>
              {/* <div className='trackPlaylistCell'>
                <article className='iconContainerHeader'>
                  <FontAwesomeIcon icon={faTrashCan} onClick={() => delete1Track(track.id)}/>
                </article>
              </div> */}
            </li>
          
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Playlist;