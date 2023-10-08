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

        console.log(email, password)

        
        await axios.post('http://localhost:8000/login', params)
        .then((response) => {
            const jwt = response.data.authToken
            console.log(response.data)

            storeToken(jwt)
            authenticateUser()

            navigate('/')
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            console.log("error loggin in...", errorDescription);
            setErrorMessage(errorDescription);
        });
    }
    
    return(
        <>
            <h1>Please Log In</h1>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <p>{errorMessage}</p>
                    <button type="submit">Log in</button>
                </div>
            </form>
        </>
    )
}

export default Login