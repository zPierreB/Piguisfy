import { useEffect, useState, useContext } from 'react';
import axios from 'axios'

import { AuthContext } from '../../context/AuthContext.jsx'
import getDuration from '../../utils/getDuration.js'

const NewSong = () => {
  const [file, setFile] = useState(null)
  const [duration, setDuration] = useState('')
  const [albums, setAlbums] = useState([])
  const [selectedAlbumId, setSelectedAlbumId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getAlbums()
  }, [])

  const { user, token } = useContext(AuthContext)

  const getAlbums = async() => {

    await axios.get('http://localhost:8000/myspace/albums', {
      headers: { Authorization: `Bearer ${token}` },
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
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      throw error.response.data
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
    <div>
      <h2>Add a new song</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='path'>File</label>
          <input type='file' name='audioFile' onChange={handleFileChange}/>
        </div>
        <div>
          <label htmlFor='album'>Album</label>
          <select name='album' onChange={(e) => setSelectedAlbumId(e.target.value)}>
            {albums.map((album, index) => {
              return <option key={index} value={album.id}>{album.name}</option>
            })}
          </select>
        </div>
        <div>
          <button type="submit">Create a song</button>
        </div>
      </form>
    </div>
  )

}

export default NewSong;