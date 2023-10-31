import dbConnect from '../controllers/db/index.js'

export const findAllAlbumsByUserId = async (arg) => {
    const sql_string = 'SELECT albums.* FROM albums LEFT JOIN artists ON albums.artist_id = artists.id WHERE artists.user_id = ?';

    return await dbConnect(sql_string, arg)
}

export const findOneAlbumByIdAndUserId = async (arg) => {
    const sql_string = 'SELECT albums.* FROM albums LEFT JOIN artists ON albums.artist_id = artists.id WHERE artists.user_id = ? AND albums.id = ? LIMIT 1';

    return await dbConnect(sql_string, arg)
}