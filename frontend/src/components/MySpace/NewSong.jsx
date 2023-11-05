import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

import { UserContext } from '../../context/UserContext.jsx'
import getDuration from '../../utils/getDuration.js'
import getCookie from '../../utils/getCookie.js';

const NewSong = () => {
  const [file, setFile] = useState(null)
  const [duration, setDuration] = useState('')
  const [albums, setAlbums] = useState([])
  const [selectedAlbumId, setSelectedAlbumId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getAlbums()
  }, [])

  const { token } = useContext(UserContext)

  const navigate = useNavigate()

  const getAlbums = async() => {

    await axios.get('http://localhost:8000/myspace/albums', {
      headers: { Authorization: getCookie("Authorization") },
    })
    .then((response) => {
      console.log(response.data)
      setAlbums(response.data)
    })
    .catch((error) => {
      setErrorMessage(error)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('audioFile', file)
    formData.append('duration', duration)
    formData.append('album', selectedAlbumId)

    await axios.post('http://localhost:8000/myspace/addsong', formData, {
      headers: { "Content-Type": "multipart/form-data", Authorization: getCookie("Authorization") },
    })
    .then((response) => {
      console.log(response.data)

      navigate('/myspace')
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
  };

  const handleFileChange = async(e) => {
    setFile(e.target.files[0])
    await getDuration(e.target.files[0])
    .then((duration) => {
      setDuration(duration)
    })
    .catch((error) => {
      setErrorMessage(error)
    })
  }

  return(
    <div className='main'>
      <section className='loginRegisterModal'>
      <h2>Add a new song</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputContainer'>
            <label htmlFor='path'>File</label>
            <input type='file' name='audioFile' onChange={handleFileChange}/>
          </div>
          <div className='inputContainer'>
            <label htmlFor='album'>Album</label>
            <select name='album' onChange={(e) => setSelectedAlbumId(e.target.value)}>
              <option defaultValue="none" disabled>Select an album</option>
              {albums.map((album, index) => {
                return <option key={index} value={album.id}>{album.name}</option>
              })}
            </select>
          </div>
          <div className='btnContainer'>
            <p>{errorMessage}</p>
            <Link to='/myspace'>Cancel</Link>
            <button type="submit">Create a song</button>
          </div>
        </form>
      </section>
    </div>
  )

}

export default NewSong;