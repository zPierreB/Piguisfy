import { useState } from "react"

import Login from './Login.jsx'
import Register from './Register.jsx'

const LoginPage = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false)

  const changeForm = () => {
    setIsRegisterForm(!isRegisterForm)
  }

  return (
    <div className="formModalContainer">
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