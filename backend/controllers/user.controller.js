import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { findOneByEmail } from '../models/user.model.js'

export const login = async (req, res) => {
    const { email, password } = req.body

    if(email === "" || password === "") {
        return res.status(400).json({ message: 'Please provide an email and a password.' })
    }

    await findOneByEmail(email)
    .then((user) => {
      if(user.length < 1) {
        res.status(401).json({ message: 'Provided informations are incorrect.' })
        return    
      } else if(!bcrypt.compareSync(password, user[0].password)) {
        res.status(401).json({ message: "Unable to authenticate the user" });
      } else {
        const payload = { 'id': user[0].id, 'email': user[0].email }
        
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        })
        res.status(200).json({ authToken: authToken })
      }
    })
    .catch((error) => res.status(500).json({ message: `Internet Server Error: ${error}` }))
}
// TO DELETE BECAUSE USER IS CHECK IN MODEL
export const verify = (req, res) => {
  res.status(200).json(req.payload)
}

export const logout = () => {
  if(localStorage.getItem('authToken')) {
      localStorage.removeItem('authToken')
  }
}

