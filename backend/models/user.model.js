import dbConnect from '../controllers/db/index.js'

export const findOneByEmail = async (arg) => {
    const sql_string = 'SELECT * FROM users WHERE email = ?'

    return await dbConnect(sql_string, arg)
}

export const findOneByEmailAndId = async (arg) => {
    const sql_string = 'SELECT * FROM users WHERE email = ? AND id = ?'

    return await dbConnect(sql_string, arg)
}

export const findOneByUsernameAndEmail = async (arg) => {
    const sql_string = 'SELECT * FROM users WHERE username = ? OR email = ?'

    return await dbConnect(sql_string, arg)
}

export const createOneUser = async (arg) => {
    const sql_string = 'INSERT INTO users (username, email, password, date_of_birth, profil_pic) VALUES (?, ?, ?, ?, ?)'

    return await dbConnect(sql_string, arg)
}
