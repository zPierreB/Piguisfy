import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Register = ({ changeForm }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('confirmPassword', confirmPassword)
    formData.append('dateOfBirth', dateOfBirth)
    formData.append('image', profilePicture)

    await axios.post('http://localhost:8000/register', formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(async (response) => {
        console.log(response.data)

        navigate('/login')
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }

  const handleFileChange = async (e) => {
    setProfilePicture(e.target.files[0])
  }

  return (
    <>
      <h1 className="formModalTitle">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className='formContainer'>
          <section className="leftFormContainer">
            <div className="inputContainer">
              <label htmlFor="name">Username</label>
              <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="inputContainer">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
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
              <input type="date" name="dateOfBirth" id="dateOfBirth" onChange={(e) => setDateOfBirth(e.target.value)}/>
            </div>
          </section>
          <section className="rightFormContainer">
            <div className="inputContainer">
              <label htmlFor="profilPicture">Profile Picture</label>
              <input type="file" name="profilPicture" id="profilPicture" onChange={handleFileChange}/>
            </div>
          </section>
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