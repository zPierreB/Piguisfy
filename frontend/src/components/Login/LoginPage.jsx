import { useState } from "react"

import Login from './Login.jsx'
import Register from './Register.jsx'

const LoginPage = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false)

  const changeForm = () => {
    setIsRegisterForm(!isRegisterForm)
  }

  console.log(isRegisterForm)

  return (
    <div className="main">
      <section className="loginRegisterModal">
        {isRegisterForm ?
          <Register changeForm={changeForm} />
          :
          <Login changeForm={changeForm} />
        }
      </section>
    </div>
  )
}

export default LoginPage