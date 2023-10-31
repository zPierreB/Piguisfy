import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import { AuthContext } from "../../context/AuthContext"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)
    
    const handleSubmit = async(e) => {
        e.preventDefault()

        const params = { email, password }
       
        await axios.post('http://localhost:8000/login', params)
        .then(async(response) => {
            const jwt = response.data.authToken

            await storeToken(jwt)
            await authenticateUser()

            navigate('/')
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            console.log("error loggin in...", errorDescription);
            setErrorMessage(errorDescription);
        });
    }
    
    return(
      <div className="main">
        <section className="loginRegisterModal">
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="name" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="inputContainer">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="btnContainer">
              <p>{errorMessage}</p>
              <button type="submit">Log in</button>
            </div>
          </form>
        </section>
      </div>
    )
}

export default Login