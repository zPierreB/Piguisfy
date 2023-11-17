import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { findOneByEmail, findOneByUsernameAndEmail, createOneUser } from '../models/user.model.js'
import getTokenFromHeaders from '../middleware/isAuthenticate.js'

export const register = async (req, res) => {
  const { username, email, password, confirmPassword, dateOfBirth } = req.body
  const { profilePicture } = req.file

  if(username === "" || email === "" || password === "" || confirmPassword === "" || dateOfBirth === "" || profilePicture === "") {
    return res.status(400).json({ message: 'Please provide all the required fields.' })
  }

  await findOneByUsernameAndEmail([username, email])
  .then(async(user) => {
    console.log('user', user)
    if(user.length > 0) {
      res.status(400).json({ message: 'Username or email is already taken.' })
      return
    } else if(password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match.' })
      return
    } else if(req.file.path === undefined) {
      res.status(400).json({ message: 'Please upload a file in mp3, wav or mpeg format' })
      return
    } else {
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(password, salt)

      const newPath = req.file.path.replace(/\\/g, "/").split('/')[1]

      await createOneUser([username, email, hashedPassword, dateOfBirth, newPath])
      .then((user) => {
        res.status(201).json({ message: 'User created successfully.' })
      })
      .catch((error) => res.status(500).json({ message: `Internet Server Error: ${error}` }))
    }
  })
}

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
  res.status(200).json({ message: 'User is authenticated.' })
}

export const logout = (req, res) => {
  const token = getTokenFromHeaders(req)
  if(!token) {
    return res.status(401).json({ message: 'No token provided.' })
  } else {
    return res.clearCookie('Authorization')
  }
}

export const getConnectedUserData = async (req, res) => {
  if(req.user === undefined) {
    return res.status(401).json({ message: 'No user connected.' })
  }
  res.status(200).json({ user: req.user });
  return;
}
