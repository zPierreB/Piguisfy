import React, { useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import getCookie from '../../utils/getCookie.js'

const Show1Playlist = () => {
  const [playlist, setPlaylist] = useState([])
  const [tracks, setTracks] = useState([])
  const token = getCookie('TOKEN')
  let { id } = useParams()

  const index = async () => {
    const response = await axios.get(`http://localhost:8000/myspace/playlist/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setPlaylist(response.data.playlist[0])
    setTracks(response.data.tracks)
    console.log(response.data)
  }

  useEffect(() => {
    index();
  }, [])

  return (
    <div>
      <h1>Show1Playlist</h1>
      <h2>{playlist.name}</h2>
      <img src={`http://localhost:8000/${playlist.image}`} alt={`${playlist.name}`} width='50px' height='50px'/>
    </div>
  )
}

export default Show1Playlist;