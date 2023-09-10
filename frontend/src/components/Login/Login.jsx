import { useState } from "react"

const Login = () => {
    const [user, setUser] = useState([])


    return(
        <>
            <h1>Please Log In</h1>
            <form action="">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" />
                </div>
                <div>
                    <button type="submit">Log in</button>
                </div>
            </form>
        </>
    )
}

export default Login