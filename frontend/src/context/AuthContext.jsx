import { useState, createContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
    }

    const authenticateUser = () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        axios
        // eslint-disable-next-line no-undef
        .get(`http://localhost:8000/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then((response) => {
              const user = response.data;
              setIsLogged(true);
              setIsLoading(false);
              setUser(user);
            })
            .catch((error) => {
              setIsLogged(false);
              setIsLoading(false);
              setUser(null);
            });
        } else {
          setIsLogged(false);
          setIsLoading(false);
          setUser(null);
        }
      }

      return(
        <AuthContext.Provider
            value={{
            isLogged,
            isLoading,
            user,
            storeToken,
            authenticateUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
      )
}

export { AuthProvider, AuthContext }
