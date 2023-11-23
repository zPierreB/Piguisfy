import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'

import getCookie from '../../utils/getCookie.js';

const Edit1Album = () => {
  const [album, setAlbum] = useState([])
  const [name, setName] = useState('')
  const [cover, setCover] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const token = getCookie('TOKEN');
  let { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const get1Album = async () => {
    await axios.get(`http://localhost:8000/myspace/album/${id}`, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      setAlbum(response.data.album[0])
      setName(response.data.album[0].name)
      setCover(response.data.album[0].image)
      setReleaseDate(moment(response.data.album[0].release_date).format("yyyy-MM-DD"))
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      console.log("error loggin in...", errorDescription);
      setErrorMessage(errorDescription);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getCookie('TOKEN');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('releaseDate', releaseDate);
    formData.append('image', cover);

    await axios.put(`http://localhost:8000/myspace/album/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      navigate('/myspace');
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    });
  }

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  useEffect(() => {
    get1Album()
  }, [location])

  return (
    <div className='formModalContainer'>
      <section className='loginRegisterModal'>
        <h1 className='formModalTitle'>Update an album</h1>
        <form onSubmit={handleSubmit}>
          <div className='inputContainer'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id='' defaultValue={name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='inputContainer'>
            <label htmlFor='releaseDate'>Release date</label>
            <input type='date' name='releaseDate' id='' onChange={(e) => setReleaseDate(e.target.value)} defaultValue={releaseDate}/>
          </div>
          <div className='inputContainer'>
            <label htmlFor='image'>Cover</label>
            <input type='file' name='image' id='' defaultValue={cover} onChange={handleCoverChange}/>
          </div>
          <img className='imgFormPreview' src={`http://localhost:8000/${album.image}`} alt="cover" />
          <div className='btnContainer'>
            <button className='cancelBtn' type="button" onClick={() => navigate(`/myspace/album/${album.id}`)}>Cancel</button>
            <button className='updateBtn' type="submit">Update</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Edit1Album;