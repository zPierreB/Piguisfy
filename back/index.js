const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const profils = require('./profil');

const connection = mysql.createConnection({
    host    :'localhost',
    user    :'root',
    password:'',
    database:'piguisfy'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
    .use(express.json())
    .use(express.urlencoded({ extended: false}))
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