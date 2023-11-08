import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import getCookie from '../../utils/getCookie.js';

const NewAlbum = () => {
  const [name, setName] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [cover, setCover] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    const token = getCookie('TOKEN')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('releaseDate', releaseDate)
    formData.append('image', cover)
  
    await axios.post('http://localhost:8000/myspace/addalbum', formData, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response.data)

      navigate('/myspace')
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
  }

  const handleCoverChange = (e) => {
    console.log(e.target.files[0])
    setCover(e.target.files[0])
  }

  return(
    <div className='main'>
      <section className='loginRegisterModal'>
        <h2>Add a new album</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputContainer'>
            <label htmlFor="name">Name of the album</label>
            <input type="text" name="name" id="" onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='inputContainer'>
            <label htmlFor='releaseDate'>Release date</label>
            <input type='date' name='releaseDate' id='' onChange={(e) => setReleaseDate(e.target.value)}/>
          </div>
          <div className='inputContainer'>
            <label htmlFor='image'>Cover</label>
            <input type='file' name='image' id='' onChange={handleCoverChange}/>
          </div>
          <div>
            <p>{errorMessage}</p>
            <Link to='/myspace'>Cancel</Link>
            <button type="submit">Create a song</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default NewAlbum