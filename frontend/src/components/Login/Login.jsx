import { useState } from "react"
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()

        const params = { email, password }
        
        await axios.post('http://localhost:8000/login', params)
        .then((response) => {
            const jwt = response.data.authToken
            console.log(jwt)
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
                    <button type="submit">Log in</button>
                </div>
            </form>
        </>
    )
}

export default Login