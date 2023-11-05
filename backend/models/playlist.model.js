import dbConnect from '../controllers/db/index.js'

export const findAllPlaylistsByUserId = async (arg) => {
    const sql_string = 'SELECT playlists.* FROM playlists Where user_id = ?'

    return await dbConnect(sql_string, arg)
}

export const addOnePlaylist = async (arg) => {
    const sql_string = 'INSERT INTO playlists (name, image, user_id) VALUES (?, ?, ?)'

    return await dbConnect(sql_string, arg)
}

export const updateOnePlaylistById = async (arg) => {
    const sql_string = 'UPDATE playlists SET name = ?, image = ? WHERE id = ?'

    return await dbConnect(sql_string, arg)
}

export const deleteOnePlaylistById = async (arg) => {
    const sql_string = 'DELETE FROM playlists WHERE id = ?'

    return await dbConnect(sql_string, arg)
}