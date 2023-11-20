import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Cookies from 'universal-cookie'

import { UserContext } from "../../context/UserContext"
import getCookie from "../../utils/getCookie"

const cookies = new Cookies()

const Login = ({ changeForm }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const { authenticateUser } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const params = { email, password }

    await axios.post('http://localhost:8000/login', params, {
      withCredentials: true
    })
      .then(async(response) => {
        cookies.set('TOKEN', response.data.authToken, { path: '/' })

        await authenticateUser()

        navigate('/')
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log("error loggin in...", errorDescription);
        setErrorMessage(errorDescription);
      });
  }

  return (
    <>
      <h1 className="formModalTitle">Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="name" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="btnContainer">
          <p>{errorMessage}</p>
          <button type="submit">Log in</button><br />
          <p onClick={changeForm}>Create an account.</p>
        </div>
      </form>
    </>
  )
}

export default Login