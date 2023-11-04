import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'

import { AuthContext } from "../../context/AuthContext"

const Register = ({ changeForm }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const params = { email, password }

    await axios.post('http://localhost:8000/login', params)
      .then(async (response) => {
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

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="name">Username</label>
          <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="name" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="inputContainer">
          <label htmlFor="password">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="inputContainer">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" />
        </div>
        <div className="inputContainer">
          <label htmlFor="profilPicture">Profile Picture</label>
          <input type="file" name="profilPicture" id="profilPicture" />
        </div>
        <div className="btnContainer">
          <p>{errorMessage}</p>
          <button type="submit">Register</button><br />
          <p onClick={changeForm}>Already have an account.</p>
        </div>
      </form>
    </>
  )
}

export default Register