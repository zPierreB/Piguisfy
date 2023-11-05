import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import axios from 'axios';
import getCookie from '../../utils/getCookie.js';


const Logout = () => {

  const logout = async() => {
    await axios.get('http://localhost:8000/logout', {
      headers: { Authorization: getCookie("Authorization") }
    })
    .then((response) => {
      document.cookie("Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;")
    })
    .catch((error) => {
      console.log('error: ', error.response.data)
    })
    
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <div>
      <Navigate to='/login' />
    </div>
  );
};

export default Logout;
