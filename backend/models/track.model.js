import dbConnect from '../controllers/db/index.js'

export const findAllTracks = async (arg) => {
    const sql_string = 'SELECT * FROM tracks'

    return await dbConnect(sql_string, arg)
}

export const findOneTrack = async (arg) => {
    const sql_string = 'SELECT * FROM tracks WHERE name = ?'

    return await dbConnect(sql_string, arg)
}

export const addOneTrack = async (arg) => {

    const sql_string = 'INSERT INTO tracks (name, duration, path, album_id) VALUES (?, ?, ?, ?)'

    return await dbConnect(sql_string, arg)
}

export const deleteOneTrack = async (arg) => {
    const sql_string = 'DELETE FROM tracks WHERE id = ?'

    return await dbConnect(sql_string, arg)
}
