import { useState, createContext } from 'react'
import axios from 'axios'
import getCookie from '../utils/getCookie.js'

const UserContext = createContext()

const UserProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const getUserData = async() => {
      let axio = await axios.get('http://localhost:8000/getConnectedUser', {
        headers: { Authorization: getCookie("Authorization") }
      })

      if (axio.status !== 200) {
        setIsLogged(false);
        setIsLoading(false);
        setUser(null);
        return false;
      } else {
        let response = await axio.data;
        console.log('r', response)
        setIsLogged(true);
        setIsLoading(false);
        setUser(response.user);
        return true;
      } 
    }
        

    const authenticateUser = async() => {
      const storedToken = localStorage.getItem("authToken")
      console.log('test', storedToken);

      if (storedToken) {
        await axios.get(`http://localhost:8000/verify`, {
          headers: { Authorization: getCookie("Authorization") },
        })
          .then((response) => {
            const user = response.data;
            setIsLogged(true);
            setIsLoading(false);
            setUser(user);
            setToken(storedToken);
          })
          .catch((error) => {
            setIsLogged(false);
            setIsLoading(false);
            setUser(null);
            setToken(null);
          });
        } else {
          setIsLogged(false);
          setIsLoading(false);
          setUser(null);
          setToken(null);
        }
        
      }
      return(
        <UserContext.Provider
            value={{
            getUserData,
            isLogged,
            isLoading,
            user,
            authenticateUser,
            token
            }}
        >
            {props.children}
        </UserContext.Provider>
      )
          
}

export { UserProvider, UserContext }
