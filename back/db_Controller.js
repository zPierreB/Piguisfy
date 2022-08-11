require('dotenv').config();
const mysql = require('mysql2');

/**
 * Connect to the database and execute the given SQL command with or 
 * without an array of values
 * @param {String} req_sql - The SQL command with ? as values
 * @param {Any[]} paramtb - (Optional) An array of escaped values
 * @returns {mysql.QueryError | Promise<JSON[]>}
 * - On sucess: Results of the query as a Promise
 * - On failure: mysql.QueryError as a Promise
 */
function sql(req_sql, paramtb = []) {

    const connection = mysql.createConnection({
        host    :process.env.DB_HOST,
        user    :process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_DATABASE
    });

    return new Promise((resolve, reject) => {
        connection.connect();
        connection.query(req_sql, paramtb, (err, rows) => {
            if(err) {
                if(err.code == 'ECONNREFUSED') {
                    reject(new Error("Error can't connect to database"));
                }
                reject(new Error({error: "Promise Rejected"}));
            }
            resolve(rows);
        })
    })

}

module.exports = { sql };