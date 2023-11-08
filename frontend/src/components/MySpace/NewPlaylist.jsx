import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import getCookie from "../../utils/getCookie";

const NewPlaylist = () => {
  const [name, setName] = useState("");
  const [cover, setCover] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getCookie("TOKEN");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", cover);

    await axios.post("http://localhost:8000/myspace/addplaylist", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        navigate("/myspace");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleCoverChange = (e) => {
    console.log(e.target.files[0]);
    setCover(e.target.files[0]);
  };

  return (
    <div className="main">
      <section className="loginRegisterModal">
        <h2>Add a new playlist</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <label htmlFor="name">Name of the playlist</label>
            <input
              type="text"
              name="name"
              id=""
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="image">Cover</label>
            <input
              type="file"
              name="image"
              id=""
              onChange={handleCoverChange}
            />
          </div>
          <div className="inputContainer">
            <p>{errorMessage}</p>
            <button type="submit">Create a playlist</button>
          </div>
        </form>
        <Link to="/myspace">Go back</Link>
      </section>
    </div>
  );
}

export default NewPlaylist;
