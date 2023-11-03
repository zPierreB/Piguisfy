import { useState, createContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const storeToken = (token) => {
      localStorage.setItem('authToken', token)
    }

    const authenticateUser = async() => {
      const storedToken = localStorage.getItem("authToken")
      console.log('test', storedToken);

      if (storedToken) {
        await axios.get(`http://localhost:8000/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
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
        <AuthContext.Provider
            value={{
            isLogged,
            isLoading,
            user,
            storeToken,
            authenticateUser,
            token
            }}
        >
            {props.children}
        </AuthContext.Provider>
      )
}

export { AuthProvider, AuthContext }
