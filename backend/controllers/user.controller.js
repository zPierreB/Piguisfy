import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { findOneByEmail } from '../models/user.model.js'

export const login = async (req, res) => {
    const { email, password } = req.body

    if(email === "" || password === "") {
        res.status(400).json({ message: 'Please provide an email and a password.' })
    }

    console.log(res.data)

    await findOneByEmail(email)
    .then((user) => {
      console.log(user)

      if(user.length < 1) {
        res.status(401).json({ message: 'User not found.' })
        return
      }
      
      if(!bcrypt.compareSync(password, user[0].password)) {
        res.status(401).json({ message: "Unable to authenticate the user" });
      } else {
        const { id, email } = user
        const payload = { id, email }
        
        const authToken = jwt.sign(payload, process.env.PRIVATE_KEY, {
          algorithm: "HS256",
          expiresIn: "6h",
        })
        
        res.status(200).json({ authToken: authToken })
      }
    })
    .catch((error) => res.status(500).json({ message: `Internet Server Error: ${error}` }))
}

export const logout = async(req, res) => {
    if(req.session.isLogged) {
        req.session.destroy()
    }
    console.log(req.session)
    return res.redirect('/login')
}

