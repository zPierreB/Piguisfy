const express = require('express');
const router = express.Router();

function createRouter(db) {
    //Mettre les routes ici

    router.post('/APIPiguisfy', (req, res, next) => {
        console.log(req.body);
        db.query(
            'INSERT INTO profil (email, username, password, country) VALUES (?,?,?,?)',
            [req.body.email, req.body.username, req.body.password, req.body.country],
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