import express from 'express'
import 'dotenv/config'

import userRouter from './routes/user.routes.js'

const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', userRouter)

app.get('*', (req, res) => {
    res.redirect('/login')
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})