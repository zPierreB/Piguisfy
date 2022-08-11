const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

function createRouter(db) {
    //Mettre les routes ici

    // add a new user into the DB
    router.post('/APIPiguisfy', (req, res, next) => {
        const salt = bcrypt.genSaltSync(10);
        const pswd  =bcrypt.hashSync(req.body.password, salt);
        db.query(
            'INSERT INTO profil (email, username, password, country) VALUES (?,?,?,?)',
            [req.body.email, req.body.username, pswd, req.body.country],
            (error) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok'});
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;