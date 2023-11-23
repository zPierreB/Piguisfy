import { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import getCookie from '../utils/getCookie.js'

const UserContext = createContext()

const UserProvider = (props) => {
    const [isLogged, setIsLogged] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState(null)
    const [currentTrack, setCurrentTrack] = useState(null)

    const changeCurrentTrack = (track) => {
      setCurrentTrack(track)
    }

    const authenticateUser = async() => {
      const currentToken = getCookie('TOKEN')
      
      await axios.get(`http://localhost:8000/verify`, {
        Authorization: `Bearer ${currentToken}`,
      })
      .then((response) => {
        setIsLogged(true);
        setIsLoading(false);
        setToken(currentToken);
      })
      .catch((error) => {
        setIsLogged(false);
        setIsLoading(false);
        setToken(null);
      });
    }
          
    return(
      <UserContext.Provider
          value={{
            isLogged,
            isLoading,
            token,
            authenticateUser,
            currentTrack,
            changeCurrentTrack
          }}
      >
          {props.children}
      </UserContext.Provider>
    )
          
}

export { UserProvider, UserContext }
