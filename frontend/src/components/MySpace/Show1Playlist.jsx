import { useState ,useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import getCookie from '../../utils/getCookie.js'
import { secondsToMinutesAndSeconds } from '../../utils/getDuration.js'

const Show1Playlist = () => {
  const [playlist, setPlaylist] = useState([])
  const [tracks, setTracks] = useState([])
  const token = getCookie('TOKEN')
  let { id } = useParams()
  const location = useLocation()

  const index = async () => {
    const response = await axios.get(`http://localhost:8000/myspace/playlist/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setPlaylist(response.data.playlist[0])
    setTracks(response.data.tracks)
    console.log(response.data)
  }

  const delete1Track = async (trackId) => {
    await axios.delete(`http://localhost:8000/myspace/playlist/${id}/track/${trackId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    window.location.reload()
  }

  useEffect(() => {
    index()
  }, [location])

  return (
    <div>
      <section>
        <h1>Show1Playlist</h1>
        <h2>{playlist.name}</h2>
        <FontAwesomeIcon icon={faPenToSquare} />
        <img src={`http://localhost:8000/${playlist.image}`} alt={`${playlist.name}`} width='50px' height='50px'/>
      </section>
      <section>
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
      </section>
      <section>
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
                <p>{track.album_name}</p>
              </div>
              <div className='trackPlaylistCell'>
                <p>{secondsToMinutesAndSeconds(track.duration)}</p>
              </div>
              <div className='trackPlaylistCell'>
                <article>
                  <p>edit</p>
                  <FontAwesomeIcon icon={faTrashCan} onClick={() => delete1Track(track.id)}/>
                </article>
              </div>
            </li>
          
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Show1Playlist;