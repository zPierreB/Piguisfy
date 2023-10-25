import 'dotenv/config'
import mysql from 'mysql2/promise'

const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env

const query = async (requestSQL, params) => {
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    })
    const [results, fields] = await connection.query(requestSQL, params)
    return results
}

export default query