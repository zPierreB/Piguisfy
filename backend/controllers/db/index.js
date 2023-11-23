import 'dotenv/config'
import mysql from 'mysql2/promise'

const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env

// Define a function named 'query' for executing SQL queries on a MySQL database
const query = async (requestSQL, params) => {
    // Create a connection to the MySQL database using the specified environment variables
    const connection = await mysql.createConnection({
        host: DB_HOST,           // Database host
        user: DB_USER,           // Database user
        password: DB_PASSWORD,   // Database password
        database: DB_NAME        // Database name
    });

    // Execute the SQL query with the provided parameters and retrieve results
    const [results, fields] = await connection.query(requestSQL, params);

    // Return the query results
    return results;
}

export default query