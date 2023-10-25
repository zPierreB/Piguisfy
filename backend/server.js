import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import userRouter from './routes/user.routes.js'
import trackRouter from './routes/track.routes.js'

const { PORT, CLIENT_URL } = process.env

const app = express()

const corsOptions = {
    origin: CLIENT_URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
}

app.use(cors(corsOptions))
app.use(fileUpload())
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', userRouter)
app.use('/myspace', trackRouter)

app.get('*', (req, res) => {
    res.redirect('/login')
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})