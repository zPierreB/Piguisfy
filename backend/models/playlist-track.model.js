import dbConnect from '../controllers/db/index.js'

export const findAllTracksByPlaylistId = async (arg) => {
    const sql_string = 'SELECT tracks.*, albums.name AS album_name, artists.artist_name AS artist_name FROM tracks JOIN playliststracks ON playliststracks.track_id = tracks.id JOIN albums ON tracks.album_id = albums.id JOIN artists ON albums.artist_id = artists.id WHERE playliststracks.playlist_id = ?'
    return await dbConnect(sql_string, arg)
}

export const addOneTrackToPlaylist = async (arg) => {
    const sql_string = 'INSERT INTO playliststracks (playlist_id, track_id) VALUES (?, ?)'
    return await dbConnect(sql_string, arg)
}

export const deleteOneTrackFromPlaylist = async (arg) => {
    const sql_string = 'DELETE FROM playliststracks WHERE playlist_id = ? AND track_id = ?'
    return await dbConnect(sql_string, arg)
}