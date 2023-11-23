import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import axios from 'axios'

import getCookie from '../../utils/getCookie.js';

// import { UserContext } from "../../context/UserContext"

const Edit1Playlist = () => {
  const [playlist, setPlaylist] = useState([])
  const [name, setName] = useState('')
  const [cover, setCover] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const token = getCookie("TOKEN");
  let { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const get1Playlist = async () => {
    await axios.get(`http://localhost:8000/myspace/playlist/${id}`, {
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setPlaylist(response.data.playlist[0])
        setName(response.data.playlist[0].name)
        setCover(response.data.playlist[0].image)
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getCookie("TOKEN");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", cover);

    await axios.put(`http://localhost:8000/myspace/playlist/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        navigate("/myspace");
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
    get1Playlist()
  }, [location])

  return (
    <div className="formModalContainer">
      <section className="loginRegisterModal">
        <h1 className="formModalTitle">Update a playlist</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id=""
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="image">Cover</label>
            <input
              type="file"
              name="image"
              id=""
              defaultValue={cover}
              onChange={handleCoverChange}
            />
          </div>
          <img className='imgFormPreview' src={`http://localhost:8000/${playlist.image}`} alt="cover" />
          <div className="btnContainer">
            <button className='cancelBtn' onClick={() => navigate(`/myspace/playlist/${playlist.id}`)}>Cancel</button>
            <button className='updateBtn' type="submit">Update</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Edit1Playlist