import dbConnect from '../controllers/db/index.js'

export const findAllTracks = async (arg) => {
    const sql_string = 'SELECT * FROM tracks'

    return await dbConnect(sql_string, arg)
}

export const findAllTracksByAlbumId = async(arg) => {
    const sql_string = 'SELECT tracks.*, artists.artist_name AS artist_name FROM tracks JOIN albums ON tracks.album_id = albums.id JOIN artists ON albums.artist_id = artists.id WHERE album_id = ?'

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
