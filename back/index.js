require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const profils = require('./profil');
const session = require('express-session');
const path = require('path');
const connection = require('./db_Connection');

const port = process.env.PORT || 8080;

const app = express()
    .use(express.urlencoded({ extended: false }))
    .use(express.static(path.join(__dirname, 'static')))
    .use(cors())
    .use(bodyParser.json())
    .use(profils(connection));

app.get('/', (req, res) => {
    res.json({message: "App is running"});
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

module.exports = app;