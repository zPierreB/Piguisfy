import express from 'express'
const router = express.Router()
import { login } from '../controllers/login.js'

router.post('/login', login)

router.get('/login', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <!-- Design by foolishdeveloper.com -->
        <title>Piguisfy</title>
    </head>
    <body>
        <form method='post'>
            <h3>Login Here</h3>
    
            <label for="email">Email</label>
            <input type="email" placeholder="Email" name="email">
    
            <label for="password">Password</label>
            <input type="password" placeholder="Password" name="password">
    
            <button type='submit'>Log In</button>
        </form>
    </body>
    </html>
    
    `)
})

export default router