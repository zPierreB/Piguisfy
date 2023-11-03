import dbConnect from '../controllers/db/index.js'

export const findAllPlaylists = async (arg) => {
    const sql_string = 'SELECT * FROM playlists'

    return await dbConnect(sql_string, arg)
}