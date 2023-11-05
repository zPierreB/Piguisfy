function getCookie (cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function(el) {
    let [key,value] = el.split('=');
    cookie[key.trim()] = value;
  })
  if(cookie[cookieName] === undefined) {
    return null
  } else {
    return cookie[cookieName];
  }
}

export default getCookie;