import dbConnect from '../controllers/db/index.js'

export const findAllTracksByPlaylistId = async (arg) => {
    const sql_string = 'SELECT tracks.* FROM tracks JOIN playliststracks ON playliststracks.track_id = tracks.id WHERE playliststracks.playlist_id = ?'

    return await dbConnect(sql_string, arg)
}

export const addOneTrackToPlaylist = async (arg) => {
    const sql_string = 'INSERT INTO playliststracks (playlist_id, track_id) VALUES (?, ?)'

    return await dbConnect(sql_string, arg)
}