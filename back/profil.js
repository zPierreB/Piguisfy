const express = require('express');
const router = express.Router();

function createRouter(db) {
    //Mettre les routes ici

    router.post('/createAccount', (req, res, next) => {
        console.log(req.body);
        db.query(
            'INSERT INTO profil (email, username, password, country) VALUES (?,?,?,?)',
        )
    })
}

module.exports = createRouter;