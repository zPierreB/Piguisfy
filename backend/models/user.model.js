import dbConnect from '../controllers/db/index.js'

export const findOneByEmail = async (arg) => {
    const sql_string = 'SELECT * FROM users WHERE email = ?'

    return await dbConnect(sql_string, arg)
}