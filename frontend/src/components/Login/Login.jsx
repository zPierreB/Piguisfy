import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import { UserContext } from "../../context/UserContext"
import getCookie from "../../utils/getCookie"

const Login = ({ changeForm }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const { getUserData, storeToken, authenticateUser } = useContext(UserContext)

  // getUserData()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const params = { email, password }

    await axios.post('http://localhost:8000/login', params, {
      withCredentials: true
    })
      .then(async (response) => {
        // const jwt = response.data.authToken

        // await storeToken(jwt)
        // await authenticateUser()

        navigate('/')
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log("error loggin in...", errorDescription);
        setErrorMessage(errorDescription);
      });
  }

  useEffect(() => {
    async function fetchData() {
      const monfion = await getUserData();
      console.log("m=",monfion);
      if(monfion) {
        navigate("/");
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <h1>Log In</h1>
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