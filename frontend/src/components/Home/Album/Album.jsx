import { useState ,useEffect, useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons'

import { UserContext } from '../../../context/UserContext.jsx'

import getCookie from '../../../utils/getCookie.js'
import { secondsToMinutesAndSeconds } from '../../../utils/getDuration.js'


const Playlist = () => {
  const [album, setAlbum] = useState([])
  const [tracks, setTracks] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [showPlaylists, setShowPlaylists] = useState(false)
  const [selectedTrackId, setSelectedTrackId] = useState('')
  const token = getCookie('TOKEN')
  let { id } = useParams()
  const location = useLocation()

  const { changeCurrentTrack } = useContext(UserContext)
  
  const index = async () => {
    const response = await axios.get(`http://localhost:8000/album/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setAlbum(response.data.album[0])
    setTracks(response.data.tracks)
  }

  const showSelectPlaylist = async (trackId) => {
    setShowPlaylists(true)
    setSelectedTrackId(trackId)
    await axios.get(`http://localhost:8000/myspace/playlists`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response.data)
      setPlaylists(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const add1trackToPlaylist = async (playlistId, trackId) => {
    const formData = new FormData()
    formData.append('playlistId', playlistId)
    formData.append('trackId', trackId)
    await axios.post(`http://localhost:8000/myspace/playlist/${playlistId}/addtrack/${trackId}`, formData, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      window.location.reload()
    })
    .catch((error) => {
      console.log(error)
    })
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
          {showPlaylists &&
            <div className='inputContainer selectAddtrack'>
              <select name='playlist' onChange={(e) => add1trackToPlaylist(e.target.value, selectedTrackId)}>
                <option defaultValue="none">Select a playlist</option>
                {playlists && playlists.map((playlist, index) => {
                  return <option key={index} value={playlist.id}>{playlist.name}</option>
                })}
              </select>
            </div>
          }
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
              </div>
              <div className='trackPlaylistCell'>
                <p>{secondsToMinutesAndSeconds(track.duration)}</p>
              </div>
              <div className='trackPlaylistCell'>
                <article className='iconContainerHeaderAdd'>
                  <FontAwesomeIcon icon={faPlus} onClick={() => showSelectPlaylist(track.id)}/>
                </article>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Playlist;