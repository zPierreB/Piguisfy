import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';


import getCookie from '../../utils/getCookie.js';
import { useEffect } from 'react';

const MySpace = () => {

  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);

  const navigate = useNavigate()
  const token = getCookie('TOKEN')
  let urls = [
    'http://localhost:8000/myspace/playlists',
    'http://localhost:8000/myspace/albums',
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

  return (
    <div className='pageContainer'>
      <h1 className='mainTitle'>My space</h1>
      <section className='homeList1Container'>
        <div className='titleListContainerAdmin'>
          <h2>My Playlists</h2>
          <div className="btnContainerAdmin">
            <button className='addBtn' onClick={() => navigate('/myspace/addplaylist')}>Add <FontAwesomeIcon icon={faCirclePlus} /></button>
          </div>
        </div>
        <div className='playlistsContainer'>
          {playlists.map((playlist, index) => (
            <Link to={`/myspace/playlist/${playlist.id}`} key={index} className='oneCardContainer'>
              <div className='imgList1Container'>
                <img src={`http://localhost:8000/${playlist.image}`} alt={`${playlist.name} name`} />
              </div>
              <div className='textList1Container'>
                <h3>{playlist.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className='homeList1Container'>
        <div className='titleListContainerAdmin'>
          <h2>My Albums</h2>
          <div className="btnContainerAdmin">
            <button className='addBtn' onClick={() => navigate('/myspace/addalbum')}>Add <FontAwesomeIcon icon={faCirclePlus} /></button>
          </div>
        </div>
        <div className='playlistsContainer'>
          {albums.map((album, index) => (
            <Link to={`/myspace/album/${album.id}`} key={index} className='oneCardContainer'>
              <div className='imgList1Container'>
                <img src={`http://localhost:8000/${album.image}`} alt={`${album.name} name`} />
              </div>
              <div className='textList1Container'>
                <h3>{album.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className='homeList1Container'>
        <div className='titleListContainerAdmin'>
          <h2>My Songs</h2>
          <div className="btnContainerAdmin">
            <button className='addBtn' onClick={() => navigate('/myspace/addsong')}>Add <FontAwesomeIcon icon={faCirclePlus} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MySpace;
