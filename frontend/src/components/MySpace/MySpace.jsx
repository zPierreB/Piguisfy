import React from 'react';
import { Link } from 'react-router-dom';

const MySpace = () => {

  // const [playlists, setPlaylists] = useState([]);
  // const [albums, setAlbums] = useState([]);
  // const [songs, setSongs] = useState([]);

  // const index = async () => {
  //   const response = await axios.get('http://localhost:8000/myspace');
  //   setPlaylists(response.data.myspace);
  // }

  return (
    <div>
      <h1>My space</h1>
      <Link to='/myspace/addsong'>Publier une nouvelle chanson!</Link>
      <Link to='/myspace/addalbum'>Publier un nouvel album!</Link>
      <Link to='/logout'>Log out</Link>
    </div>
  );
}

export default MySpace;
