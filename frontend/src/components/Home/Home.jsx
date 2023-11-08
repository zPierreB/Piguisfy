import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import getCookie from '../../utils/getCookie.js'
const Home = () => {
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
      <>
          
      </>
  )
}

export default Home