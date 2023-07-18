import 'dotenv/config'
import mysql from 'mysql2/promise'

const { DB_NAME, DB_HOST, DB_USER } = process.env

const query = async (requestSQL, params) => {
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        database: DB_NAME
    })
    const [results, fields] = await connection.query(requestSQL, params)
    return results
}

export default query