import dbConnect from '../controllers/db/index.js'

export const find6LatestAlbums = async () => {
    const sql_string = 'SELECT albums.* FROM albums ORDER BY release_date DESC LIMIT 6'

    return await dbConnect(sql_string)
}

export const findOneAlbumById = async (arg) => {
    const sql_string = 'SELECT albums.* FROM albums WHERE albums.id = ? LIMIT 1';

    return await dbConnect(sql_string, arg)
}

export const findAllAlbumsByUserId = async (arg) => {
    const sql_string = 'SELECT albums.* FROM albums LEFT JOIN artists ON albums.artist_id = artists.id WHERE artists.user_id = ?';

    return await dbConnect(sql_string, arg)
}

export const findOneAlbumByIdAndUserId = async (arg) => {
    const sql_string = 'SELECT albums.* FROM albums LEFT JOIN artists ON albums.artist_id = artists.id WHERE artists.user_id = ? AND albums.id = ? LIMIT 1';

    return await dbConnect(sql_string, arg)
}

export const addOneAlbum = async (arg) => {
    const sql_string = 'INSERT INTO albums (name, release_date, image, artist_id) VALUES (?, ?, ?, ?)';

    return await dbConnect(sql_string, arg)
}

export const updateOneAlbumById = async (arg) => {
    const sql_string = 'UPDATE albums JOIN artists ON albums.artist_id = artists.id JOIN users ON artists.user_id = users.id SET name = ?, release_date = ?, image = ? WHERE albums.id = ? AND users.id = ?';

    return await dbConnect(sql_string, arg)
}

export const deleteOneAlbumById = async (arg) => {
    const sql_string = 'DELETE FROM albums WHERE albums.id = ?';

    return await dbConnect(sql_string, arg)
}