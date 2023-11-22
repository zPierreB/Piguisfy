import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import getCookie from '../../utils/getCookie.js'
const Home = () => {
  const [playlists, setPlaylists] = useState([])
  const [albums, setAlbums] = useState([])

  const token = getCookie('TOKEN')

  let urls = [
    'http://localhost:8000/playlists',
    'http://localhost:8000/albums',
  ]

  const index = async () => {
    const requests = urls.map(url => axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    }))

    await axios.all(requests)
    .then(axios.spread((...responses) => {
      setPlaylists(responses[0].data)
      setAlbums(responses[1].data)
    }))
    .catch(errors => {
      console.log(errors)
    })
  }

  useEffect(() => {
    index();
  }, [])

  return(
      <div className='pageContainer'>
        <h1 className='mainTitle'>Piguisfy</h1>
        <section className='homeList1Container'>
          <div className='titleListContainer'>
            <h2>Latest Playlists</h2>
          </div>
          <div className='playlistsContainer'>
            {playlists.map((playlist, index) => (
                <Link to={`/playlist/${playlist.id}`} key={index} className='oneCardContainer'>
                  <div className='imgList1Container'>
                    <img src={`http://localhost:8000/${playlist.image}`} alt={`${playlist.name} name`} />
                  </div>
                  <div className='textList1Container'>
                    <h3 className='trackPlaylistTitle'>{playlist.name}</h3>
                    <h3 className='trackPlaylistTitle'>Playlist</h3>
                  </div>
                </Link>
            ))}
          </div>
        </section>
        <section className='homeList1Container'>
          <div className='titleListContainer'>
            <h2>Latest Albums</h2>
          </div>
          <div className='playlistsContainer'>
            {albums.map((album, index) => (
                <Link to={`/album/${album.id}`} key={index} className='oneCardContainer'>
                  <div className='imgList1Container'>
                    <img src={`http://localhost:8000/${album.image}`} alt={`${album.name} name`} />
                  </div>
                  <div className='textList1Container'>
                    <h3 className='trackPlaylistTitle'>{album.name}</h3>
                    <h3 className='trackPlaylistTitle'>Album</h3>
                  </div>
                </Link>
            ))}
          </div>
        </section>
      </div>
  )
}

export default Home