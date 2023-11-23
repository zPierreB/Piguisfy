import Cookies from 'universal-cookie';

function getCookie (cookieName) {
  const cookies = new Cookies();
  const cookie = cookies.get(cookieName);
  return cookie;
}

export default getCookie;