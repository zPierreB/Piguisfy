import dbConnect from '../controllers/db/index.js'

export const findAllAlbums = async (arg) => {
    const sql_string = 'SELECT * FROM albums'

    return await dbConnect(sql_string, arg)
}