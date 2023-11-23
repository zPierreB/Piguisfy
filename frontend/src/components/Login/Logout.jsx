import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// import getCookie from '../../utils/getCookie.js';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Logout = () => {

  const logout = async() => {
    await cookies.remove('TOKEN', { path: '/' })

    window.location.reload()
  }

  useEffect(() => {
    logout()
  }, [])

  return (
    <>
      <Navigate to='/login' />
    </>
  );
};

export default Logout;
