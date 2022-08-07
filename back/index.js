const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host    :'localhost',
    user    :'root',
    database:'piguisfy'
});

connection.connect();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    res.json({message: "App is running"});
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

module.exports = app;